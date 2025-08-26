"use client";
import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  CircularProgress,
  Alert,
  Pagination,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Snackbar,
} from "@mui/material";
import { ExpandMore, Favorite, FavoriteBorder } from "@mui/icons-material";
import { useProductListing } from "@/api/handlers";
import { useAppStore } from "@/store/use-app-store";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useWishlist,
  useAddToWishlist,
  useRemoveFromWishlist,
  useFilters,
} from "@/api/handlers";
import type { Product } from "@/api/services";
import Image from "next/image";
import ShimmerLoader from "@/components/ShimmerLoader";
import FilterShimmerLoader from "@/components/FilterShimmerLoader";
import ContactFormModal from "@/components/ContactFormModal";
import RFQModal from "@/components/RFQModal";

const ProductPage: React.FC = () => {
  const [page, setPage] = React.useState(1);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { customer, isAuthenticated } = useAppStore();

  // Get filters from URL
  const categoryFilter = searchParams.get("category");
  const countryFilter = searchParams.get("country");

  // Snackbar state for feedback
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  // Contact form modal state
  const [contactModalOpen, setContactModalOpen] = React.useState(false);

  // RFQ modal state
  const [rfqModalOpen, setRfqModalOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<{
    id: string;
    name: string;
  } | null>(null);

  // Selected filters state - initialize from URL params
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    categoryFilter ? [categoryFilter] : []
  );
  const [selectedCountries, setSelectedCountries] = React.useState<string[]>(
    countryFilter ? [countryFilter] : []
  );

  // Update URL when filters change
  const updateURL = React.useCallback(
    (categories: string[], countries: string[]) => {
      const params = new URLSearchParams();
      if (categories.length > 0) {
        params.set("category", categories[0]);
      }
      if (countries.length > 0) {
        params.set("country", countries[0]);
      }

      const newURL = params.toString()
        ? `/product?${params.toString()}`
        : "/product";
      router.replace(newURL, { scroll: false });
    },
    [router]
  );

  // Sync URL parameters with state when URL changes
  React.useEffect(() => {
    const newCategories = categoryFilter ? [categoryFilter] : [];
    const newCountries = countryFilter ? [countryFilter] : [];

    setSelectedCategories(newCategories);
    setSelectedCountries(newCountries);
  }, [categoryFilter, countryFilter]);

  // Wishlist hooks
  const { data: wishlistData } = useWishlist(
    { customerId: customer?.id || "" },
    { enabled: isAuthenticated && !!customer?.id }
  );
  const addToWishlistMutation = useAddToWishlist();
  const removeFromWishlistMutation = useRemoveFromWishlist();

  // Filters data
  const { data: filtersData, isLoading: filtersLoading } = useFilters();

  const {
    data: response,
    isLoading,
    error,
    isError,
  } = useProductListing({
    page,
    limit: 9,
    sortBy: "createdAt",
    sortOrder: "desc",
    category: selectedCategories.length > 0 ? selectedCategories[0] : undefined,
    countryOfOrigin:
      selectedCountries.length > 0 ? selectedCountries[0] : undefined,
  });

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  // Filter handling functions
  const handleCategoryFilter = (categoryId: string, checked: boolean) => {
    const newCategories = checked ? [categoryId] : [];
    setSelectedCategories(newCategories);
    setPage(1); // Reset to first page when filter changes
    updateURL(newCategories, selectedCountries);
  };

  const handleCountryFilter = (countryCode: string, checked: boolean) => {
    const newCountries = checked ? [countryCode] : [];
    setSelectedCountries(newCountries);
    setPage(1); // Reset to first page when filter changes
    updateURL(selectedCategories, newCountries);
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedCountries([]);
    setPage(1);
    updateURL([], []);
  };

  const getProductImage = (product: Product) => {
    if (product.bannerImage) {
      return product.bannerImage.startsWith("http")
        ? product.bannerImage
        : `${process.env.NEXT_PUBLIC_API_URL}/${product.bannerImage}`;
    }
    if (product.images && product.images.length > 0) {
      const firstImage = product.images[0];
      return firstImage.startsWith("http")
        ? firstImage
        : `${process.env.NEXT_PUBLIC_API_URL}/${firstImage}`;
    }
    return "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-74QCQcvTRt24IoUWE9VvnZptqiMfUS.png";
  };

  // Check if product is in wishlist
  const isInWishlist = (productId: string): boolean => {
    if (!wishlistData?.data?.products) return false;
    return wishlistData.data.products.some(
      (product) => product._id === productId
    );
  };

  // Handle wishlist toggle
  const handleWishlistToggle = async (
    productId: string,
    event: React.MouseEvent
  ) => {
    event.stopPropagation();

    // Check if user is authenticated
    if (!isAuthenticated || !customer?.id) {
      // Redirect to login page
      router.push("/sign_in");
      return;
    }

    const isCurrentlyInWishlist = isInWishlist(productId);
    try {
      if (isCurrentlyInWishlist) {
        await removeFromWishlistMutation.mutateAsync({
          customerId: customer.id,
          productId,
        });
        setSnackbarMessage("Product removed from wishlist successfully!");
        setSnackbarOpen(true);
      } else {
        await addToWishlistMutation.mutateAsync({
          customerId: customer.id,
          productId,
        });
        setSnackbarMessage("Product added to wishlist successfully!");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Wishlist operation failed:", error);
      setSnackbarMessage("Failed to update wishlist. Please try again.");
      setSnackbarOpen(true);
    }
  };

  if (filtersLoading) {
    return (
      <Container
        maxWidth="xl"
        sx={{ py: 4, display: "flex", justifyContent: "center" }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (isError) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Alert severity="error">
          Error loading products:{" "}
          {error instanceof Error ? error.message : "Something went wrong"}
        </Alert>
      </Container>
    );
  }

  const products = response?.products || [];
  const pagination = response?.pagination;

  // Remove the static filterSections array as we'll use dynamic data

  return (
    <Box
      sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f8f9fa" }}
    >
      {/* Left Sidebar - Filters */}
      <Box
        sx={{
          width: 280,
          backgroundColor: "transparent",
          // borderRight: "1px solid #e0e0e0",
          position: "sticky",
          top: 0,
          height: "100vh",
          // overflowY: "auto",
          overflow: "visible",
          mt: 2,
          ml: 3,
        }}
      >
        {/* Filter Header */}
        <Box
          sx={{
            backgroundColor: "#ff6b35",
            color: "white",
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderRadius: "20px 20px 0 0",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "16px" }}>
            Filters
          </Typography>
          <Box
            sx={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ fontSize: "12px", fontWeight: 600 }}>
              ×
            </Typography>
          </Box>
        </Box>

        {/* Filter Sections */}
        <Box sx={{ p: 0 }}>
          {filtersLoading ? (
            <FilterShimmerLoader />
          ) : (
            <>
              {/* Category Filter */}
              {filtersData?.data?.category &&
                filtersData.data.category.length > 0 && (
                  <Accordion
                    defaultExpanded
                    sx={{
                      boxShadow: "none",
                      "&:before": { display: "none" },
                      backgroundColor: "rgba(217, 217, 217, 0.21)",
                      marginBottom: "5px",
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMore sx={{ color: "#666" }} />}
                      sx={{
                        minHeight: 48,
                        px: 2,
                        py: 1,
                        "&.Mui-expanded": {
                          minHeight: 48,
                        },
                        "& .MuiAccordionSummary-content": {
                          margin: "8px 0",
                          "&.Mui-expanded": {
                            margin: "8px 0",
                          },
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "#333",
                        }}
                      >
                        Category
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ px: 2, py: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                        }}
                      >
                        {filtersData.data.category.map((category) => (
                          <Box
                            key={category.id}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              handleCategoryFilter(
                                category.id,
                                !selectedCategories.includes(category.id)
                              )
                            }
                          >
                            <input
                              type="checkbox"
                              checked={selectedCategories.includes(category.id)}
                              onChange={() => {}}
                              style={{ cursor: "pointer" }}
                            />
                            <Typography
                              sx={{ fontSize: "12px", color: "#666" }}
                            >
                              {category.name}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                )}

              {/* Country of Origin Filter */}
              {filtersData?.data?.countryOfOrigin &&
                filtersData.data.countryOfOrigin.length > 0 && (
                  <Accordion
                    defaultExpanded
                    sx={{
                      boxShadow: "none",
                      "&:before": { display: "none" },
                      backgroundColor: "rgba(217, 217, 217, 0.21)",
                      marginBottom: "5px",
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMore sx={{ color: "#666" }} />}
                      sx={{
                        minHeight: 48,
                        px: 2,
                        py: 1,
                        "&.Mui-expanded": {
                          minHeight: 48,
                        },
                        "& .MuiAccordionSummary-content": {
                          margin: "8px 0",
                          "&.Mui-expanded": {
                            margin: "8px 0",
                          },
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "#333",
                        }}
                      >
                        Country of Origin
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ px: 2, py: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                        }}
                      >
                        {filtersData.data.countryOfOrigin.map((country) => (
                          <Box
                            key={country.countryCode}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              handleCountryFilter(
                                country.countryCode,
                                !selectedCountries.includes(country.countryCode)
                              )
                            }
                          >
                            <input
                              type="checkbox"
                              checked={selectedCountries.includes(
                                country.countryCode
                              )}
                              onChange={() => {}}
                              style={{ cursor: "pointer" }}
                            />
                            <Typography
                              sx={{ fontSize: "12px", color: "#666" }}
                            >
                              {country.emoji} {country.name}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                )}

              {/* Clear Filters Button */}
              {(selectedCategories.length > 0 ||
                selectedCountries.length > 0) && (
                <Box sx={{ p: 2 }}>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={clearAllFilters}
                    sx={{
                      borderColor: "#ff6b35",
                      color: "#ff6b35",
                      fontSize: "12px",
                      fontWeight: 600,
                      textTransform: "none",
                      py: 1,
                      "&:hover": {
                        borderColor: "#e55a2b",
                        backgroundColor: "rgba(255, 107, 53, 0.04)",
                      },
                    }}
                  >
                    Clear All Filters
                  </Button>
                </Box>
              )}

              {/* No filters available message */}
              {(!filtersData?.data?.category ||
                filtersData.data.category.length === 0) &&
                (!filtersData?.data?.countryOfOrigin ||
                  filtersData.data.countryOfOrigin.length === 0) && (
                  <Box sx={{ p: 2 }}>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "#666",
                        textAlign: "center",
                      }}
                    >
                      No filters available
                    </Typography>
                  </Box>
                )}
            </>
          )}
        </Box>
      </Box>

      {/* Main Content Area */}
      <Box sx={{ flex: 1, p: 3 }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: "#333",
                fontSize: "24px",
              }}
            >
              Product
            </Typography>

            {/* Active Filters */}
            {selectedCategories.length > 0 && (
              <Chip
                label={`Category: ${
                  filtersData?.data?.category?.find(
                    (c) => c.id === selectedCategories[0]
                  )?.name || selectedCategories[0]
                }`}
                onDelete={() => {
                  setSelectedCategories([]);
                  setPage(1);
                  updateURL([], selectedCountries);
                }}
                sx={{
                  backgroundColor: "#ff7849",
                  color: "white",
                  fontWeight: 500,
                  "& .MuiChip-deleteIcon": {
                    color: "white",
                    "&:hover": {
                      color: "#f5f5f5",
                    },
                  },
                }}
              />
            )}

            {selectedCountries.length > 0 && (
              <Chip
                label={`Country: ${
                  filtersData?.data?.countryOfOrigin?.find(
                    (c) => c.countryCode === selectedCountries[0]
                  )?.name || selectedCountries[0]
                }`}
                onDelete={() => {
                  setSelectedCountries([]);
                  setPage(1);
                  updateURL(selectedCategories, []);
                }}
                sx={{
                  backgroundColor: "#ff7849",
                  color: "white",
                  fontWeight: 500,
                  "& .MuiChip-deleteIcon": {
                    color: "white",
                    "&:hover": {
                      color: "#f5f5f5",
                    },
                  },
                }}
              />
            )}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography
              sx={{
                fontSize: "16px",
                color: "#666",
                fontWeight: 500,
              }}
            >
              Total: {response?.pagination?.total || 0}
            </Typography>

            <Button
              variant="outlined"
              onClick={() => setContactModalOpen(true)}
              sx={{
                borderColor: "#ff6b35",
                color: "#ff6b35",
                fontWeight: 600,
                textTransform: "none",
                "&:hover": {
                  borderColor: "#e55a2b",
                  backgroundColor: "rgba(255, 107, 53, 0.04)",
                },
              }}
            >
              Contact Us
            </Button>
          </Box>
        </Box>

        {/* Products Grid */}
        {isLoading ? (
          <ShimmerLoader count={9} />
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 2,
              mb: 4,
            }}
          >
            {products.map((product) => {
              const productInWishlist = isInWishlist(product._id);
              // const isWishlistLoading = addToWishlistMutation.isPending || removeFromWishlistMutation.isPending

              return (
                <Box
                  key={product._id}
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    overflow: "hidden",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    position: "relative",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                      transform: "translateY(-2px)",
                    },
                  }}
                  onClick={() => router.push(`/product/detail/${product._id}`)}
                >
                  {/* Product Image */}
                  <Box sx={{ position: "relative", height: 180 }}>
                    <Image
                      src={getProductImage(product) || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />

                    {/* Watermark */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        color: "rgba(255, 255, 255, 0.7)",
                        fontSize: "16px",
                        fontWeight: 600,
                        textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                        pointerEvents: "none",
                      }}
                    >
                      Greenjeeva
                    </Box>

                    {/* Heart Icon */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: 8,
                        left: 8,
                        cursor: "pointer",
                        zIndex: 2,
                      }}
                      onClick={(e) => handleWishlistToggle(product._id, e)}
                    >
                      {productInWishlist ? (
                        <Favorite sx={{ color: "#ff4444", fontSize: 20 }} />
                      ) : (
                        <FavoriteBorder sx={{ color: "white", fontSize: 20 }} />
                      )}
                    </Box>

                    {/* Out of Stock Badge */}
                    {!product.inStock && (
                      <Chip
                        label="Out of Stock"
                        sx={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          color: "#ff6b35",
                          fontSize: "11px",
                          height: 24,
                          fontWeight: 600,
                        }}
                      />
                    )}
                  </Box>

                  {/* Product Content */}
                  <Box sx={{ p: 2 }}>
                    {/* Product Name */}
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#333",
                        mb: 1,
                        lineHeight: 1.3,
                      }}
                    >
                      {product.name}
                    </Typography>

                    {/* Short description */}
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "#666",
                        mb: 1,
                        lineHeight: 1.4,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {product.description ||
                        "Premium, lab-tested raw material trusted by manufacturers."}
                    </Typography>

                    {/* Product Code */}
                    <Typography
                      sx={{
                        fontSize: "11px",
                        color: "#999",
                        mb: 2,
                      }}
                    >
                      Product Code: {product.uniqueId}
                    </Typography>

                    {/* Get Quote Button */}
                    <Button
                      variant="contained"
                      fullWidth
                      disabled={!product.inStock}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProduct({
                          id: product._id,
                          name: product.name,
                        });
                        setRfqModalOpen(true);
                      }}
                      sx={{
                        backgroundColor: product.inStock ? "#ff6b35" : "#ccc",
                        color: "white",
                        fontSize: "12px",
                        fontWeight: 600,
                        textTransform: "none",
                        py: 1,
                        borderRadius: "4px",
                        "&:hover": {
                          backgroundColor: product.inStock ? "#e55a2b" : "#ccc",
                        },
                      }}
                    >
                      Get Quote
                    </Button>
                  </Box>
                </Box>
              );
            })}
          </Box>
        )}

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={pagination.totalPages}
              page={page}
              onChange={handlePageChange}
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "#666",
                  "&.Mui-selected": {
                    backgroundColor: "#ff6b35",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#e55a2b",
                    },
                  },
                },
              }}
            />
          </Box>
        )}

        {/* Snackbar for feedback */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={() => setSnackbarOpen(false)}
          message={snackbarMessage}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />

        {/* Contact Form Modal */}
        <ContactFormModal
          open={contactModalOpen}
          onClose={() => setContactModalOpen(false)}
          source="product_page"
          onSuccess={() => {
            setSnackbarMessage(
              "Thank you! Your message has been sent successfully."
            );
            setSnackbarOpen(true);
          }}
          onError={(error) => {
            setSnackbarMessage(error);
            setSnackbarOpen(true);
          }}
        />

        {/* RFQ Modal */}
        <RFQModal
          open={rfqModalOpen}
          onClose={() => {
            setRfqModalOpen(false);
            setSelectedProduct(null);
          }}
          productId={selectedProduct?.id}
          productName={selectedProduct?.name || ""}
          onSuccess={() => {
            setSnackbarMessage(
              "Thank you! Your RFQ has been submitted successfully."
            );
            setSnackbarOpen(true);
          }}
          onError={(error) => {
            setSnackbarMessage(error);
            setSnackbarOpen(true);
          }}
        />
      </Box>
    </Box>
  );
};

export default ProductPage;
