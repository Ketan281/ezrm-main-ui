"use client";

import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Skeleton,
  Alert,
} from "@mui/material";
import { Favorite, FavoriteBorder, ShoppingCart } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/use-app-store";
import {
  useWishlist,
  useAddToWishlist,
  useRemoveFromWishlist,
} from "@/api/handlers/wishlistHandler";
import { useCartSummary } from "@/api/handlers/cartHandler";
import type { Product } from "@/api/services";
import Image from "next/image";

interface ProductsYouMayLikeProps {
  limit?: number;
}

const ProductsYouMayLike: React.FC<ProductsYouMayLikeProps> = ({
  limit = 6,
}) => {
  const router = useRouter();
  const { customer, isAuthenticated } = useAppStore();

  // Fetch featured products
  const [featuredProducts, setFeaturedProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // Wishlist hooks
  const { data: wishlistData } = useWishlist(
    { customerId: customer?.id || "" },
    { enabled: isAuthenticated && !!customer?.id }
  );
  const addToWishlistMutation = useAddToWishlist();
  const removeFromWishlistMutation = useRemoveFromWishlist();

  // Cart hooks
  const { data: cartSummary } = useCartSummary(customer?.id || "", {
    enabled: isAuthenticated && !!customer?.id,
  });

  // Fetch featured products
  React.useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/public/products/listing?page=1&limit=${limit}&sortBy=createdAt&sortOrder=desc&
          
          `
        );

        if (!response.ok) {
          throw new Error("Failed to fetch featured products");
        }

        const data = await response.json();
        if (data.success && data.products) {
          setFeaturedProducts(data.products);
        } else {
          setError("No featured products found");
        }
      } catch (err) {
        console.error("Error fetching featured products:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load products"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, [limit]);

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
    return "/product.png"; // Default fallback image
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

    if (!isAuthenticated || !customer?.id) {
      router.push("/sign_in");
      return;
    }

    try {
      if (isInWishlist(productId)) {
        await removeFromWishlistMutation.mutateAsync({
          customerId: customer.id,
          productId,
        });
      } else {
        await addToWishlistMutation.mutateAsync({
          customerId: customer.id,
          productId,
        });
      }
    } catch (error) {
      console.error("Wishlist toggle failed:", error);
    }
  };

  const renderProductCard = (product: Product) => {
    const productInWishlist = isInWishlist(product._id);

    return (
      <Card
        key={product._id}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: 2,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          transition: "all 0.3s ease",
          cursor: "pointer",
          "&:hover": {
            boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
            transform: "translateY(-2px)",
          },
        }}
        onClick={() => router.push(`/product/detail/${product._id}`)}
      >
        {/* Product Image */}
        <Box sx={{ position: "relative", height: 200 }}>
          <Image
            src={getProductImage(product)}
            alt={product.name}
            fill
            style={{ objectFit: "cover" }}
          />

          {/* Featured Badge */}
          <Chip
            label="FEATURED"
            size="small"
            sx={{
              position: "absolute",
              top: 8,
              left: 8,
              backgroundColor: "#ff7849",
              color: "white",
              fontWeight: 600,
              fontSize: "0.7rem",
            }}
          />

          {/* Wishlist Button */}
          <Box
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              zIndex: 2,
            }}
            onClick={handleWishlistToggle.bind(null, product._id)}
          >
            {productInWishlist ? (
              <Favorite
                sx={{
                  color: "#ff7849",
                  fontSize: 24,
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                }}
              />
            ) : (
              <FavoriteBorder
                sx={{
                  color: "white",
                  fontSize: 24,
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                }}
              />
            )}
          </Box>
        </Box>

        {/* Product Content */}
        <CardContent sx={{ flexGrow: 1, p: 2 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              fontSize: "1rem",
              color: "#333",
              mb: 1,
              lineHeight: 1.3,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {product.name}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "#666",
              mb: 2,
              fontSize: "0.875rem",
              lineHeight: 1.4,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {product.description}
          </Typography>

          {/* Price and Action */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: "auto",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "#ff7849",
                fontSize: "1.1rem",
              }}
            >
              ₹{product.price}
            </Typography>

            <Button
              variant="contained"
              size="small"
              startIcon={<ShoppingCart />}
              sx={{
                backgroundColor: "#ff7849",
                color: "white",
                textTransform: "none",
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "#e55a2b",
                },
              }}
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/product/detail/${product._id}`);
              }}
            >
              View
            </Button>
          </Box>
        </CardContent>
      </Card>
    );
  };

  const renderSkeleton = () => (
    <Grid container spacing={3}>
      {Array.from({ length: limit }).map((_, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Card sx={{ height: "100%", borderRadius: 2 }}>
            <Skeleton variant="rectangular" height={200} />
            <CardContent>
              <Skeleton variant="text" height={24} sx={{ mb: 1 }} />
              <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
              <Skeleton variant="text" height={20} sx={{ mb: 2 }} />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Skeleton variant="text" width={60} height={24} />
                <Skeleton variant="rectangular" width={80} height={32} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  if (error && !loading) {
    return (
      <Box sx={{ py: 4 }}>
        <Container maxWidth="lg">
          <Alert severity="warning" sx={{ borderRadius: 2 }}>
            <Typography variant="h6">
              Unable to load featured products
            </Typography>
            <Typography variant="body2">{error}</Typography>
          </Alert>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 6, backgroundColor: "#f8f9fa" }}>
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "#333",
              mb: 2,
              fontSize: { xs: "1.75rem", md: "2.25rem" },
            }}
          >
            Products You May Like
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#666",
              fontSize: "1.1rem",
              maxWidth: 600,
              mx: "auto",
            }}
          >
            Discover our handpicked featured products that customers love
          </Typography>
        </Box>

        {/* Products Grid */}
        {loading ? (
          renderSkeleton()
        ) : featuredProducts.length > 0 ? (
          <Grid container spacing={3}>
            {featuredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                {renderProductCard(product)}
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="h6" sx={{ color: "#666", mb: 1 }}>
              No featured products available
            </Typography>
            <Typography variant="body2" sx={{ color: "#999" }}>
              Check back later for our latest featured products.
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ProductsYouMayLike;
