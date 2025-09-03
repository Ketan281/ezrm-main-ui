// import { apiConfig } from "./config";

import axios from "axios";
import { API_CONFIG } from "../config";

export interface CheckoutSessionRequest {
  customerId: string;
  orderId: string;
  amount: number;
  currency: string;
  customerName: string;
  customerEmail: string;
  shippingAddress: {
    addressLine1: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  lineItems: Array<{
    price_data: {
      currency: string;
      product_data: {
        name: string;
        description?: string;
        images?: string[];
      };
      unit_amount: number;
    };
    quantity: number;
  }>;
  mode: "payment" | "subscription" | "setup";
  successUrl: string;
  cancelUrl: string;
}

export interface CheckoutSessionResponse {
  sessionId: string;
  url?: string;
}

export const checkoutSessionsService = {
  createCheckoutSession: async (
    data: CheckoutSessionRequest
  ): Promise<CheckoutSessionResponse> => {
    try {
      const response = await axios.post(
        `${API_CONFIG.baseURL}/public/stripe/checkout-sessions`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error creating checkout session:", error);
      throw error;
    }
  },
};
