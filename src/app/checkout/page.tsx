"use client";
import type React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Paper,
  Alert,
  CircularProgress,
} from "@mui/material";
import Image from "next/image";
import { useAppStore } from "@/store/use-app-store";
import { customerAddressHandler } from "@/api/handlers/customerAddressHandler";
import { customerProfileHandler } from "@/api/handlers/customerProfileHandler";
import { stripeHandler } from "@/api/handlers/stripeHandler";
import type { CustomerAddress } from "@/api/services/customerAddress";
import type { CustomerProfile } from "@/api/services/customerProfile";
import type { CreatePaymentIntentRequest } from "@/api/services/stripe";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  cardHolderName: string;
  cardNumber: string;
  cvv: string;
  expirationDate: string;
  addressLine1: string;
  city: string;
  state: string;
  landmark: string;
  postalCode: string;
}

const CheckoutForm: React.FC = () => {
  const { customer } = useAppStore();
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
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [customerProfile, setCustomerProfile] =
    useState<CustomerProfile | null>(null);
  const [defaultAddress, setDefaultAddress] = useState<CustomerAddress | null>(
    null
  );
  const [allAddresses, setAllAddresses] = useState<CustomerAddress[]>([]);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string>("");
  const [paymentSuccess, setPaymentSuccess] = useState<string>("");
  const [stripe, setStripe] = useState<Stripe | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string>("");

  // Fetch customer profile and default address
  useEffect(() => {
    const fetchCustomerData = async () => {
      if (!customer?.id) return;

      setLoading(true);
      setError("");

      try {
        // Fetch customer profile
        const profile = await customerProfileHandler.getProfile(customer.id);
        setCustomerProfile(profile);

        // Fetch customer addresses
        const addresses = await customerAddressHandler.getAddresses(
          customer.id
        );
        setAllAddresses(addresses);
        const defaultAddr = addresses.find((addr) => addr.isDefault);
        setDefaultAddress(defaultAddr || null);

        // Auto-fill form with customer data
        if (profile) {
          const nameParts = profile.name?.split(" ") || [];
          const firstName = nameParts[0] || "";
          const lastName = nameParts.slice(1).join(" ") || "";

          setFormData((prev) => ({
            ...prev,
            firstName,
            lastName,
            email: profile.email || "",
            phoneNumber: profile.phone || "",
            cardHolderName: profile.name || "",
          }));
        }

        // Auto-fill address if default address exists
        if (defaultAddr) {
          setFormData((prev) => ({
            ...prev,
            addressLine1: defaultAddr.street || "",
            city: defaultAddr.city || "",
            state: defaultAddr.state || "",
            postalCode: defaultAddr.zipCode || "",
          }));
        }
      } catch (error) {
        console.error("Error fetching customer data:", error);
        setError(
          "Failed to load customer information. Please fill the form manually."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, [customer?.id]);

  // Initialize Stripe
  useEffect(() => {
    const initializeStripe = async () => {
      const stripeInstance = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
      );
      setStripe(stripeInstance);
    };

    initializeStripe();
  }, []);

  const handleInputChange =
    (field: keyof FormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleCancel = () => {
    console.log("Cancel order");
  };

  const handleCompletePurchase = async () => {
    if (!customer?.id) {
      setPaymentError("Please log in to complete your purchase.");
      return;
    }

    if (!stripe) {
      setPaymentError("Payment system is not ready. Please try again.");
      return;
    }

    // Validate required fields
    const requiredFields = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      addressLine1: formData.addressLine1,
      city: formData.city,
      state: formData.state,
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value?.trim())
      .map(([field]) => field);

    if (missingFields.length > 0) {
      setPaymentError(
        `Please fill in the following required fields: ${missingFields.join(
          ", "
        )}`
      );
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setPaymentError("Please enter a valid email address.");
      return;
    }

    setPaymentProcessing(true);
    setPaymentError("");

    try {
      // Generate a unique order ID
      const orderId = `order_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;
      setOrderId(orderId);

      // For demo purposes, using a fixed amount of 1000 (₹10.00 in paise)
      // In a real app, this would come from the cart total
      const amount = 1000; // Amount in paise (₹10.00)

      const paymentData: CreatePaymentIntentRequest = {
        amount,
        currency: "inr",
        customerId: customer.id,
        orderId,
        description: `Order ${orderId} - ${formData.firstName} ${formData.lastName}`,
        metadata: {
          customerName: `${formData.firstName} ${formData.lastName}`,
          customerEmail: formData.email,
          shippingAddress: `${formData.addressLine1}, ${formData.city}, ${formData.state} ${formData.postalCode}`,
        },
        automatic_payment_methods: { enabled: true },
      };

      // Create payment intent
      const paymentIntent = await stripeHandler.createPaymentIntent(
        paymentData
      );

      console.log("Payment intent created:", paymentIntent);

      // Prepare Stripe Elements by storing clientSecret
      const cs =
        (paymentIntent as any).client_secret ||
        (paymentIntent as any).clientSecret;
      if (!cs) {
        throw new Error("Client secret not received from payment intent");
      }
      setClientSecret(cs);
      setPaymentSuccess(
        "Secure card entry is ready. Complete your payment below."
      );
    } catch (error) {
      console.error("Payment error:", error);
      setPaymentError(
        error instanceof Error
          ? error.message
          : "Payment failed. Please try again."
      );
    } finally {
      setPaymentProcessing(false);
    }
  };

  // Function to handle address selection
  const handleAddressSelect = (address: CustomerAddress) => {
    setFormData((prev) => ({
      ...prev,
      addressLine1: address.street || "",
      city: address.city || "",
      state: address.state || "",
      postalCode: address.zipCode || "",
    }));
  };

  const paymentMethods = [
    { name: "Visa", src: "/visa2.png?height=25&width=44&text=VISA" },
    { name: "Stripe", src: "/stripe.png?height=24&width=40&text=stripe" },
    { name: "PayPal", src: "/pp.png?height=24&width=40&text=PayPal" },
    { name: "Mastercard", src: "/mastercard.png?height=24&width=40&text=MC" },
    { name: "Google Pay", src: "/gpay.png?height=24&width=40&text=GPay" },
  ];

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
  };

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
  };

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

      {/* Loading State */}
      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            py: 4,
          }}
        >
          <CircularProgress sx={{ color: "#ff6b35" }} />
          <Typography sx={{ ml: 2, color: "#666" }}>
            Loading your information...
          </Typography>
        </Box>
      )}

      {/* Error State */}
      {error && (
        <Alert severity="warning" sx={{ mb: 3, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      {/* Auto-fill Success Message */}
      {!loading && customerProfile && (
        <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
          ✓ Your profile information has been auto-filled. You can modify any
          fields as needed.
        </Alert>
      )}

      {/* Payment Error Message */}
      {paymentError && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
          {paymentError}
        </Alert>
      )}

      {/* Payment Success Message */}
      {paymentSuccess && (
        <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
          {paymentSuccess}
        </Alert>
      )}

      {/* Customer Information Summary */}
      {!loading && customerProfile && (
        <Box
          sx={{
            mb: 3,
            p: 3,
            backgroundColor: "#f8f9fa",
            borderRadius: 2,
            border: "1px solid #e0e0e0",
          }}
        >
          <Typography
            sx={{
              color: "#333",
              fontWeight: 600,
              fontSize: "1rem",
              mb: 2,
            }}
          >
            Customer Information
          </Typography>
          <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            <Box>
              <Typography sx={{ fontSize: "0.75rem", color: "#666", mb: 0.5 }}>
                Name
              </Typography>
              <Typography
                sx={{ fontSize: "0.875rem", color: "#333", fontWeight: 500 }}
              >
                {customerProfile.name}
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ fontSize: "0.75rem", color: "#666", mb: 0.5 }}>
                Email
              </Typography>
              <Typography
                sx={{ fontSize: "0.875rem", color: "#333", fontWeight: 500 }}
              >
                {customerProfile.email}
              </Typography>
            </Box>
            {customerProfile.phone && (
              <Box>
                <Typography
                  sx={{ fontSize: "0.75rem", color: "#666", mb: 0.5 }}
                >
                  Phone
                </Typography>
                <Typography
                  sx={{ fontSize: "0.875rem", color: "#333", fontWeight: 500 }}
                >
                  {customerProfile.phone}
                </Typography>
              </Box>
            )}
            {customerProfile.companyName && (
              <Box>
                <Typography
                  sx={{ fontSize: "0.75rem", color: "#666", mb: 0.5 }}
                >
                  Company
                </Typography>
                <Typography
                  sx={{ fontSize: "0.875rem", color: "#333", fontWeight: 500 }}
                >
                  {customerProfile.companyName}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      )}
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
        {/* <Box sx={{ mb: 4 }}>
          <Typography
            sx={{
              color: "#ff6b35",
              fontWeight: 600,
              fontSize: "1rem",
              mb: 3,
            }}
          >
            Payment Details
          </Typography> */}
        {/* Payment Method Icons */}
        {/* <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
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
        </Box> */}

        {/* Address Selection Section */}
        {!loading && allAddresses.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography
              sx={{
                color: "#ff6b35",
                fontWeight: 600,
                fontSize: "1rem",
                mb: 2,
              }}
            >
              Saved Addresses ({allAddresses.length})
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {allAddresses.map((address, index) => (
                <Box
                  key={address._id}
                  sx={{
                    p: 3,
                    border: address.isDefault
                      ? "2px solid #ff6b35"
                      : "1px solid #e0e0e0",
                    borderRadius: 2,
                    backgroundColor: address.isDefault
                      ? "rgba(255, 107, 53, 0.05)"
                      : "white",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: address.isDefault
                        ? "rgba(255, 107, 53, 0.1)"
                        : "#f8f9fa",
                      borderColor: "#ff6b35",
                    },
                    transition: "all 0.2s ease",
                  }}
                  onClick={() => handleAddressSelect(address)}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: address.isDefault ? "#ff6b35" : "#333",
                        textTransform: "uppercase",
                      }}
                    >
                      {address.type} Address {address.isDefault && "(Default)"}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: "0.875rem",
                      color: "#333",
                      lineHeight: 1.5,
                    }}
                  >
                    {address.street}
                    <br />
                    {address.city}, {address.state} {address.zipCode}
                    <br />
                    {address.country}
                  </Typography>
                  <Typography
                    sx={{ fontSize: "0.75rem", color: "#666", mt: 1 }}
                  >
                    Click to use this address
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        )}

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

        {/* Stripe Elements - Render after clientSecret is available */}
        {clientSecret && stripe && (
          <Box sx={{ width: "100%", maxWidth: 600, mb: 3 }}>
            <Elements stripe={stripe} options={{ clientSecret }}>
              <StripePaymentSection
                returnUrl={`${
                  typeof window !== "undefined" ? window.location.origin : ""
                }/payment-success?orderId=${orderId}`}
              />
            </Elements>
          </Box>
        )}

        {/* Action Buttons */}
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Button
            variant="outlined"
            onClick={handleCancel}
            disabled={loading || paymentProcessing}
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
              "&:disabled": {
                borderColor: "#e0e0e0",
                color: "#ccc",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleCompletePurchase}
            disabled={loading || paymentProcessing}
            startIcon={
              loading || paymentProcessing ? (
                <CircularProgress size={20} color="inherit" />
              ) : null
            }
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
              "&:disabled": {
                backgroundColor: "#ccc",
              },
            }}
          >
            {loading
              ? "Loading..."
              : paymentProcessing
              ? "Processing Payment..."
              : "Continue to Payment"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CheckoutForm;

// Internal component to render PaymentElement and confirm payment
const StripePaymentSection: React.FC<{ returnUrl: string }> = ({
  returnUrl,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");

  const handleConfirm = async () => {
    if (!stripe || !elements) return;
    setSubmitting(true);
    setSubmitError("");
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: returnUrl,
      },
    });
    if (error) {
      setSubmitError(error.message || "Payment failed");
    }
    setSubmitting(false);
  };

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: "white",
        borderRadius: 2,
        border: "1px solid #e0e0e0",
      }}
    >
      <Typography sx={{ mb: 2, fontWeight: 600, color: "#333" }}>
        Payment
      </Typography>
      <PaymentElement options={{ layout: "tabs" }} />
      {submitError && (
        <Alert severity="error" sx={{ mt: 2, borderRadius: 2 }}>
          {submitError}
        </Alert>
      )}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button
          onClick={handleConfirm}
          variant="contained"
          disabled={!stripe || !elements || submitting}
          startIcon={
            submitting ? <CircularProgress size={20} color="inherit" /> : null
          }
          sx={{
            backgroundColor: "#ff6b35",
            color: "white",
            textTransform: "none",
            fontWeight: 600,
            "&:hover": { backgroundColor: "#e55a2b" },
          }}
        >
          {submitting ? "Processing..." : "Pay Now"}
        </Button>
      </Box>
    </Box>
  );
};
