import { useQuery } from "@tanstack/react-query";
import { faqService } from "../services/faqs";

export const useProductFAQs = (productId: string) => {
  return useQuery({
    queryKey: ["product-faqs", productId],
    queryFn: () => faqService.getProductFAQs(productId),
    enabled: !!productId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};
