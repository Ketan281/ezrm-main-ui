"use client"

import { useQuery } from "@tanstack/react-query"
import { reviewService, type ReviewListingParams } from "../services/reviews"
import { QUERY_KEYS } from "../config"

export const useReviewListing = (params?: ReviewListingParams) => {
  return useQuery({
    queryKey: QUERY_KEYS.REVIEWS.LISTING(params),
    queryFn: () => reviewService.getReviewListing(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    retryDelay: 1000,
  })
}

export const useReview = (id: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.REVIEWS.DETAIL(id),
    queryFn: () => reviewService.getReview(id),
    enabled: !!id,
    retry: 2,
    retryDelay: 1000,
  })
}
