import { useMutation, useQuery } from "@tanstack/react-query";
import { rfqService, type RFQRequest, type RFQListingResponse } from "../services/rfq";

export const useSubmitRFQ = () => {
  return useMutation({
    mutationFn: (data: RFQRequest) => rfqService.submitRFQ(data),
  });
};

export const useRFQListing = (customerPhone: string) => {
  return useQuery({
    queryKey: ["rfq-listing", customerPhone],
    queryFn: () => rfqService.getRFQListing(customerPhone),
    enabled: !!customerPhone,
  });
};
