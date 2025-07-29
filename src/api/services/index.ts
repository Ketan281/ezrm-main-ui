export { productService } from "./products"
export { authService } from "./authService"
export { orderService } from "./orders"
export { reviewService } from "./reviews"
export { customerAuthService } from "./customerAuth"
export { customerSignupService } from "./customerSignup"
export { categoryService } from "./categories"
export { certificateService } from "./certificates"
export type { Product, ProductsResponse, ProductListingParams } from "./products"
export type { User, LoginCredentials, RegisterData, AuthResponse } from "./authService"
export type { Order, OrderItem, CreateOrderData } from "./orders"
export type { CustomerReview, ReviewsResponse, ReviewListingParams } from "./reviews"
export type { Customer, LoginCredentials as CustomerLoginCredentials, LoginResponse } from "./customerAuth"
export type {
  InitiateSignupRequest,
  InitiateSignupResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
  CompleteSignupRequest,
  CompleteSignupResponse,
} from "./customerSignup"
export type { Category, CategoriesResponse, CategoryListingParams } from "./categories"
export type { Certificate, CertificatesResponse, CertificateListingParams, AssetLink } from "./certificates"
