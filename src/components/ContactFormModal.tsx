import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import ContactForm from "./ContactForm";

interface ContactFormModalProps {
  open: boolean;
  onClose: () => void;
  source?: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

const ContactFormModal: React.FC<ContactFormModalProps> = ({
  open,
  onClose,
  source = "modal",
  onSuccess,
  onError,
}) => {
  const handleSuccess = () => {
    onSuccess?.();
    // Close modal after successful submission
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const handleError = (error: string) => {
    onError?.(error);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "16px",
          backgroundColor: "transparent",
          boxShadow: "none",
        },
      }}
    >
      <DialogContent sx={{ p: 0, backgroundColor: "transparent" }}>
        <Box sx={{ position: "relative" }}>
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              zIndex: 10,
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              color: "#8B3E2F",
              "&:hover": {
                backgroundColor: "white",
              },
            }}
          >
            <Close />
          </IconButton>
          <ContactForm
            source={source}
            onSuccess={handleSuccess}
            onError={handleError}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ContactFormModal;
