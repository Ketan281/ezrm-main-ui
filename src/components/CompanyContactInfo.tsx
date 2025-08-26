"use client";

import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import { useCompanyDetails } from "@/hooks/use-company-details";

interface CompanyContactInfoProps {
  title?: string;
  showSalesTeam?: boolean;
}

const CompanyContactInfo: React.FC<CompanyContactInfoProps> = ({
  title = "Connect with us",
  showSalesTeam = true,
}) => {
  const { companyDetails, loading } = useCompanyDetails();

  return (
    <>
      <Typography
        variant="h5"
        component="h3"
        sx={{ mb: 3, fontWeight: "bold", color: "#333", mt: 4 }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
          mb: 4,
        }}
      >
        {showSalesTeam && (
          <Card sx={{ flex: 1, boxShadow: 2 }}>
            <CardContent>
              <Typography
                variant="h6"
                sx={{ mb: 2, fontWeight: "bold", color: "#333" }}
              >
                Sales Team
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#666", lineHeight: 1.6 }}
              >
                Contact our sales team. Connect with one of the world&apos;s
                leading nutraceutical companies and explore how we can provide
                the right nutritional ingredients for your business.
              </Typography>
            </CardContent>
          </Card>
        )}
        <Card sx={{ flex: 1, boxShadow: 2 }}>
          <CardContent>
            <Typography
              variant="h6"
              sx={{ mb: 2, fontWeight: "bold", color: "#333" }}
            >
              Contact Information
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#666", lineHeight: 1.6 }}
            >
              <strong>Address:</strong>{" "}
              {loading ? "Loading..." : companyDetails?.address || "The Old Smithy, 7 High Street, Merstham, Surrey, RH1 3BA, UK"}
              <br />
              <strong>Phone:</strong>{" "}
              {loading ? "Loading..." : companyDetails?.phone || "+44 (0) 203 696 2780"}
              <br />
              <strong>WhatsApp:</strong> 447418310099
              <br />
              <strong>Email:</strong>{" "}
              {loading ? "Loading..." : companyDetails?.email || "web@nutraceuticalsgroup.com"}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default CompanyContactInfo;
