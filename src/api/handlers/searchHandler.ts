import { searchService } from "../services/search";
import type {
  SearchProduct,
  SearchCategory,
  SearchResponse,
  SearchParams,
} from "../services/search";

export interface SearchResults {
  products: SearchProduct[];
  categories: SearchCategory[];
  totalProducts: number;
  totalCategories: number;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const searchHandler = {
  /**
   * Search for products and categories
   */
  search: async (
    query: string,
    page = 1,
    limit = 20
  ): Promise<SearchResults> => {
    try {
      const params: SearchParams = {
        q: query,
        page,
        limit,
      };

      const response: SearchResponse = await searchService.search(params);

      return response.data;
    } catch (error) {
      console.error("Error searching:", error);
      throw error;
    }
  },
};
