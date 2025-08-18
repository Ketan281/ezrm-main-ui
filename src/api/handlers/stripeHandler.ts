import { stripeService } from "../services/stripe";
import type {
  CreatePaymentIntentRequest,
  PaymentIntent,
  PaymentIntentResponse,
} from "../services/stripe";

export const stripeHandler = {
  /**
   * Create a payment intent
   */
  createPaymentIntent: async (
    paymentData: CreatePaymentIntentRequest
  ): Promise<PaymentIntent> => {
    try {
      const response: PaymentIntentResponse = await stripeService.createPaymentIntent(
        paymentData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating payment intent:", error);
      throw error;
    }
  },
};
