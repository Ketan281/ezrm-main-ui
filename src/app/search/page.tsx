"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Box, Container } from "@mui/material";
import SearchBox from "@/components/SearchBox";
import SearchResults from "@/components/SearchResults";
import { searchHandler } from "@/api/handlers/searchHandler";
import type { SearchResults as SearchResultsType } from "@/api/handlers/searchHandler";

const SearchPage: React.FC = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const [searchResults, setSearchResults] = useState<SearchResultsType>({
    products: [],
    categories: [],
    totalProducts: 0,
    totalCategories: 0,
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(false);
  const [currentQuery, setCurrentQuery] = useState(query);

  useEffect(() => {
    if (query) {
      setCurrentQuery(query);
      performSearch(query);
    }
  }, [query]);

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const results = await searchHandler.search(searchQuery.trim());
      setSearchResults(results);
    } catch (error) {
      console.error("Search failed:", error);
      setSearchResults({
        products: [],
        categories: [],
        totalProducts: 0,
        totalCategories: 0,
        total: 0,
        page: 1,
        limit: 20,
        totalPages: 1,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Search Header */}
        <Box sx={{ mb: 4 }}>
          <SearchBox
            fullWidth
            showDropdown={false}
            placeholder="Search products, categories..."
          />
        </Box>

        {/* Search Results */}
        <SearchResults
          products={searchResults.products}
          categories={searchResults.categories}
          totalProducts={searchResults.totalProducts}
          totalCategories={searchResults.totalCategories}
          searchQuery={currentQuery}
          loading={loading}
        />
      </Container>
    </Box>
  );
};

export default SearchPage;
