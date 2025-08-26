import { useQuery } from "@tanstack/react-query";
import { getFilters } from "../services/filters";

export const useFilters = () => {
  return useQuery({
    queryKey: ["filters"],
    queryFn: getFilters,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
