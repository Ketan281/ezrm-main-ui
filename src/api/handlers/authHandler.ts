import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { authService, type LoginCredentials, type RegisterData } from "../services/authService"
import { QUERY_KEYS } from "../config"
import { useAppStore } from "../../store/use-app-store"

export const useLogin = () => {
  const { setCustomer } = useAppStore() // Changed from setUser to setCustomer
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: (data) => {
      // Convert User to Customer format for the store
      const customerData = {
        id: data.user.id,
        uniqueId: data.user.id, // Use id as uniqueId
        name: data.user.name,
        email: data.user.email,
        phone: "", // Default empty phone
        membershipTier: "basic", // Default membership tier
        status: "active", // Default status
      }
      setCustomer(customerData) // Use setCustomer instead of setUser
      localStorage.setItem("token", data.token)
      localStorage.setItem("refreshToken", data.refreshToken)
      queryClient.setQueryData(QUERY_KEYS.AUTH.USER, data.user)
    },
  })
}

export const useRegister = () => {
  const { setCustomer } = useAppStore() // Changed from setUser to setCustomer
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: RegisterData) => authService.register(data),
    onSuccess: (data) => {
      // Convert User to Customer format for the store
      const customerData = {
        id: data.user.id,
        uniqueId: data.user.id, // Use id as uniqueId
        name: data.user.name,
        email: data.user.email,
        phone: "", // Default empty phone
        membershipTier: "basic", // Default membership tier
        status: "active", // Default status
      }
      setCustomer(customerData) // Use setCustomer instead of setUser
      localStorage.setItem("token", data.token)
      localStorage.setItem("refreshToken", data.refreshToken)
      queryClient.setQueryData(QUERY_KEYS.AUTH.USER, data.user)
    },
  })
}

export const useLogout = () => {
  const { clearCustomer } = useAppStore() // Changed from logout to clearCustomer
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      clearCustomer() // Use clearCustomer instead of logout
      localStorage.removeItem("token")
      localStorage.removeItem("refreshToken")
      queryClient.clear()
    },
  })
}

export const useProfile = () => {
  return useQuery({
    queryKey: QUERY_KEYS.AUTH.PROFILE,
    queryFn: () => authService.getProfile(),
    enabled: !!localStorage.getItem("token"),
  })
}
