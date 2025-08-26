import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Divider,
  Avatar,
  Skeleton,
  Alert,
  Paper,
} from "@mui/material";
import {
  Close,
  Visibility,
  CalendarToday,
  AttachMoney,
  LocalShipping,
  Business,
  Email,
  Phone,
  LocationOn,
  Schedule,
  PriorityHigh,
  CheckCircle,
  Pending,
  Cancel,
  Warning,
} from "@mui/icons-material";
import { useRFQListing } from "@/api/handlers/rfqHandler";
import { RFQListingItem } from "@/api/services/rfq";

interface RFQListingProps {
  customerPhone: string;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "warning";
    case "approved":
      return "success";
    case "rejected":
      return "error";
    case "completed":
      return "info";
    default:
      return "default";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "pending":
      return <Pending />;
    case "approved":
      return <CheckCircle />;
    case "rejected":
      return <Cancel />;
    case "completed":
      return <CheckCircle />;
    default:
      return <Pending />;
  }
};

const getUrgencyColor = (urgency: string) => {
  switch (urgency) {
    case "high":
      return "error";
    case "medium":
      return "warning";
    case "low":
      return "success";
    default:
      return "default";
  }
};

const getUrgencyIcon = (urgency: string) => {
  switch (urgency) {
    case "high":
      return <PriorityHigh />;
    case "medium":
      return <Warning />;
    case "low":
      return <CheckCircle />;
    default:
      return <Pending />;
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

const RFQDetailModal: React.FC<{
  open: boolean;
  onClose: () => void;
  rfq: RFQListingItem | null;
}> = ({ open, onClose, rfq }) => {
  if (!rfq) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          maxHeight: "90vh",
          overflow: "hidden",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          border: "1px solid rgba(255, 107, 53, 0.1)",
        },
      }}
    >
      <DialogTitle
        sx={{
          background: "linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="75" cy="75" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="50" cy="10" r="0.5" fill="rgba(255,255,255,0.1)"/><circle cx="10" cy="60" r="0.5" fill="rgba(255,255,255,0.1)"/><circle cx="90" cy="40" r="0.5" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>\')',
            opacity: 0.3,
          },
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight="bold">
            RFQ Details
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            {rfq.uniqueId}
          </Typography>
        </Box>
        <IconButton
          onClick={onClose}
          sx={{
            color: "white",
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(10px)",
            "&:hover": {
              background: "rgba(255,255,255,0.2)",
            },
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ maxHeight: "calc(90vh - 80px)", overflowY: "auto" }}>
          <Box sx={{ p: 3 }}>
            {/* Header Info */}
            <Box sx={{ mb: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: "space-between",
                  alignItems: { xs: "flex-start", md: "center" },
                  gap: 2,
                }}
              >
                <Box>
                  <Typography variant="h6" fontWeight="bold" color="primary">
                    {rfq.productName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Quantity: {rfq.quantity} units
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 1, flexShrink: 0 }}>
                  <Chip
                    icon={getStatusIcon(rfq.status)}
                    label={rfq.status.toUpperCase()}
                    color={getStatusColor(rfq.status) as any}
                  />
                  <Chip
                    icon={getUrgencyIcon(rfq.urgency)}
                    label={rfq.urgency.toUpperCase()}
                    color={getUrgencyColor(rfq.urgency) as any}
                  />
                </Box>
              </Box>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Customer Information */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                Customer Information
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  gap: 3,
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Business sx={{ mr: 1, color: "primary.main" }} />
                    <Typography variant="body2" fontWeight="medium">
                      {rfq.customerName}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Email sx={{ mr: 1, color: "primary.main" }} />
                    <Typography variant="body2">{rfq.customerEmail}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Phone sx={{ mr: 1, color: "primary.main" }} />
                    <Typography variant="body2">
                      {rfq.customerPhoneCountryCode} {rfq.customerPhone}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ flex: 1 }}>
                  {rfq.companyName && (
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Business sx={{ mr: 1, color: "primary.main" }} />
                      <Typography variant="body2" fontWeight="medium">
                        {rfq.companyName}
                      </Typography>
                    </Box>
                  )}
                  {rfq.companyAddress && (
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <LocationOn sx={{ mr: 1, color: "primary.main" }} />
                      <Typography variant="body2">
                        {rfq.companyAddress}
                      </Typography>
                    </Box>
                  )}
                  {rfq.department && (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Business sx={{ mr: 1, color: "primary.main" }} />
                      <Typography variant="body2">{rfq.department}</Typography>
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Project Details */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                Project Details
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  gap: 3,
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <CalendarToday sx={{ mr: 1, color: "primary.main" }} />
                    <Typography variant="body2" fontWeight="medium">
                      Expected Delivery:
                    </Typography>
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      {formatDate(rfq.expectedDeliveryDate)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <AttachMoney sx={{ mr: 1, color: "primary.main" }} />
                    <Typography variant="body2" fontWeight="medium">
                      Budget:
                    </Typography>
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      {formatCurrency(rfq.budget)}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ flex: 1 }}>
                  {rfq.availabilityDay && (
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Schedule sx={{ mr: 1, color: "primary.main" }} />
                      <Typography variant="body2" fontWeight="medium">
                        Availability:
                      </Typography>
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        {rfq.availabilityDay}
                      </Typography>
                    </Box>
                  )}
                  {rfq.availabilityTime && (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Schedule sx={{ mr: 1, color: "primary.main" }} />
                      <Typography variant="body2" fontWeight="medium">
                        Time:
                      </Typography>
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        {rfq.availabilityTime}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Description */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                Description
              </Typography>
              <Paper
                sx={{
                  p: 2,
                  background: "rgba(255, 107, 53, 0.05)",
                  border: "1px solid rgba(255, 107, 53, 0.1)",
                }}
              >
                <Typography variant="body2">{rfq.description}</Typography>
              </Paper>
            </Box>

            {/* Additional Requirements */}
            {rfq.additionalRequirements && (
              <>
                <Divider sx={{ mb: 3 }} />
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                    Additional Requirements
                  </Typography>
                  <Paper
                    sx={{
                      p: 2,
                      background: "rgba(255, 107, 53, 0.05)",
                      border: "1px solid rgba(255, 107, 53, 0.1)",
                    }}
                  >
                    <Typography variant="body2">
                      {rfq.additionalRequirements}
                    </Typography>
                  </Paper>
                </Box>
              </>
            )}

            {/* Timestamps */}
            <Divider sx={{ mb: 3 }} />
            <Box>
              <Typography variant="body2" color="text.secondary">
                Created: {formatDate(rfq.createdAt)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Last Updated: {formatDate(rfq.updatedAt)}
              </Typography>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

const RFQListing: React.FC<RFQListingProps> = ({ customerPhone }) => {
  // Clean phone number by removing country code prefix
  const cleanPhoneNumber = (phone: string) => {
    if (!phone) return "";

    // Remove common country code patterns:
    // +91-9876543210 -> 9876543210
    // +91 9876543210 -> 9876543210
    // 91-9876543210 -> 9876543210
    // +1-555-123-4567 -> 555-123-4567
    // +44 20 7946 0958 -> 20 7946 0958

    // First, remove leading + and country codes (1-3 digits)
    let cleaned = phone.replace(/^\+?\d{1,3}[- ]?/, "");

    // Remove any remaining spaces or dashes at the beginning
    cleaned = cleaned.replace(/^[- ]+/, "");

    return cleaned;
  };

  const cleanedPhone = cleanPhoneNumber(customerPhone);
  const { data, isLoading, error } = useRFQListing(cleanedPhone);
  const [selectedRFQ, setSelectedRFQ] = useState<RFQListingItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleViewDetails = (rfq: RFQListingItem) => {
    setSelectedRFQ(rfq);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedRFQ(null);
  };

  if (isLoading) {
    return (
      <Box>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
          Your RFQs
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {[1, 2, 3].map((item) => (
            <Card key={item}>
              <CardContent>
                <Skeleton variant="text" width="60%" height={32} />
                <Skeleton variant="text" width="40%" height={24} />
                <Box sx={{ mt: 2 }}>
                  <Skeleton variant="rectangular" height={20} />
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
          Your RFQs
        </Typography>
        <Alert severity="error">
          Failed to load RFQs. Please try again later.
        </Alert>
      </Box>
    );
  }

  const rfqs = data?.data || [];

  return (
    <Box>
      {/* <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
        Your RFQs ({rfqs.length})
      </Typography> */}

      {rfqs.length === 0 ? (
        <Card>
          <CardContent sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
              No RFQs Found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              You haven't submitted any RFQs yet. Start by requesting a quote
              for any product.
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {rfqs.map((rfq) => (
            <Card
              key={rfq._id}
              sx={{
                width: "100%",
                maxWidth: 800,
                mx: "auto",
                transition: "all 0.3s ease",
                borderRadius: 2,
                overflow: "hidden",
                background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
                border: "1px solid rgba(255, 107, 53, 0.1)",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 12px 24px rgba(255, 107, 53, 0.12)",
                  borderColor: "rgba(255, 107, 53, 0.3)",
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                {/* Header Section */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 2,
                    pb: 2,
                    borderBottom: "1px solid rgba(0,0,0,0.08)",
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="h6"
                      fontWeight={600}
                      color="primary"
                      sx={{ mb: 0.5, fontSize: "1.1rem" }}
                    >
                      {rfq.productName}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        fontSize: "0.8rem",
                        fontWeight: 400,
                      }}
                    >
                      <Box
                        component="span"
                        sx={{
                          width: 4,
                          height: 4,
                          borderRadius: "50%",
                          backgroundColor: "primary.main",
                        }}
                      />
                      {rfq.uniqueId} • {formatDate(rfq.createdAt)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1, flexShrink: 0 }}>
                    <Chip
                      icon={getStatusIcon(rfq.status)}
                      label={rfq.status.toUpperCase()}
                      color={getStatusColor(rfq.status) as any}
                      size="small"
                      sx={{
                        fontWeight: 500,
                        fontSize: "0.7rem",
                        height: 24,
                      }}
                    />
                    <Chip
                      icon={getUrgencyIcon(rfq.urgency)}
                      label={rfq.urgency.toUpperCase()}
                      color={getUrgencyColor(rfq.urgency) as any}
                      size="small"
                      sx={{
                        fontWeight: 500,
                        fontSize: "0.7rem",
                        height: 24,
                      }}
                    />
                  </Box>
                </Box>

                {/* Details Grid */}
                <Box sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
                      gap: 2,
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        p: 1.5,
                        backgroundColor: "rgba(255, 107, 53, 0.05)",
                        borderRadius: 1.5,
                        border: "1px solid rgba(255, 107, 53, 0.1)",
                      }}
                    >
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 0.5,
                          fontSize: "0.7rem",
                          fontWeight: 500,
                          textTransform: "uppercase",
                        }}
                      >
                        Quantity
                      </Typography>
                      <Typography
                        variant="body1"
                        fontWeight={600}
                        color="primary"
                        sx={{ fontSize: "0.9rem" }}
                      >
                        {rfq.quantity} units
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        p: 1.5,
                        backgroundColor: "rgba(255, 107, 53, 0.05)",
                        borderRadius: 1.5,
                        border: "1px solid rgba(255, 107, 53, 0.1)",
                      }}
                    >
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 0.5,
                          fontSize: "0.7rem",
                          fontWeight: 500,
                          textTransform: "uppercase",
                        }}
                      >
                        Budget
                      </Typography>
                      <Typography
                        variant="body1"
                        fontWeight={600}
                        color="primary"
                        sx={{ fontSize: "0.9rem" }}
                      >
                        {formatCurrency(rfq.budget)}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        p: 1.5,
                        backgroundColor: "rgba(255, 107, 53, 0.05)",
                        borderRadius: 1.5,
                        border: "1px solid rgba(255, 107, 53, 0.1)",
                      }}
                    >
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 0.5,
                          fontSize: "0.7rem",
                          fontWeight: 500,
                          textTransform: "uppercase",
                        }}
                      >
                        Expected Delivery
                      </Typography>
                      <Typography
                        variant="body1"
                        fontWeight={600}
                        color="primary"
                        sx={{ fontSize: "0.9rem" }}
                      >
                        {formatDate(rfq.expectedDeliveryDate)}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Description */}
                  <Box
                    sx={{
                      p: 2,
                      backgroundColor: "rgba(0,0,0,0.02)",
                      borderRadius: 1.5,
                      border: "1px solid rgba(0,0,0,0.08)",
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 1,
                        fontSize: "0.7rem",
                        fontWeight: 500,
                        textTransform: "uppercase",
                      }}
                    >
                      Description
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        lineHeight: 1.5,
                        color: "#333",
                        fontSize: "0.85rem",
                        fontWeight: 400,
                      }}
                    >
                      {rfq.description}
                    </Typography>
                  </Box>
                </Box>

                {/* Action Button */}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    variant="contained"
                    startIcon={<Visibility />}
                    onClick={() => handleViewDetails(rfq)}
                    sx={{
                      background:
                        "linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%)",
                      color: "white",
                      borderRadius: 1.5,
                      px: 3,
                      py: 1,
                      fontWeight: 500,
                      textTransform: "none",
                      fontSize: "0.8rem",
                      "&:hover": {
                        background:
                          "linear-gradient(135deg, #e55a2b 0%, #ff6b35 100%)",
                        transform: "translateY(-1px)",
                        boxShadow: "0 6px 16px rgba(255, 107, 53, 0.25)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    View Details
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      <RFQDetailModal
        open={modalOpen}
        onClose={handleCloseModal}
        rfq={selectedRFQ}
      />
    </Box>
  );
};

export default RFQListing;
