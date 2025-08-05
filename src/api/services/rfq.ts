import { API_CONFIG } from "../config"

export interface CreateRFQRequest {
  customerName: string
  customerEmail: string
  customerPhone: string
  customerPhoneCountryCode: string
  productId?: string
  productName: string
  quantity: number
  description?: string
  urgency: "low" | "medium" | "high"
  status: "pending"
  expectedDeliveryDate?: string
  budget?: number
  additionalRequirements?: string
  attachments?: string[]
  companyWebsiteLink?: string
  department: string
  companyName?: string
  companyAddress?: string
  availabilityDay?: string
  availabilityTime?: string
}

export interface CreateRFQResponse {
  success: boolean
  message: string
  data: {
    uniqueId: string
    customerName: string
    customerEmail: string
    customerPhone: string
    customerPhoneCountryCode: string
    productId: string
    productName: string
    quantity: number
    description: string
    urgency: string
    status: string
    expectedDeliveryDate: string
    budget: number
    additionalRequirements: string
    attachments: string[]
    createdAt: string
  }
}

// Export alias for backward compatibility
export type RFQResponse = CreateRFQResponse
export type RFQRequest = CreateRFQRequest

class RFQService {
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
      console.log("RFQ API Response:", data)
      return data
    } catch (error) {
      console.error("RFQ API Request failed:", error)
      throw error
    }
  }

  async createRFQ(rfqData: CreateRFQRequest): Promise<CreateRFQResponse> {
    const endpoint = "/public/rfq/request-for-quotation"

    return this.request<CreateRFQResponse>(endpoint, {
      method: "POST",
      body: JSON.stringify(rfqData),
    })
  }
}

export const rfqService = new RFQService()
