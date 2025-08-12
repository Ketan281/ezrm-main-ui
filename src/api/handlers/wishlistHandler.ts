import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { wishlistService, type WishlistParams } from "../services/wishlist"

// Query keys
export const wishlistKeys = {
  all: ["wishlist"] as const,
  lists: () => [...wishlistKeys.all, "list"] as const,
  list: (customerId: string) => [...wishlistKeys.lists(), customerId] as const,
}

// Get wishlist hook
export const useWishlist = (params: WishlistParams, options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: wishlistKeys.list(params.customerId),
    queryFn: () => wishlistService.getWishlist(params),
    enabled: options?.enabled !== false && !!params.customerId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

// Add to wishlist hook
export const useAddToWishlist = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ customerId, productId }: { customerId: string; productId: string }) =>
      wishlistService.addToWishlist(customerId, productId),
    onSuccess: (data, variables) => {
      // Invalidate and refetch wishlist
      queryClient.invalidateQueries({
        queryKey: wishlistKeys.list(variables.customerId),
      })
    },
    onError: (error) => {
      console.error("Failed to add to wishlist:", error)
    },
  })
}

// Remove from wishlist hook
export const useRemoveFromWishlist = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ customerId, productId }: { customerId: string; productId: string }) =>
      wishlistService.removeFromWishlist(customerId, productId),
    onSuccess: (data, variables) => {
      // Invalidate and refetch wishlist
      queryClient.invalidateQueries({
        queryKey: wishlistKeys.list(variables.customerId),
      })
    },
    onError: (error) => {
      console.error("Failed to remove from wishlist:", error)
    },
  })
}
