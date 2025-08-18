import { API_CONFIG, ENDPOINTS } from "../config";

export interface Country {
  countryCode: string;
  phoneCode: string;
  name: string;
  currency: string;
  emoji: string;
  continent: string;
}

export interface CountriesResponse {
  success: boolean;
  data: Country[];
}

class CountriesService {
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
   * Get all countries
   */
  async getCountries(): Promise<CountriesResponse> {
    return this.makeRequest<CountriesResponse>(ENDPOINTS.COUNTRIES.LIST);
  }

  /**
   * Get countries by continent
   */
  async getCountriesByContinent(continent: string): Promise<Country[]> {
    const response = await this.getCountries();
    return response.data.filter((country) => country.continent === continent);
  }

  /**
   * Get country by country code
   */
  async getCountryByCode(countryCode: string): Promise<Country | undefined> {
    const response = await this.getCountries();
    return response.data.find((country) => country.countryCode === countryCode);
  }

  /**
   * Search countries by name
   */
  async searchCountries(query: string): Promise<Country[]> {
    const response = await this.getCountries();
    const lowercaseQuery = query.toLowerCase();
    return response.data.filter(
      (country) =>
        country.name.toLowerCase().includes(lowercaseQuery) ||
        country.countryCode.toLowerCase().includes(lowercaseQuery)
    );
  }
}

export const countriesService = new CountriesService();
