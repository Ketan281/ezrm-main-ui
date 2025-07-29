import { API_CONFIG, ENDPOINTS } from "../config"

export interface Category {
  _id: string
  name: string
  description: string
  slug: string
  parentCategory: string | null
  image: string
  status: string
  tags: string[]
  createdAt: string
  updatedAt: string
  uniqueId: string
  __v: number
}

export interface CategoriesResponse {
  success: boolean
  categories: Category[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export interface CategoryListingParams {
  page?: number
  limit?: number
  tag?: string
  status?: string
  parentCategory?: string
}

class CategoryService {
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
      console.log("Categories API Response:", data)
      return data
    } catch (error) {
      console.error("Categories API Request failed:", error)
      throw error
    }
  }

  async getCategoryListing(params: CategoryListingParams = {}): Promise<CategoriesResponse> {
    const searchParams = new URLSearchParams()

    // Set default values
    const defaultParams = {
      page: 1,
      limit: 20,
      status: "active",
      ...params,
    }

    Object.entries(defaultParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString())
      }
    })

    const queryString = searchParams.toString()
    const endpoint = `${ENDPOINTS.CATEGORIES.LISTING}?${queryString}`

    return this.request<CategoriesResponse>(endpoint)
  }

  async getCategory(id: string): Promise<Category> {
    const endpoint = ENDPOINTS.CATEGORIES.DETAIL(id)
    const response = await this.request<{ success: boolean; category: Category }>(endpoint)
    return response.category
  }
}

export const categoryService = new CategoryService()
