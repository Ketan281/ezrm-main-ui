export const ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    PROFILE: "/auth/profile",
  },

  // Product endpoints
  PRODUCTS: {
    LISTING: "/public/products/listing",
    DETAIL: (id: string) => `/api/public/products/${id}`,
    SEARCH: "/api/public/products/search",
    CATEGORIES: "/api/public/products/categories",
  },

  // Order endpoints
  ORDERS: {
    LIST: "/orders",
    DETAIL: (id: string) => `/orders/${id}`,
    CREATE: "/orders",
    UPDATE: (id: string) => `/orders/${id}`,
    CANCEL: (id: string) => `/orders/${id}/cancel`,
  },

  // Customer Reviews endpoints
  REVIEWS: {
    LISTING: "/public/customer-reviews/listing",
    DETAIL: (id: string) => `/api/public/customer-reviews/${id}`,
    PRODUCT_REVIEWS: (productId: string) => `/api/public/products/${productId}/reviews`,
    CREATE: "/reviews",
    UPDATE: (id: string) => `/reviews/${id}`,
    DELETE: (id: string) => `/reviews/${id}`,
  },

  // Shipments endpoints
  SHIPMENTS: {
    LIST: "/shipments",
    DETAIL: (id: string) => `/shipments/${id}`,
    TRACK: (trackingNumber: string) => `/shipments/track/${trackingNumber}`,
  },
} as const
