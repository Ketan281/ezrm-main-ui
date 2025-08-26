import axios from "axios";
import { API_CONFIG } from "../config";

export interface ContactQueryRequest {
  name: string;
  mobile: string;
  email: string;
  message: string;
  source: string;
}

export interface ContactQueryResponse {
  success: boolean;
  message: string;
  data?: any;
}

export const submitContactQuery = async (
  data: ContactQueryRequest
): Promise<ContactQueryResponse> => {
  const response = await axios.post(
    `${API_CONFIG.baseURL}/public/queries`,
    data,
    {
      headers: API_CONFIG.headers,
    }
  );
  return response.data;
};
