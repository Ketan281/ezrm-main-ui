import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  cartService,
  type AddToCartRequest,
  type UpdateCartItemRequest,
} from "../services/cart";

// Query keys
export const cartKeys = {
  all: ["cart"] as const,
  cart: () => [...cartKeys.all, "cart"] as const,
  summary: () => [...cartKeys.all, "summary"] as const,
};

// Get cart hook
export const useCart = (
  customerId: string,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: cartKeys.cart(),
    queryFn: () => cartService.getCart(customerId),
    enabled: options?.enabled !== false && !!customerId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Get cart summary hook
export const useCartSummary = (
  customerId: string,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: cartKeys.summary(),
    queryFn: () => cartService.getCartSummary(customerId),
    enabled: options?.enabled !== false && !!customerId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Add to cart hook
export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AddToCartRequest) => cartService.addToCart(data),
    onSuccess: () => {
      // Invalidate and refetch cart data
      queryClient.invalidateQueries({
        queryKey: cartKeys.all,
      });
    },
    onError: (error) => {
      console.error("Failed to add to cart:", error);
    },
  });
};

// Update cart item hook
export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productId,
      data,
    }: {
      productId: string;
      data: UpdateCartItemRequest;
    }) => cartService.updateCartItem(productId, data),
    onSuccess: () => {
      // Invalidate and refetch cart data
      queryClient.invalidateQueries({
        queryKey: cartKeys.all,
      });
    },
    onError: (error) => {
      console.error("Failed to update cart item:", error);
    },
  });
};

// Remove from cart hook
export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      customerId,
      productId,
      packOption,
    }: {
      customerId: string;
      productId: string;
      packOption?: string;
    }) => cartService.removeFromCart(customerId, productId, packOption),
    onSuccess: () => {
      // Invalidate and refetch cart data
      queryClient.invalidateQueries({
        queryKey: cartKeys.all,
      });
    },
    onError: (error) => {
      console.error("Failed to remove from cart:", error);
    },
  });
};

// Clear cart hook
export const useClearCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (customerId: string) => cartService.clearCart(customerId),
    onSuccess: () => {
      // Invalidate and refetch cart data
      queryClient.invalidateQueries({
        queryKey: cartKeys.all,
      });
    },
    onError: (error) => {
      console.error("Failed to clear cart:", error);
    },
  });
};

// Validate cart hook
export const useValidateCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (customerId: string) => cartService.validateCart(customerId),
    onSuccess: () => {
      // Invalidate and refetch cart data
      queryClient.invalidateQueries({
        queryKey: cartKeys.all,
      });
    },
    onError: (error) => {
      console.error("Failed to validate cart:", error);
    },
  });
};
