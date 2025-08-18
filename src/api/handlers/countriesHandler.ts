import { countriesService } from "../services/countries";
import type { Country } from "../services/countries";

export const countriesHandler = {
  /**
   * Get all countries
   */
  getCountries: async (): Promise<Country[]> => {
    try {
      const response = await countriesService.getCountries();
      return response.data;
    } catch (error) {
      console.error("Error fetching countries:", error);
      throw error;
    }
  },

  /**
   * Get countries by continent
   */
  getCountriesByContinent: async (continent: string): Promise<Country[]> => {
    try {
      return await countriesService.getCountriesByContinent(continent);
    } catch (error) {
      console.error("Error fetching countries by continent:", error);
      throw error;
    }
  },

  /**
   * Get country by country code
   */
  getCountryByCode: async (
    countryCode: string
  ): Promise<Country | undefined> => {
    try {
      return await countriesService.getCountryByCode(countryCode);
    } catch (error) {
      console.error("Error fetching country by code:", error);
      throw error;
    }
  },

  /**
   * Search countries by name
   */
  searchCountries: async (query: string): Promise<Country[]> => {
    try {
      return await countriesService.searchCountries(query);
    } catch (error) {
      console.error("Error searching countries:", error);
      throw error;
    }
  },
};
