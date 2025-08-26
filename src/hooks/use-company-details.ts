"use client";

import { useState, useEffect } from "react";
import { getCompanyDetails, CompanyDetails } from "@/api/services/companyDetails";

export const useCompanyDetails = () => {
  const [companyDetails, setCompanyDetails] = useState<CompanyDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getCompanyDetails();
        setCompanyDetails(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch company details");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyDetails();
  }, []);

  return {
    companyDetails,
    loading,
    error,
    refetch: () => {
      setLoading(true);
      getCompanyDetails()
        .then(setCompanyDetails)
        .catch((err) => setError(err instanceof Error ? err.message : "Failed to fetch company details"))
        .finally(() => setLoading(false));
    },
  };
};
