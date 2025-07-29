export const ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    PROFILE: "/auth/profile",
  },

  // Customer Auth endpoints
  CUSTOMER_AUTH: {
    LOGIN: "/public/customer-auth/login/password",
    REGISTER: "/public/customer-auth/register",
    FORGOT_PASSWORD: "/public/customer-auth/forgot-password",
    RESET_PASSWORD: "/public/customer-auth/reset-password",
  },

  // Customer Signup endpoints
  CUSTOMER_SIGNUP: {
    INITIATE: "/public/customer-signup/initiate",
    VERIFY_OTP: "/public/customer-signup/verify-otp",
    COMPLETE: "/public/customer-signup/complete",
  },

  // Product endpoints
  PRODUCTS: {
    LISTING: "/public/products/listing",
    DETAIL: (id: string) => `/public/products/${id}`,
    SEARCH: "/public/products/search",
    CATEGORIES: "/public/products/categories",
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
    DETAIL: (id: string) => `/public/customer-reviews/${id}`,
    PRODUCT_REVIEWS: (productId: string) => `/public/products/${productId}/reviews`,
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
    CATEGORIES: {
    LISTING: "/public/categories/listing",
    DETAIL: (id: string) => `/public/categories/${id}`,
    FEATURED: "/public/categories/listing?tag=Featured",
  },
    CERTIFICATES: {
    LISTING: "/public/certificates/listing",
    DETAIL: (id: string) => `/api/public/certificates/${id}`,
  },
} as const
