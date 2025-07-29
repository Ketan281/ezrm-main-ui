"use client"

import { useQuery } from "@tanstack/react-query"
import { categoryService, type CategoryListingParams } from "../services"
import { QUERY_KEYS } from "../config"

export const useCategoryListing = (params?: CategoryListingParams) => {
  return useQuery({
    queryKey: QUERY_KEYS.CATEGORIES.LISTING(params),
    queryFn: () => categoryService.getCategoryListing(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    retryDelay: 1000,
  })
}

export const useFeaturedCategories = () => {
  return useQuery({
    queryKey: QUERY_KEYS.CATEGORIES.FEATURED,
    queryFn: () => categoryService.getCategoryListing({ tag: "Featured", limit: 20 }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    retryDelay: 1000,
  })
}

export const useCategory = (id: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.CATEGORIES.DETAIL(id),
    queryFn: () => categoryService.getCategory(id),
    enabled: !!id,
    retry: 2,
    retryDelay: 1000,
  })
}
