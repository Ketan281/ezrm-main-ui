"use client"

import { useQuery } from "@tanstack/react-query"
import { productDetailService } from "../services"
import { QUERY_KEYS } from "../config"

export const useProductDetail = (productId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.PRODUCTS.DETAIL(productId),
    queryFn: () => productDetailService.getProductDetail(productId),
    enabled: !!productId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    retryDelay: 1000,
  })
}
