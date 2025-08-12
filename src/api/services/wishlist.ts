import { API_CONFIG } from "../config/api"

export interface WishlistProduct {
  _id: string
  name: string
  description?: string
  price: number
  images: string[]
  bannerImage?: string
  uniqueId: string
  category: string
  inStock: boolean
  createdAt: string
  updatedAt: string
}

export interface Wishlist {
  _id: string
  customerId: string
  products: WishlistProduct[]
  createdAt: string
  updatedAt: string
  __v: number
}

export interface WishlistResponse {
  success: boolean
  data: Wishlist
}

export interface WishlistParams {
  customerId: string
}

class WishlistService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private async makeRequest(url: string, options: RequestInit = {}): Promise<any> {
    const token = typeof window !== "undefined" ? localStorage.getItem("auth-token") : null

    const response = await fetch(`${API_CONFIG.baseURL}${url}`, {
      ...options,
      headers: {
        ...API_CONFIG.headers,
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  }

  async getWishlist(params: WishlistParams): Promise<WishlistResponse> {
    const url = `/public/wishlist?customerId=${params.customerId}`
    return this.makeRequest(url)
  }

  async addToWishlist(customerId: string, productId: string): Promise<WishlistResponse> {
    return this.makeRequest("/public/wishlist/add", {
      method: "POST",
      body: JSON.stringify({
        customerId,
        productId,
      }),
    })
  }

  async removeFromWishlist(customerId: string, productId: string): Promise<WishlistResponse> {
    return this.makeRequest("/public/wishlist/remove", {
      method: "POST",
      body: JSON.stringify({
        customerId,
        productId,
      }),
    })
  }
}

export const wishlistService = new WishlistService()
