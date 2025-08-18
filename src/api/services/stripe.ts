import { API_CONFIG, ENDPOINTS } from "../config";

export interface CreatePaymentIntentRequest {
  amount: number;
  currency?: string;
  customerId: string;
  orderId: string;
  description?: string;
  metadata?: Record<string, any>;
  automatic_payment_methods?: {
    enabled: boolean;
  };
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: string;
  client_secret: string;
  created: number;
  customer?: string;
  description?: string;
  metadata?: Record<string, any>;
}

export interface PaymentIntentResponse {
  success: boolean;
  data: PaymentIntent;
  message: string;
}

class StripeService {
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
   * Create a payment intent
   */
  async createPaymentIntent(
    paymentData: CreatePaymentIntentRequest
  ): Promise<PaymentIntentResponse> {
    return this.makeRequest<PaymentIntentResponse>(
      ENDPOINTS.STRIPE.CREATE_PAYMENT_INTENT,
      {
        method: "POST",
        body: JSON.stringify(paymentData),
      }
    );
  }
}

export const stripeService = new StripeService();
