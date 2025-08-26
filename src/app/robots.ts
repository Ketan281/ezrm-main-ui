import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://ezrm.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/about",
          "/certifications",
          "/contact",
          "/product",
          "/product/*",
          "/search",
          "/sign_in",
          "/sign_up",
        ],
        disallow: [
          "/api/",
          "/admin/",
          "/_next/",
          "/checkout",
          "/payment-success",
          "/profile",
          "/my_orders",
          "/orderDetails",
          "/favourite",
          "/cart",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
