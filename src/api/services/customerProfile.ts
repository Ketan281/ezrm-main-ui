import { API_CONFIG, ENDPOINTS } from "../config";

export interface UpdateProfileRequest {
  name?: string;
  phone?: string;
  companyName?: string;
  companyAddress?: string;
  businessType?: string;
  annualRevenue?: string;
  employeeCount?: string;
  website?: string;
  description?: string;
}

export interface CustomerProfile {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  companyName?: string;
  companyAddress?: string;
  businessType?: string;
  annualRevenue?: string;
  employeeCount?: string;
  website?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileUpdateResponse {
  success: boolean;
  data: CustomerProfile;
  message: string;
}

class CustomerProfileService {
  private async makeRequest<T>(
    url: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("customer_token")
        : null;

    const response = await fetch(`${API_CONFIG.baseURL}${url}`, {
      ...options,
      headers: {
        ...API_CONFIG.headers,
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    return response.json();
  }

  /**
   * Update customer profile
   */
  async updateProfile(
    customerId: string,
    updateData: UpdateProfileRequest
  ): Promise<ProfileUpdateResponse> {
    return this.makeRequest<ProfileUpdateResponse>(
      ENDPOINTS.CUSTOMER_PROFILE.UPDATE(customerId),
      {
        method: "PUT",
        body: JSON.stringify(updateData),
      }
    );
  }

  /**
   * Get customer profile
   */
  async getProfile(customerId: string): Promise<ProfileUpdateResponse> {
    return this.makeRequest<ProfileUpdateResponse>(
      ENDPOINTS.CUSTOMER_PROFILE.GET(customerId),
      { method: "GET" }
    );
  }
}

export const customerProfileService = new CustomerProfileService();
