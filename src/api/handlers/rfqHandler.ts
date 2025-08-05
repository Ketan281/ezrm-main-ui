import { useMutation } from "@tanstack/react-query"
import { rfqService, type CreateRFQRequest, type CreateRFQResponse } from "../services/rfq"

export const useCreateRFQ = () => {
  return useMutation<CreateRFQResponse, Error, CreateRFQRequest>({
    mutationFn: (data: CreateRFQRequest) => rfqService.createRFQ(data),
    onSuccess: (data) => {
      console.log("RFQ created successfully:", data)
    },
    onError: (error) => {
      console.error("Failed to create RFQ:", error)
    },
  })
}
