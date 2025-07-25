import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { orderService, type CreateOrderData } from "../services/orders"
import { QUERY_KEYS } from "../config"

export const useOrders = (userId?: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.ORDERS.LIST(userId),
    queryFn: () => orderService.getOrders(userId),
  })
}

export const useOrder = (id: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.ORDERS.DETAIL(id),
    queryFn: () => orderService.getOrder(id),
    enabled: !!id,
  })
}

export const useCreateOrder = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (orderData: CreateOrderData) => orderService.createOrder(orderData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ORDERS.ALL })
    },
  })
}

export const useCancelOrder = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => orderService.cancelOrder(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ORDERS.ALL })
      queryClient.setQueryData(QUERY_KEYS.ORDERS.DETAIL(data.id), data)
    },
  })
}
