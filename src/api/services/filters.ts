import axios from "axios";
import { API_CONFIG } from "../config";

export interface FilterCategory {
  id: string;
  name: string;
}

export interface FilterCountry {
  countryCode: string;
  phoneCode: string;
  name: string;
  currency: string;
  emoji: string;
  continent: string;
  isProducer: boolean;
}

export interface FiltersResponse {
  success: boolean;
  data: {
    category: FilterCategory[];
    countryOfOrigin: FilterCountry[];
  };
}

export const getFilters = async (): Promise<FiltersResponse> => {
  const response = await axios.get(
    `${API_CONFIG.baseURL}/public/products/filters`,
    {
      headers: API_CONFIG.headers,
    }
  );
  return response.data;
};
