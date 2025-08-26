import React from "react";
import {
  Dialog,
  Box,
  Typography,
  IconButton,
  Button,
  Paper,
} from "@mui/material";
import { Close, CheckCircle, ContentCopy } from "@mui/icons-material";

interface RFQSuccessModalProps {
  open: boolean;
  onClose: () => void;
  responseData: {
    uniqueId: string;
    customerName: string;
    customerEmail: string;
    productName: string;
    quantity: number;
    status: string;
    urgency: string;
    createdAt: string;
  };
}

const RFQSuccessModal: React.FC<RFQSuccessModalProps> = ({
  open,
  onClose,
  responseData,
}) => {
  const handleCopyId = () => {
    navigator.clipboard.writeText(responseData.uniqueId);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        },
      }}
    >
      {/* Success Header */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #28a745 0%, #20c997 100%)",
          color: "white",
          p: 3,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background Pattern */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "150px",
            height: "150px",
            background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
            borderRadius: "50%",
            transform: "translate(30px, -30px)",
          }}
        />
        
        <Box sx={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(10px)",
              }}
            >
              <CheckCircle sx={{ fontSize: 40, color: "white" }} />
            </Box>
          </Box>
          
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "20px", md: "24px" },
              textShadow: "0 2px 4px rgba(0,0,0,0.1)",
              mb: 1,
            }}
          >
            RFQ Submitted Successfully!
          </Typography>
          
          <Typography
            variant="body1"
            sx={{
              opacity: 0.9,
              fontSize: "14px",
              fontWeight: 400,
            }}
          >
            Your request has been received and is being processed
          </Typography>
        </Box>
      </Box>

      {/* Success Content */}
      <Box sx={{ p: 4, background: "linear-gradient(180deg, #fafafa 0%, #ffffff 100%)" }}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: "16px",
            background: "white",
            border: "1px solid #e9ecef",
            mb: 3,
          }}
        >
          {/* RFQ ID Section */}
          <Box sx={{ mb: 3 }}>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#666",
                mb: 1,
              }}
            >
              RFQ Reference ID
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                p: 2,
                background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                borderRadius: "12px",
                border: "1px solid #dee2e6",
              }}
            >
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#28a745",
                  fontFamily: "monospace",
                }}
              >
                {responseData.uniqueId}
              </Typography>
              <IconButton
                onClick={handleCopyId}
                size="small"
                sx={{
                  color: "#6c757d",
                  "&:hover": {
                    backgroundColor: "rgba(40, 167, 69, 0.1)",
                    color: "#28a745",
                  },
                }}
              >
                <ContentCopy sx={{ fontSize: 18 }} />
              </IconButton>
            </Box>
          </Box>

          {/* Details Grid */}
          <Box sx={{ display: "grid", gap: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography sx={{ fontSize: "14px", color: "#666", fontWeight: 500 }}>
                Customer Name:
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#333", fontWeight: 600 }}>
                {responseData.customerName}
              </Typography>
            </Box>
            
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography sx={{ fontSize: "14px", color: "#666", fontWeight: 500 }}>
                Email:
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#333", fontWeight: 600 }}>
                {responseData.customerEmail}
              </Typography>
            </Box>
            
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography sx={{ fontSize: "14px", color: "#666", fontWeight: 500 }}>
                Product:
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#333", fontWeight: 600 }}>
                {responseData.productName}
              </Typography>
            </Box>
            
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography sx={{ fontSize: "14px", color: "#666", fontWeight: 500 }}>
                Quantity:
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#333", fontWeight: 600 }}>
                {responseData.quantity}
              </Typography>
            </Box>
            
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography sx={{ fontSize: "14px", color: "#666", fontWeight: 500 }}>
                Status:
              </Typography>
              <Box
                sx={{
                  px: 2,
                  py: 0.5,
                  borderRadius: "20px",
                  background: "#fff3cd",
                  border: "1px solid #ffeaa7",
                }}
              >
                <Typography sx={{ fontSize: "12px", color: "#856404", fontWeight: 600, textTransform: "uppercase" }}>
                  {responseData.status}
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography sx={{ fontSize: "14px", color: "#666", fontWeight: 500 }}>
                Urgency:
              </Typography>
              <Box
                sx={{
                  px: 2,
                  py: 0.5,
                  borderRadius: "20px",
                  background: responseData.urgency === "high" ? "#f8d7da" : 
                             responseData.urgency === "medium" ? "#fff3cd" : "#d1ecf1",
                  border: responseData.urgency === "high" ? "1px solid #f5c6cb" :
                         responseData.urgency === "medium" ? "1px solid #ffeaa7" : "1px solid #bee5eb",
                }}
              >
                <Typography 
                  sx={{ 
                    fontSize: "12px", 
                    color: responseData.urgency === "high" ? "#721c24" :
                           responseData.urgency === "medium" ? "#856404" : "#0c5460",
                    fontWeight: 600, 
                    textTransform: "uppercase" 
                  }}
                >
                  {responseData.urgency}
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography sx={{ fontSize: "14px", color: "#666", fontWeight: 500 }}>
                Submitted:
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#333", fontWeight: 600 }}>
                {formatDate(responseData.createdAt)}
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* Next Steps */}
        <Box sx={{ mb: 3 }}>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 600,
              color: "#333",
              mb: 2,
            }}
          >
            What happens next?
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: "#28a745",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                1
              </Box>
              <Typography sx={{ fontSize: "14px", color: "#666" }}>
                Our team will review your request within 24 hours
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: "#28a745",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                2
              </Box>
              <Typography sx={{ fontSize: "14px", color: "#666" }}>
                You'll receive a detailed quote via email
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: "#28a745",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                3
              </Box>
              <Typography sx={{ fontSize: "14px", color: "#666" }}>
                Schedule a call to discuss your requirements
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              borderColor: "#28a745",
              color: "#28a745",
              fontWeight: 600,
              borderRadius: "25px",
              px: 3,
              py: 1.5,
              "&:hover": {
                borderColor: "#218838",
                backgroundColor: "rgba(40, 167, 69, 0.1)",
              },
            }}
          >
            Close
          </Button>
          <Button
            variant="contained"
            onClick={onClose}
            sx={{
              background: "linear-gradient(135deg, #28a745 0%, #20c997 100%)",
              color: "white",
              fontWeight: 600,
              borderRadius: "25px",
              px: 3,
              py: 1.5,
              "&:hover": {
                background: "linear-gradient(135deg, #218838 0%, #1ea085 100%)",
              },
            }}
          >
            Track RFQ
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default RFQSuccessModal;
