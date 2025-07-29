"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { customerAuthService, type LoginCredentials } from "../services"
import { QUERY_KEYS } from "../config"
import { useAppStore } from "@/store/use-app-store"

export const useCustomerLogin = () => {
  const queryClient = useQueryClient()
  const { setCustomer } = useAppStore()

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => customerAuthService.login(credentials),
    onSuccess: (data) => {
      // Store auth data
      customerAuthService.storeAuthData(data.data.token, data.data.customer)

      // Update app store
      setCustomer(data.data.customer)

      // Cache customer data
      queryClient.setQueryData(QUERY_KEYS.CUSTOMER_AUTH.USER, data.data.customer)

      console.log("Login successful:", data.message)
    },
    onError: (error) => {
      console.error("Login failed:", error)
    },
  })
}

export const useCustomerLogout = () => {
  const queryClient = useQueryClient()
  const { clearCustomer } = useAppStore()

  return useMutation({
    mutationFn: () => customerAuthService.logout(),
    onSuccess: () => {
      // Clear app store
      clearCustomer()

      // Clear query cache
      queryClient.clear()

      console.log("Logout successful")
    },
  })
}
