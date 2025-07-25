import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { authService, type LoginCredentials, type RegisterData } from "../services/authService"
import { QUERY_KEYS } from "../config"
import { useAppStore } from "../../store/use-app-store"

export const useLogin = () => {
  const { setUser } = useAppStore()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: (data) => {
      setUser(data.user)
      localStorage.setItem("token", data.token)
      localStorage.setItem("refreshToken", data.refreshToken)
      queryClient.setQueryData(QUERY_KEYS.AUTH.USER, data.user)
    },
  })
}

export const useRegister = () => {
  const { setUser } = useAppStore()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: RegisterData) => authService.register(data),
    onSuccess: (data) => {
      setUser(data.user)
      localStorage.setItem("token", data.token)
      localStorage.setItem("refreshToken", data.refreshToken)
      queryClient.setQueryData(QUERY_KEYS.AUTH.USER, data.user)
    },
  })
}

export const useLogout = () => {
  const { logout } = useAppStore()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      logout()
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
