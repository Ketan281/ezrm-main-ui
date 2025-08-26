export interface FAQ {
  _id: string;
  question: string;
  answer: string;
  image: string;
  key: string;
  entityId: string;
  entityType: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FAQResponse {
  success: boolean;
  data: FAQ[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  message: string;
}

class FAQService {
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || "";
  }

  async getProductFAQs(productId: string): Promise<FAQResponse> {
    try {
      const response = await fetch(
        `${this.baseURL}/public/faqs/product/${productId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching product FAQs:", error);
      throw error;
    }
  }
}

export const faqService = new FAQService();
