import { MetadataRoute } from "next";
import { productService } from "@/api/services/products";

export default async function productsSitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://ezrm.com";

  try {
    const productsResponse = await productService.getProductListing({
      limit: 1000,
    });

    if (productsResponse.success && productsResponse.products) {
      return productsResponse.products.map((product) => ({
        url: `${baseUrl}/product/detail/${product._id}`,
        lastModified: new Date(product.updatedAt || product.createdAt),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));
    }
  } catch (error) {
    console.warn("Failed to fetch products for sitemap:", error);
  }

  return [];
}
