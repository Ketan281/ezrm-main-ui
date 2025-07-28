import { API_CONFIG, ENDPOINTS } from "../config"

export interface CustomerReview {
  _id: string
  customer: {
    _id: string
    name: string
    email: string
    phone: string
  }
  product: {
    _id: string
    name: string
    images: string[]
  }
  order: string
  rating: number
  title: string
  review: string
  images: string[]
  status: string
  isVerifiedPurchase: boolean
  helpfulVotes: number
  reportCount: number
  createdAt: string
  updatedAt: string
  uniqueId: string
  __v: number
}

export interface ReviewsResponse {
  success: boolean
  data: {
    reviews: CustomerReview[]
    total: number
    page: number
    totalPages: number
    limit: number
  }
}

export interface ReviewListingParams {
  page?: number
  pageSize?: number
  status?: string
  rating?: number
  productId?: string
}

class ReviewService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    console.log(`Making request to: ${API_CONFIG.baseURL}${endpoint}`)

    try {
      const response = await fetch(`${API_CONFIG.baseURL}${endpoint}`, {
        ...options,
        headers: {
          ...API_CONFIG.headers,
          ...options?.headers,
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`)
      }

      const data = await response.json()
      console.log("Reviews API Response:", data)
      return data
    } catch (error) {
      console.error("Reviews API Request failed:", error)
      throw error
    }
  }

  async getReviewListing(params: ReviewListingParams = {}): Promise<ReviewsResponse> {
    const searchParams = new URLSearchParams()

    // Set default values
    const defaultParams = {
      page: 1,
      pageSize: 10,
      status: "published",
      ...params,
    }

    Object.entries(defaultParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString())
      }
    })

    const queryString = searchParams.toString()
    const endpoint = `${ENDPOINTS.REVIEWS.LISTING}?${queryString}`

    return this.request<ReviewsResponse>(endpoint)
  }

  async getReview(id: string): Promise<CustomerReview> {
    const endpoint = ENDPOINTS.REVIEWS.DETAIL(id)
    const response = await this.request<{ success: boolean; data: CustomerReview }>(endpoint)
    return response.data
  }
}

export const reviewService = new ReviewService()
