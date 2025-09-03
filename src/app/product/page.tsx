"use client";
import React, { useState } from "react";
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
  const [selectedSubCategories, setSelectedSubCategories] = React.useState<
    string[]
  >([]);
  const [selectedApplications, setSelectedApplications] = React.useState<
    string[]
  >([]);
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [selectedFunctions, setSelectedFunctions] = React.useState<string[]>(
    []
  );
  const [selectedCountries, setSelectedCountries] = React.useState<string[]>(
    countryFilter ? [countryFilter] : []
  );
  // Add this state for accordion management
  const [expandedAccordion, setExpandedAccordion] = useState(null);

  // Add this function to handle accordion changes
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAccordionChange = (panel: any) => {
    setExpandedAccordion(expandedAccordion === panel ? null : panel);
  };

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
    subCategory:
      selectedSubCategories.length > 0 ? selectedSubCategories : undefined,
    application:
      selectedApplications.length > 0 ? selectedApplications : undefined,
    tag: selectedTags.length > 0 ? selectedTags : undefined,
    function: selectedFunctions.length > 0 ? selectedFunctions : undefined,
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
  const handleCategoryFilter = (categorySlug: string, checked: boolean) => {
    const newCategories = checked ? [categorySlug] : [];
    setSelectedCategories(newCategories);
    setPage(1); // Reset to first page when filter changes
    updateURL(newCategories, selectedCountries);
  };

  const handleSubCategoryFilter = (
    subCategorySlug: string,
    checked: boolean
  ) => {
    const newSubCategories = checked
      ? [...selectedSubCategories, subCategorySlug]
      : selectedSubCategories.filter((slug) => slug !== subCategorySlug);
    setSelectedSubCategories(newSubCategories);
    setPage(1);
  };

  const handleApplicationFilter = (
    applicationSlug: string,
    checked: boolean
  ) => {
    const newApplications = checked
      ? [...selectedApplications, applicationSlug]
      : selectedApplications.filter((slug) => slug !== applicationSlug);
    setSelectedApplications(newApplications);
    setPage(1);
  };

  const handleTagFilter = (tagSlug: string, checked: boolean) => {
    const newTags = checked
      ? [...selectedTags, tagSlug]
      : selectedTags.filter((slug) => slug !== tagSlug);
    setSelectedTags(newTags);
    setPage(1);
  };

  const handleFunctionFilter = (functionSlug: string, checked: boolean) => {
    const newFunctions = checked
      ? [...selectedFunctions, functionSlug]
      : selectedFunctions.filter((slug) => slug !== functionSlug);
    setSelectedFunctions(newFunctions);
    setPage(1);
  };

  const handleCountryFilter = (countryCode: string, checked: boolean) => {
    const newCountries = checked ? [countryCode] : [];
    setSelectedCountries(newCountries);
    setPage(1); // Reset to first page when filter changes
    updateURL(selectedCategories, newCountries);
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedSubCategories([]);
    setSelectedApplications([]);
    setSelectedTags([]);
    setSelectedFunctions([]);
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
          display: "flex",
          flexDirection: "column",
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
            flexShrink: 0,
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
        <Box
          sx={{
            p: 0,
            flex: 1,
            minHeight: 0, // Important for flex child to allow shrinking
            overflowY: "auto",
            overflowX: "hidden",
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "rgba(0,0,0,0.2)",
              borderRadius: "3px",
              "&:hover": {
                background: "rgba(0,0,0,0.3)",
              },
            },
            // For Firefox
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(0,0,0,0.2) transparent",
          }}
        >
          {filtersLoading ? (
            <FilterShimmerLoader />
          ) : (
            <>
              {/* Category Filter */}
              {filtersData?.data?.category &&
                filtersData.data.category.length > 0 && (
                  <Accordion
                    expanded={expandedAccordion === "category"}
                    onChange={() => handleAccordionChange("category")}
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
                          maxHeight: "200px",
                          overflowY: "auto",
                          overflowX: "hidden",
                          // Custom scrollbar styling
                          "&::-webkit-scrollbar": {
                            width: "6px",
                          },
                          "&::-webkit-scrollbar-track": {
                            background: "rgba(0,0,0,0.05)",
                            borderRadius: "3px",
                          },
                          "&::-webkit-scrollbar-thumb": {
                            background: "rgba(0,0,0,0.2)",
                            borderRadius: "3px",
                            "&:hover": {
                              background: "rgba(0,0,0,0.4)",
                            },
                          },
                          // For Firefox
                          scrollbarWidth: "thin",
                          scrollbarColor: "rgba(0,0,0,0.2) rgba(0,0,0,0.05)",
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
                                category.slug,
                                !selectedCategories.includes(category.slug)
                              )
                            }
                          >
                            <input
                              type="checkbox"
                              checked={selectedCategories.includes(
                                category.slug
                              )}
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

              {/* Sub Category Filter */}
              {filtersData?.data?.subCategory &&
                filtersData.data.subCategory.length > 0 && (
                  <Accordion
                    expanded={expandedAccordion === "subCategory"}
                    onChange={() => handleAccordionChange("subCategory")}
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
                        Sub Category
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ px: 2, py: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                          maxHeight: "200px",
                          overflowY: "auto",
                          overflowX: "hidden",
                          // Custom scrollbar styling
                          "&::-webkit-scrollbar": {
                            width: "6px",
                          },
                          "&::-webkit-scrollbar-track": {
                            background: "rgba(0,0,0,0.05)",
                            borderRadius: "3px",
                          },
                          "&::-webkit-scrollbar-thumb": {
                            background: "rgba(0,0,0,0.2)",
                            borderRadius: "3px",
                            "&:hover": {
                              background: "rgba(0,0,0,0.4)",
                            },
                          },
                          // For Firefox
                          scrollbarWidth: "thin",
                          scrollbarColor: "rgba(0,0,0,0.2) rgba(0,0,0,0.05)",
                        }}
                      >
                        {filtersData.data.subCategory.map((subCategory) => (
                          <Box
                            key={subCategory.id}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              handleSubCategoryFilter(
                                subCategory.slug,
                                !selectedSubCategories.includes(
                                  subCategory.slug
                                )
                              )
                            }
                          >
                            <input
                              type="checkbox"
                              checked={selectedSubCategories.includes(
                                subCategory.slug
                              )}
                              onChange={() => {}}
                              style={{ cursor: "pointer" }}
                            />
                            <Typography
                              sx={{ fontSize: "12px", color: "#666" }}
                            >
                              {subCategory.name}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                )}

              {/* Application Filter */}
              {filtersData?.data?.application &&
                filtersData.data.application.length > 0 && (
                  <Accordion
                    expanded={expandedAccordion === "application"}
                    onChange={() => handleAccordionChange("application")}
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
                        Application
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ px: 2, py: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                          maxHeight: "200px",
                          overflowY: "auto",
                          overflowX: "hidden",
                          // Custom scrollbar styling
                          "&::-webkit-scrollbar": {
                            width: "6px",
                          },
                          "&::-webkit-scrollbar-track": {
                            background: "rgba(0,0,0,0.05)",
                            borderRadius: "3px",
                          },
                          "&::-webkit-scrollbar-thumb": {
                            background: "rgba(0,0,0,0.2)",
                            borderRadius: "3px",
                            "&:hover": {
                              background: "rgba(0,0,0,0.4)",
                            },
                          },
                          // For Firefox
                          scrollbarWidth: "thin",
                          scrollbarColor: "rgba(0,0,0,0.2) rgba(0,0,0,0.05)",
                        }}
                      >
                        {filtersData.data.application.map((application) => (
                          <Box
                            key={application.id}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              handleApplicationFilter(
                                application.slug,
                                !selectedApplications.includes(application.slug)
                              )
                            }
                          >
                            <input
                              type="checkbox"
                              checked={selectedApplications.includes(
                                application.slug
                              )}
                              onChange={() => {}}
                              style={{ cursor: "pointer" }}
                            />
                            <Typography
                              sx={{ fontSize: "12px", color: "#666" }}
                            >
                              {application.name}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                )}

              {/* Function Filter */}
              {filtersData?.data?.function &&
                filtersData.data.function.length > 0 && (
                  <Accordion
                    expanded={expandedAccordion === "function"}
                    onChange={() => handleAccordionChange("function")}
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
                        Function
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ px: 2, py: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                          maxHeight: "200px",
                          overflowY: "auto",
                          overflowX: "hidden",
                          // Custom scrollbar styling
                          "&::-webkit-scrollbar": {
                            width: "6px",
                          },
                          "&::-webkit-scrollbar-track": {
                            background: "rgba(0,0,0,0.05)",
                            borderRadius: "3px",
                          },
                          "&::-webkit-scrollbar-thumb": {
                            background: "rgba(0,0,0,0.2)",
                            borderRadius: "3px",
                            "&:hover": {
                              background: "rgba(0,0,0,0.4)",
                            },
                          },
                          // For Firefox
                          scrollbarWidth: "thin",
                          scrollbarColor: "rgba(0,0,0,0.2) rgba(0,0,0,0.05)",
                        }}
                      >
                        {filtersData.data.function.map((func) => (
                          <Box
                            key={func.id}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              handleFunctionFilter(
                                func.slug,
                                !selectedFunctions.includes(func.slug)
                              )
                            }
                          >
                            <input
                              type="checkbox"
                              checked={selectedFunctions.includes(func.slug)}
                              onChange={() => {}}
                              style={{ cursor: "pointer" }}
                            />
                            <Typography
                              sx={{ fontSize: "12px", color: "#666" }}
                            >
                              {func.name}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                )}

              {/* Tag Filter */}
              {filtersData?.data?.tag && filtersData.data.tag.length > 0 && (
                <Accordion
                  expanded={expandedAccordion === "tag"}
                  onChange={() => handleAccordionChange("tag")}
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
                      Tags
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ px: 2, py: 1 }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        maxHeight: "200px",
                        overflowY: "auto",
                        overflowX: "hidden",
                        // Custom scrollbar styling
                        "&::-webkit-scrollbar": {
                          width: "6px",
                        },
                        "&::-webkit-scrollbar-track": {
                          background: "rgba(0,0,0,0.05)",
                          borderRadius: "3px",
                        },
                        "&::-webkit-scrollbar-thumb": {
                          background: "rgba(0,0,0,0.2)",
                          borderRadius: "3px",
                          "&:hover": {
                            background: "rgba(0,0,0,0.4)",
                          },
                        },
                        // For Firefox
                        scrollbarWidth: "thin",
                        scrollbarColor: "rgba(0,0,0,0.2) rgba(0,0,0,0.05)",
                      }}
                    >
                      {filtersData.data.tag.map((tag) => (
                        <Box
                          key={tag.id}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            handleTagFilter(
                              tag.slug,
                              !selectedTags.includes(tag.slug)
                            )
                          }
                        >
                          <input
                            type="checkbox"
                            checked={selectedTags.includes(tag.slug)}
                            onChange={() => {}}
                            style={{ cursor: "pointer" }}
                          />
                          <Typography sx={{ fontSize: "12px", color: "#666" }}>
                            {tag.name}
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
                    expanded={expandedAccordion === "countryOfOrigin"}
                    onChange={() => handleAccordionChange("countryOfOrigin")}
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
                          maxHeight: "200px",
                          overflowY: "auto",
                          overflowX: "hidden",
                          // Custom scrollbar styling
                          "&::-webkit-scrollbar": {
                            width: "6px",
                          },
                          "&::-webkit-scrollbar-track": {
                            background: "rgba(0,0,0,0.05)",
                            borderRadius: "3px",
                          },
                          "&::-webkit-scrollbar-thumb": {
                            background: "rgba(0,0,0,0.2)",
                            borderRadius: "3px",
                            "&:hover": {
                              background: "rgba(0,0,0,0.4)",
                            },
                          },
                          // For Firefox
                          scrollbarWidth: "thin",
                          scrollbarColor: "rgba(0,0,0,0.2) rgba(0,0,0,0.05)",
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
                selectedSubCategories.length > 0 ||
                selectedApplications.length > 0 ||
                selectedTags.length > 0 ||
                selectedFunctions.length > 0 ||
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
            flexDirection: "column",
            gap: 2,
            mb: 3,
          }}
        >
          {/* Top row with title and actions */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
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

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography
                sx={{
                  fontSize: "16px",
                  color: "#666",
                  fontWeight: 500,
                  whiteSpace: "nowrap",
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
                  whiteSpace: "nowrap",
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

          {(selectedCategories.length > 0 ||
            selectedCountries.length > 0 ||
            selectedSubCategories.length > 0 ||
            selectedApplications.length > 0 ||
            selectedTags.length > 0 ||
            selectedFunctions.length > 0) && (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                alignItems: "center",
                maxHeight: "90px",
                overflowY: "auto",
              }}
            >
              {(() => {
                const allFilters = [
                  ...selectedCategories.slice(0, 1).map((slug) => ({
                    type: "Category",
                    slug,
                    name:
                      filtersData?.data?.category?.find((c) => c.slug === slug)
                        ?.name || slug,
                    onDelete: () => {
                      setSelectedCategories([]);
                      setPage(1);
                      updateURL([], selectedCountries);
                    },
                  })),
                  ...selectedCountries.slice(0, 1).map((slug) => ({
                    type: "Country",
                    slug,
                    name:
                      filtersData?.data?.countryOfOrigin?.find(
                        (c) => c.countryCode === slug
                      )?.name || slug,
                    onDelete: () => {
                      setSelectedCountries([]);
                      setPage(1);
                      updateURL(selectedCategories, []);
                    },
                  })),
                  ...selectedSubCategories.map((slug) => ({
                    type: "Sub Category",
                    slug,
                    name:
                      filtersData?.data?.subCategory?.find(
                        (c) => c.slug === slug
                      )?.name || slug,
                    onDelete: () => {
                      setSelectedSubCategories(
                        selectedSubCategories.filter((s) => s !== slug)
                      );
                      setPage(1);
                    },
                  })),
                  ...selectedApplications.map((slug) => ({
                    type: "Application",
                    slug,
                    name:
                      filtersData?.data?.application?.find(
                        (c) => c.slug === slug
                      )?.name || slug,
                    onDelete: () => {
                      setSelectedApplications(
                        selectedApplications.filter((s) => s !== slug)
                      );
                      setPage(1);
                    },
                  })),
                  ...selectedTags.map((slug) => ({
                    type: "Tag",
                    slug,
                    name:
                      filtersData?.data?.tag?.find((c) => c.slug === slug)
                        ?.name || slug,
                    onDelete: () => {
                      setSelectedTags(selectedTags.filter((s) => s !== slug));
                      setPage(1);
                    },
                  })),
                  ...selectedFunctions.map((slug) => ({
                    type: "Function",
                    slug,
                    name:
                      filtersData?.data?.function?.find((c) => c.slug === slug)
                        ?.name || slug,
                    onDelete: () => {
                      setSelectedFunctions(
                        selectedFunctions.filter((s) => s !== slug)
                      );
                      setPage(1);
                    },
                  })),
                ];

                const maxVisible = 6;
                const visibleFilters = allFilters.slice(0, maxVisible);
                const remainingCount = allFilters.length - maxVisible;

                return (
                  <>
                    {visibleFilters.map((filter, index) => (
                      <Chip
                        key={`${filter.type}-${filter.slug}-${index}`}
                        label={`${filter.type}: ${filter.name}`}
                        onDelete={filter.onDelete}
                        size="small"
                        sx={{
                          backgroundColor: "#ff7849",
                          color: "white",
                          fontWeight: 500,
                          fontSize: "12px",
                          height: "28px",
                        }}
                      />
                    ))}
                    {remainingCount > 0 && (
                      <Chip
                        label={`+${remainingCount} more`}
                        size="small"
                        sx={{
                          backgroundColor: "#f5f5f5",
                          color: "#666",
                          fontWeight: 500,
                          fontSize: "12px",
                          height: "28px",
                        }}
                      />
                    )}
                  </>
                );
              })()}
            </Box>
          )}
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
                  <Box
                    sx={{
                      position: "relative",
                      height: 180,
                      overflow: "hidden",
                      cursor: "pointer",
                      "&:hover .default-image": {
                        transform: "translateX(-100%)",
                      },
                      "&:hover .hover-image": {
                        transform: "translateX(0)",
                      },
                    }}
                  >
                    {/* Default Image - Show bannerImage first */}
                    <Box
                      className="default-image"
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        transition:
                          "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                        transform: "translateX(0)",
                      }}
                    >
                      <Image
                        src={
                          product.bannerImage
                            ? product.bannerImage.startsWith("http")
                              ? product.bannerImage
                              : `${process.env.NEXT_PUBLIC_API_URL}/${product.bannerImage}`
                            : "/placeholder.svg"
                        }
                        alt={product.name}
                        fill
                        style={{
                          objectFit: "cover",
                        }}
                      />
                    </Box>

                    {/* Hover Image - Show product.images[0] on hover */}
                    {product.images && product.images.length > 0 && (
                      <Box
                        className="hover-image"
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          transition:
                            "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                          transform: "translateX(100%)",
                        }}
                      >
                        <Image
                          src={
                            product.images[0].startsWith("http")
                              ? product.images[0]
                              : `${process.env.NEXT_PUBLIC_API_URL}/${product.images[0]}`
                          }
                          alt={product.name}
                          fill
                          style={{
                            objectFit: "cover",
                          }}
                        />
                      </Box>
                    )}

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
                      EZRM
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
