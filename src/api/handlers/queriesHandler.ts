import { useMutation } from "@tanstack/react-query";
import { submitContactQuery, ContactQueryRequest } from "../services/queries";

export const useSubmitContactQuery = () => {
  return useMutation({
    mutationFn: (data: ContactQueryRequest) => submitContactQuery(data),
  });
};
