import { API_CONFIG, ENDPOINTS } from "../config"

export interface Customer {
  id: string
  uniqueId: string
  name: string
  email: string
  phone: string
  membershipTier: string
  status: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginResponse {
  success: boolean
  message: string
  data: {
    token: string
    customer: Customer
  }
}

class CustomerAuthService {
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
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status} - ${response.statusText}`)
      }

      const data = await response.json()
      console.log("Customer Auth API Response:", data)
      return data
    } catch (error) {
      console.error("Customer Auth API Request failed:", error)
      throw error
    }
  }

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const endpoint = ENDPOINTS.CUSTOMER_AUTH.LOGIN

    return this.request<LoginResponse>(endpoint, {
      method: "POST",
      body: JSON.stringify(credentials),
    })
  }

  async logout(): Promise<void> {
    // Clear local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("customer_token")
      localStorage.removeItem("customer_data")
    }
  }

  getStoredToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("customer_token")
    }
    return null
  }

  getStoredCustomer(): Customer | null {
    if (typeof window !== "undefined") {
      const customerData = localStorage.getItem("customer_data")
      return customerData ? JSON.parse(customerData) : null
    }
    return null
  }

  storeAuthData(token: string, customer: Customer): void {
    if (typeof window !== "undefined") {
      localStorage.setItem("customer_token", token)
      localStorage.setItem("customer_data", JSON.stringify(customer))
    }
  }
}

export const customerAuthService = new CustomerAuthService()
