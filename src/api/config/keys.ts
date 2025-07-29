/* eslint-disable @typescript-eslint/no-explicit-any */
// Query keys for React Query
export const QUERY_KEYS = {
  // Auth keys
  AUTH: {
    USER: ["auth", "user"] as const,
    PROFILE: ["auth", "profile"] as const,
  },

  // Customer Auth keys
  CUSTOMER_AUTH: {
    USER: ["customer_auth", "user"] as const,
    PROFILE: ["customer_auth", "profile"] as const,
  },

  // Product keys
  PRODUCTS: {
    ALL: ["products"] as const,
    LISTING: (params?: Record<string, any>) => ["products", "listing", params] as const,
    DETAIL: (id: string) => ["products", "detail", id] as const,
    SEARCH: (query: string) => ["products", "search", query] as const,
    CATEGORIES: ["products", "categories"] as const,
  },

  // Order keys
  ORDERS: {
    ALL: ["orders"] as const,
    LIST: (userId?: string) => ["orders", "list", userId] as const,
    DETAIL: (id: string) => ["orders", "detail", id] as const,
  },

  // Review keys
  REVIEWS: {
    ALL: ["reviews"] as const,
    LISTING: (params?: Record<string, any>) => ["reviews", "listing", params] as const,
    DETAIL: (id: string) => ["reviews", "detail", id] as const,
    PRODUCT: (productId: string) => ["reviews", "product", productId] as const,
    USER: (userId: string) => ["reviews", "user", userId] as const,
  },

  // Shipment keys
  SHIPMENTS: {
    ALL: ["shipments"] as const,
    DETAIL: (id: string) => ["shipments", "detail", id] as const,
    TRACKING: (trackingNumber: string) => ["shipments", "tracking", trackingNumber] as const,
  },
    CATEGORIES: {
    ALL: ["categories"] as const,
    LISTING: (params?: Record<string, any>) => ["categories", "listing", params] as const,
    DETAIL: (id: string) => ["categories", "detail", id] as const,
    FEATURED: ["categories", "featured"] as const,
  },
    CERTIFICATES: {
    ALL: ["certificates"] as const,
    LISTING: (params?: Record<string, any>) => ["certificates", "listing", params] as const,
    DETAIL: (id: string) => ["certificates", "detail", id] as const,
  },
} as const
