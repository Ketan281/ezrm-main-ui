"use client"
import type React from "react"
import { useState } from "react"
import { Box, Typography, TextField, Button, Container, Paper } from "@mui/material"
import Image from "next/image"

interface FormData {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  cardHolderName: string
  cardNumber: string
  cvv: string
  expirationDate: string
  addressLine1: string
  city: string
  state: string
  landmark: string
  postalCode: string
}

const CheckoutForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    cardHolderName: "",
    cardNumber: "",
    cvv: "",
    expirationDate: "",
    addressLine1: "",
    city: "",
    state: "",
    landmark: "",
    postalCode: "",
  })

  const handleInputChange = (field: keyof FormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }))
  }

  const handleCancel = () => {
    console.log("Cancel order")
  }

  const handleCompletePurchase = () => {
    console.log("Complete purchase", formData)
  }

  const paymentMethods = [
    { name: "Visa", src: "/visa2.png?height=25&width=44&text=VISA" },
    { name: "Stripe", src: "/stripe.png?height=24&width=40&text=stripe" },
    { name: "PayPal", src: "/pp.png?height=24&width=40&text=PayPal" },
    { name: "Mastercard", src: "/mastercard.png?height=24&width=40&text=MC" },
    { name: "Google Pay", src: "/gpay.png?height=24&width=40&text=GPay" },
  ]

  // Common TextField styles
  const textFieldStyles = {
    width: "300px", // Fixed width for all input fields
    "& .MuiOutlinedInput-root": {
      backgroundColor: "white",
      fontSize: "0.875rem",
      "& fieldset": {
        borderColor: "#e0e0e0",
      },
      "&:hover fieldset": {
        borderColor: "#ccc",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#ff6b35",
      },
    },
    "& .MuiInputBase-input::placeholder": {
      color: "#999",
      opacity: 1,
    },
  }

  // Address field styles (double width)
  const addressFieldStyles = {
    width: "600px", // Double width for address field
    "& .MuiOutlinedInput-root": {
      backgroundColor: "white",
      fontSize: "0.875rem",
      "& fieldset": {
        borderColor: "#e0e0e0",
      },
      "&:hover fieldset": {
        borderColor: "#ccc",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#ff6b35",
      },
    },
    "& .MuiInputBase-input::placeholder": {
      color: "#999",
      opacity: 1,
    },
  }

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
          color: "#333",
          fontSize: { xs: "1.25rem", md: "1.5rem" },
        }}
      >
        Complete your Order
      </Typography>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, md: 4 },
          backgroundColor: "#fafafa",
          borderRadius: 2,
          maxWidth: "100%",
          mt: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Personal Details Section */}
        <Box sx={{ mb: 4 }}>
          <Typography
            sx={{
              color: "#ff6b35",
              fontWeight: 600,
              fontSize: "1rem",
              mb: 3,
            }}
          >
            Personal Details
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
            <Box>
              <Typography
                sx={{
                  color: "#333",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  mb: 1,
                }}
              >
                First name
              </Typography>
              <TextField
                placeholder="Enter Your First Name"
                variant="outlined"
                size="small"
                value={formData.firstName}
                onChange={handleInputChange("firstName")}
                sx={textFieldStyles}
              />
            </Box>
            <Box>
              <Typography
                sx={{
                  color: "#333",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  mb: 1,
                }}
              >
                Last name
              </Typography>
              <TextField
                placeholder="Enter Your Last Name"
                variant="outlined"
                size="small"
                value={formData.lastName}
                onChange={handleInputChange("lastName")}
                sx={textFieldStyles}
              />
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Box>
              <Typography
                sx={{
                  color: "#333",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  mb: 1,
                }}
              >
                Email
              </Typography>
              <TextField
                placeholder="Enter Your Email"
                variant="outlined"
                size="small"
                type="email"
                value={formData.email}
                onChange={handleInputChange("email")}
                sx={textFieldStyles}
              />
            </Box>
            <Box>
              <Typography
                sx={{
                  color: "#333",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  mb: 1,
                }}
              >
                Phone number
              </Typography>
              <TextField
                placeholder="Enter Your Phone Number"
                variant="outlined"
                size="small"
                value={formData.phoneNumber}
                onChange={handleInputChange("phoneNumber")}
                sx={textFieldStyles}
              />
            </Box>
          </Box>
        </Box>

        {/* Payment Details Section */}
        <Box sx={{ mb: 4 }}>
          <Typography
            sx={{
              color: "#ff6b35",
              fontWeight: 600,
              fontSize: "1rem",
              mb: 3,
            }}
          >
            Payment Details
          </Typography>
          {/* Payment Method Icons */}
          <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
            {paymentMethods.map((method) => (
              <Box
                key={method.name}
                sx={{
                  width: 50,
                  height: 32,
                  border: "1px solid transparent",
                  borderRadius: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                  "&:hover": {
                    borderColor: "#ff6b35",
                  },
                }}
              >
                <Image
                  src={method.src || "/placeholder.svg"}
                  alt={method.name}
                  width={40}
                  height={24}
                  style={{ objectFit: "contain" }}
                />
              </Box>
            ))}
          </Box>
          <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
            <Box>
              <Typography
                sx={{
                  color: "#333",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  mb: 1,
                }}
              >
                Card holder name
              </Typography>
              <TextField
                placeholder="Enter Your Card Holder Name"
                variant="outlined"
                size="small"
                value={formData.cardHolderName}
                onChange={handleInputChange("cardHolderName")}
                sx={textFieldStyles}
              />
            </Box>
            <Box>
              <Typography
                sx={{
                  color: "#333",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  mb: 1,
                }}
              >
                Card number
              </Typography>
              <TextField
                placeholder="Enter Your Card Number"
                variant="outlined"
                size="small"
                value={formData.cardNumber}
                onChange={handleInputChange("cardNumber")}
                sx={textFieldStyles}
              />
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Box>
              <Typography
                sx={{
                  color: "#333",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  mb: 1,
                }}
              >
                CVV
              </Typography>
              <TextField
                placeholder="Enter CVV"
                variant="outlined"
                size="small"
                value={formData.cvv}
                onChange={handleInputChange("cvv")}
                sx={textFieldStyles}
              />
            </Box>
            <Box>
              <Typography
                sx={{
                  color: "#333",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  mb: 1,
                }}
              >
                Expiration date
              </Typography>
              <TextField
                placeholder="MM/YY"
                variant="outlined"
                size="small"
                value={formData.expirationDate}
                onChange={handleInputChange("expirationDate")}
                sx={textFieldStyles}
              />
            </Box>
          </Box>
        </Box>

        {/* Shipping Address Section */}
        <Box sx={{ mb: 4 }}>
          <Typography
            sx={{
              color: "#ff6b35",
              fontWeight: 600,
              fontSize: "1rem",
              mb: 3,
            }}
          >
            Shipping Address
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Typography
              sx={{
                color: "#333",
                fontSize: "0.875rem",
                fontWeight: 500,
                mb: 1,
              }}
            >
              Address line 1
            </Typography>
            <TextField
              placeholder="Your complete Address"
              variant="outlined"
              size="small"
              value={formData.addressLine1}
              onChange={handleInputChange("addressLine1")}
              sx={addressFieldStyles} // Double width for address field
            />
          </Box>
          <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
            <Box>
              <Typography
                sx={{
                  color: "#333",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  mb: 1,
                }}
              >
                City
              </Typography>
              <TextField
                placeholder="Enter Your City"
                variant="outlined"
                size="small"
                value={formData.city}
                onChange={handleInputChange("city")}
                sx={textFieldStyles}
              />
            </Box>
            <Box>
              <Typography
                sx={{
                  color: "#333",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  mb: 1,
                }}
              >
                State
              </Typography>
              <TextField
                placeholder="Enter Your State"
                variant="outlined"
                size="small"
                value={formData.state}
                onChange={handleInputChange("state")}
                sx={textFieldStyles}
              />
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Box>
              <Typography
                sx={{
                  color: "#333",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  mb: 1,
                }}
              >
                Landmark
              </Typography>
              <TextField
                placeholder="Any Landmark (Optional) Near to You"
                variant="outlined"
                size="small"
                value={formData.landmark}
                onChange={handleInputChange("landmark")}
                sx={textFieldStyles}
              />
            </Box>
            <Box>
              <Typography
                sx={{
                  color: "#333",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  mb: 1,
                }}
              >
                Postal code
              </Typography>
              <TextField
                placeholder="ZIP Code (Optional)"
                variant="outlined"
                size="small"
                value={formData.postalCode}
                onChange={handleInputChange("postalCode")}
                sx={textFieldStyles}
              />
            </Box>
          </Box>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Button
            variant="outlined"
            onClick={handleCancel}
            sx={{
              py: 1.5,
              px: 4,
              fontSize: "0.875rem",
              fontWeight: 600,
              textTransform: "none",
              borderColor: "#ddd",
              color: "#666",
              width: "300px",
              "&:hover": {
                borderColor: "#ccc",
                backgroundColor: "#f9f9f9",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleCompletePurchase}
            sx={{
              backgroundColor: "#ff6b35",
              color: "white",
              py: 1.5,
              px: 4,
              fontSize: "0.875rem",
              fontWeight: 600,
              textTransform: "none",
              width: "300px",
              "&:hover": {
                backgroundColor: "#e55a2b",
              },
            }}
          >
            Complete Purchase
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}

export default CheckoutForm
