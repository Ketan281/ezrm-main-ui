import axios from "axios";
import { API_CONFIG } from "../config";

export interface FilterItem {
  id: string;
  slug: string;
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
    category: FilterItem[];
    subCategory: FilterItem[];
    application: FilterItem[];
    tag: FilterItem[];
    function: FilterItem[];
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
