import { API_CONFIG, ENDPOINTS } from "../config";

export interface RFQRequest {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerPhoneCountryCode: string;
  productId?: string;
  productName: string;
  quantity: number;
  description: string;
  urgency: "low" | "medium" | "high";
  status: "pending" | "approved" | "rejected" | "completed";
  expectedDeliveryDate: string;
  budget: number;
  additionalRequirements?: string;
  attachments?: string[];
  companyWebsiteLink?: string;
  department?: string;
  companyName?: string;
  companyAddress?: string;
  availabilityDay?: string;
  availabilityTime?: string;
}

export interface RFQResponse {
  success: boolean;
  message: string;
  data?: {
    uniqueId: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    customerPhoneCountryCode: string;
    productId?: string;
    productName: string;
    quantity: number;
    description: string;
    urgency: "low" | "medium" | "high";
    status: "pending" | "approved" | "rejected" | "completed";
    expectedDeliveryDate: string;
    budget: number;
    additionalRequirements?: string;
    attachments: string[];
    companyWebsiteLink?: string;
    department?: string;
    companyName?: string;
    companyAddress?: string;
    availabilityDay?: string;
    availabilityTime?: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface RFQListingItem {
  _id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerPhoneCountryCode: string;
  productId?: string;
  productName: string;
  quantity: number;
  description: string;
  urgency: "low" | "medium" | "high";
  status: "pending" | "approved" | "rejected" | "completed";
  expectedDeliveryDate: string;
  budget: number;
  additionalRequirements?: string;
  attachments: string[];
  companyWebsiteLink?: string;
  department?: string;
  companyName?: string;
  companyAddress?: string;
  availabilityDay?: string;
  availabilityTime?: string;
  createdAt: string;
  updatedAt: string;
  uniqueId: string;
  __v: number;
}

export interface RFQListingResponse {
  success: boolean;
  message: string;
  data: RFQListingItem[];
}

class RFQService {
  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const response = await fetch(`${API_CONFIG.baseURL}${endpoint}`, {
      ...options,
      headers: {
        ...API_CONFIG.headers,
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async submitRFQ(data: RFQRequest): Promise<RFQResponse> {
    return this.request<RFQResponse>(ENDPOINTS.RFQ.SUBMIT, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getRFQListing(customerPhone: string): Promise<RFQListingResponse> {
    const endpoint = `${ENDPOINTS.RFQ.LISTING}?customerPhone=${customerPhone}`;
    return this.request<RFQListingResponse>(endpoint);
  }
}

export const rfqService = new RFQService();
