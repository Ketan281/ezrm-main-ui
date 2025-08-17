import { API_CONFIG, ENDPOINTS } from "../config";

export interface SearchProduct {
  _id: string;
  uniqueId: string;
  name: string;
  description: string;
  price: number;
  category: string;
  inStock: boolean;
  images: string[];
  bannerImage: string;
  appearance: string;
  status: string;
  categoryName: string | null;
  id: string;
  type: "product";
}

export interface SearchCategory {
  _id: string;
  name: string;
  description: string;
  id: string;
  type: "category";
}

export interface SearchResponse {
  success: boolean;
  data: {
    products: SearchProduct[];
    categories: SearchCategory[];
    totalProducts: number;
    totalCategories: number;
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  message: string;
}

export interface SearchParams {
  q: string;
  page?: number;
  limit?: number;
}

class SearchService {
  private async makeRequest<T>(
    url: string,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(`${API_CONFIG.baseURL}${url}`, {
      ...options,
      headers: {
        ...API_CONFIG.headers,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    return response.json();
  }

  /**
   * Search for products and categories
   */
  async search(params: SearchParams): Promise<SearchResponse> {
    const searchParams = new URLSearchParams();

    // Required query parameter
    searchParams.append("q", params.q);

    // Optional parameters with defaults
    if (params.page) {
      searchParams.append("page", params.page.toString());
    }

    if (params.limit) {
      searchParams.append("limit", params.limit.toString());
    }

    const queryString = searchParams.toString();
    const endpoint = `${ENDPOINTS.SEARCH.QUERY}?${queryString}`;

    return this.makeRequest<SearchResponse>(endpoint);
  }
}

export const searchService = new SearchService();
