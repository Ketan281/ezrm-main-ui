import { useQuery } from "@tanstack/react-query"
import { productService, type ProductListingParams } from "../services"
import { QUERY_KEYS } from "../config"

export const useProductListing = (params?: ProductListingParams) => {
  return useQuery({
    queryKey: QUERY_KEYS.PRODUCTS.LISTING(params),
    queryFn: () => productService.getProductListing(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.PRODUCTS.DETAIL(id),
    queryFn: () => productService.getProduct(id),
    enabled: !!id,
  })
}
