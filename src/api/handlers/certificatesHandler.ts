"use client"

import { useQuery } from "@tanstack/react-query"
import { certificateService, type CertificateListingParams } from "../services"
import { QUERY_KEYS } from "../config"

export const useCertificateListing = (params?: CertificateListingParams) => {
  return useQuery({
    queryKey: QUERY_KEYS.CERTIFICATES.LISTING(params),
    queryFn: () => certificateService.getCertificateListing(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    retryDelay: 1000,
  })
}

export const useCertificate = (id: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.CERTIFICATES.DETAIL(id),
    queryFn: () => certificateService.getCertificate(id),
    enabled: !!id,
    retry: 2,
    retryDelay: 1000,
  })
}
