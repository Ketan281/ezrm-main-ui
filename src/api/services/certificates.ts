import { API_CONFIG, ENDPOINTS } from "../config"

export interface AssetLink {
  fileType: string
  url: string
  name: string
  size: number
}

export interface Certificate {
  _id: string
  title: string
  certificationName: string
  descr: string
  bannerImage: string
  assetsLinks: AssetLink[]
  productId: string | null
  issuedBy: string
  issueDate: string
  expiryDate: string
  certificateId: string
  tags: string[]
  isActive: boolean
  status: string
  createdBy: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface CertificatesResponse {
  success: boolean
  data: {
    certifications: Certificate[]
    total: number
    page: number
    totalPages: number
    limit: number
  }
}

export interface CertificateListingParams {
  page?: number
  limit?: number
  status?: string
  isActive?: boolean
  tags?: string
}

class CertificateService {
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
      console.log("Certificates API Response:", data)
      return data
    } catch (error) {
      console.error("Certificates API Request failed:", error)
      throw error
    }
  }

  async getCertificateListing(params: CertificateListingParams = {}): Promise<CertificatesResponse> {
    const searchParams = new URLSearchParams()

    // Set default values
    const defaultParams = {
      page: 1,
      limit: 10,
      status: "published",
      isActive: true,
      ...params,
    }

    Object.entries(defaultParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString())
      }
    })

    const queryString = searchParams.toString()
    const endpoint = `${ENDPOINTS.CERTIFICATES.LISTING}?${queryString}`

    return this.request<CertificatesResponse>(endpoint)
  }

  async getCertificate(id: string): Promise<Certificate> {
    const endpoint = ENDPOINTS.CERTIFICATES.DETAIL(id)
    const response = await this.request<{ success: boolean; data: Certificate }>(endpoint)
    return response.data
  }
}

export const certificateService = new CertificateService()
