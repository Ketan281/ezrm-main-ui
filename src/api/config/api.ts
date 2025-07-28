import { QueryClient } from "@tanstack/react-query"

// Create a default query client (this will be overridden by the one in ClientLayout)
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
})

// API base configuration
export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5007/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
}
