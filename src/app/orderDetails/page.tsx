"use client"

import React from "react"
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Paper,
  Divider,
  Avatar,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAppStore } from "@/store/use-app-store"
import { LocalShipping, Receipt } from '@mui/icons-material'

// Custom Status Dot Component
const StatusDot = styled(Box)<{ isActive?: boolean; isCompleted?: boolean }>(
  ({ isActive, isCompleted }) => ({
    width: 12,
    height: 12,
    borderRadius: '50%',
    backgroundColor: isActive ? '#f5a623' : isCompleted ? '#f5a623' : '#e0e0e0',
    border: isActive ? '2px solid #fff' : 'none',
    boxShadow: isActive ? '0 0 0 2px #f5a623' : 'none',
  })
)

interface OrdersDetailProps {
  orderId?: string
}

const OrdersDetail: React.FC<OrdersDetailProps> = () => {
  const router = useRouter()
  const { isAuthenticated, customer } = useAppStore()

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated || !customer) {
      router.push("/sign_in")
    }
  }, [isAuthenticated, customer, router])

  // Show loading or redirect if not authenticated
  if (!isAuthenticated || !customer) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Typography>Redirecting to login...</Typography>
      </Box>
    )
  }

  // Dummy data based on the image
  const orderData = {
    uniqueId: "2346854",
    createdAt: "2023-01-16",
    estimatedDelivery: "2023-05-20",
    orderStatus: "shipped", // confirmed, shipped, out_for_delivery, delivered
    paymentMethod: "Visa ****1234",
    paymentStatus: "completed",
    shippingAddress: {
      street: "847 Jewess Bridge Apt. 174",
      city: "London",
      state: "UK",
      country: "UK",
      zipCode: "474 239-3298"
    },
    items: [
      {
        _id: "1",
        product: { name: "T-Shirt (Grey)" },
        price: 1234.89,
        quantity: 1,
        total: 1234.89
      },
      {
        _id: "2", 
        product: { name: "JEANS" },
        price: 1234.89,
        quantity: 1,
        total: 1234.89
      }
    ],
    subTotal: 2104,
    discount: 100.40,
    shippingCost: 0.00,
    tax: 23.00,
    totalAmount: 0.00
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2)}`
  }

  const getOrderStatusProgress = (status: string) => {
    const statusMap = {
      'confirmed': 0,
      'shipped': 1,
      'out_for_delivery': 2,
      'delivered': 3
    }
    return statusMap[status as keyof typeof statusMap] || 0
  }

  const getPaymentMethodDisplay = (method: string) => {
    return method
  }

  return (
    <Box sx={{ backgroundColor: "#f8f9fa", minHeight: "100vh", py: 3 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            color: "#333",
            mb: 3,
            fontSize: "24px",
          }}
        >
          Track The Order
        </Typography>

        {/* Order Info Header */}
        <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid>
              <Box>
                <Typography
                  variant="subtitle1"
                  fontWeight="700"
                  color="#1a365d"
                >
                  Order ID: {orderData.uniqueId}
                </Typography>
                <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                  <Typography variant="body2" color="rgba(102, 112, 133, 1)">
                    Order date:
                  </Typography>
                  <Typography variant="body2" fontWeight="500">
                    {formatDate(orderData.createdAt)} |
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <LocalShipping
                      sx={{ color: '#4caf50', fontSize: 18, mr: 1 }}
                    />
                    <Typography
                      variant="body2"
                      color="#4caf50"
                      fontWeight="500"
                    >
                      Estimated delivery: {formatDate(orderData.estimatedDelivery)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                startIcon={<Receipt />}
                sx={{
                  borderColor: '#e0e0e0',
                  color: '#424242',
                  textTransform: 'none',
                  fontWeight: 600,
                  m:1,
                  p:1,
                  width:"10vw",
                  '&:hover': { borderColor: '#bdbdbd' },
                   borderRadius:"8px"
                }}
              >
                Invoice
              </Button>
              <Button
                variant="contained"
                sx={{
                  bgcolor: '#f5a623',
                  color: 'white',
                  textTransform: 'none',
                  fontWeight: 600,
                  p:1,
                  m:1,
                  width:"10vw",
                  '&:hover': { bgcolor: '#e69c1f' },
                  borderRadius:"8px"
                }}
              >
                Need Help?
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Order Status Progress */}
        <Paper
          elevation={0}
          sx={{ p: 3, mb: 3, borderRadius: 2, bgcolor: 'transparent' }}
        >
          <Box sx={{ position: 'relative', width: '100%', mb: 4, px: 0 }}>
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                width: '100%',
              }}
            >
              {/* Single continuous background line */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '6px',
                  left: 'calc(12.5% + 6px)',
                  right: 'calc(12.5% + 6px)',
                  height: '2px',
                  backgroundColor: '#e0e0e0',
                  zIndex: 1,
                }}
              />

              {/* Active progress overlay */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '6px',
                  left: 'calc(12.5% + 6px)',
                  width: `calc(75% * ${Math.max(0, getOrderStatusProgress(orderData.orderStatus)) / 3})`,
                  height: '2px',
                  backgroundColor: '#f5a623',
                  zIndex: 1,
                  transition: 'width 0.3s ease',
                }}
              />

              {/* Status circles */}
              {['confirmed', 'shipped', 'out_for_delivery', 'delivered'].map((status, index) => {
                const currentStatusIndex = getOrderStatusProgress(orderData.orderStatus);
                const isActive = index === currentStatusIndex;
                const isCompleted = index < currentStatusIndex;

                return (
                  <Box
                    key={status}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      position: 'relative',
                      zIndex: 2,
                      width: '25%',
                    }}
                  >
                    <StatusDot isActive={isActive} isCompleted={isCompleted} />
                    <Typography
                      variant="caption"
                      sx={{
                        mt: 1,
                        textAlign: 'center',
                        fontWeight: 500,
                        color: isActive ? '#f5a623' : isCompleted ? '#667085' : '#bdbdbd',
                        fontSize: '12px',
                      }}
                    >
                      {status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'rgba(102, 112, 133, 1)',
                        textAlign: 'center',
                        fontSize: '11px',
                      }}
                    >
                      {formatDate(orderData.createdAt)}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Paper>

        {/* Map Section */}
        <Paper elevation={0} sx={{ mb: 3, overflow: "hidden", borderRadius: 2 }}>
          <Box
            sx={{
              height: { xs: "250px", md: "400px" },
              width: "100%",
              position: "relative",
              backgroundColor: "#f0f0f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jgRDxXgrFm7DtpnIH9GSfGZFZ9v8jP.png"
              alt="Delivery Map"
              fill
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </Box>
        </Paper>

        {/* Items Ordered Section */}
        <Typography
          variant="h6"
          fontWeight="700"
          color="#1a365d"
          sx={{ mb: 2 }}
        >
          Items Ordered
        </Typography>

        <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          {orderData.items.map((item, index) => (
            <React.Fragment key={item._id}>
              <Grid container spacing={22} alignItems="center">
                <Grid display="flex" alignItems="center" gap={23}>
                  <Avatar
                    variant="rounded"
                    sx={{ width: 50, height: 50, bgcolor: '#f0f0f0' }}
                  >
                    {item.product?.name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2" fontWeight="700">
                      {item.product?.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="rgba(102, 112, 133, 1)"
                    >
                      Unit Price: {formatCurrency(item.price)}
                    </Typography>
                  </Box>
                </Grid>
                <Grid >
                  <Typography variant="body2" color="rgba(102, 112, 133, 1)">
                    Qty: {item.quantity}
                  </Typography>
                </Grid>
                <Grid>
                  <Typography variant="subtitle2" fontWeight="700">
                    {formatCurrency(item.total)}
                  </Typography>
                </Grid>
              </Grid>
              {index < orderData.items.length - 1 && <Divider sx={{ my: 2 }} />}
            </React.Fragment>
          ))}

          {/* Bottom Section - Payment, Delivery, Order Summary */}
          <Grid container spacing={30} sx={{ mt: 3 }}>
            {/* Payment */}
            <Grid>
              <Box>
                <Typography
                  variant="h6"
                  fontWeight="700"
                  color="#1a365d"
                  sx={{ mb: 2 }}
                >
                  Payment
                </Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography variant="body2" color="rgba(102, 112, 133, 1)">
                    {getPaymentMethodDisplay(orderData.paymentMethod)}
                  </Typography>
                  <Typography
                    variant="body2"
                    color={orderData.paymentStatus === 'completed' ? '#4caf50' : '#f5a623'}
                    fontWeight="500"
                  >
                    ({orderData.paymentStatus.toUpperCase()})
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* Delivery */}
            <Grid>
              <Box>
                <Typography
                  variant="h6"
                  fontWeight="700"
                  color="#1a365d"
                  sx={{ mb: 2 }}
                >
                  Delivery
                </Typography>
                <Typography variant="body2" color="rgba(102, 112, 133, 1)">
                  Address
                </Typography>
                <Typography variant="body2" color="rgba(102, 112, 133, 1)">
                  {orderData.shippingAddress.street}
                </Typography>
                <Typography variant="body2" color="rgba(102, 112, 133, 1)">
                  {orderData.shippingAddress.city}, {orderData.shippingAddress.state}
                </Typography>
                <Typography variant="body2" color="rgba(102, 112, 133, 1)">
                  {orderData.shippingAddress.country} - {orderData.shippingAddress.zipCode}
                </Typography>
              </Box>
            </Grid>

            {/* Order Summary */}
            <Grid>
              <Typography
                variant="h6"
                fontWeight="700"
                color="#1a365d"
                sx={{ mb: 2 }}
              >
                Order Summary
              </Typography>
              <Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap:13,
                    mb: 2,
                  }}
                >
                  <Typography variant="body2" color="rgba(102, 112, 133, 1)">
                    Subtotal
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight="500"
                    color="rgba(102, 112, 133, 1)"
                  >
                    {formatCurrency(orderData.subTotal)}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 2,
                  }}
                >
                  <Typography variant="body2" color="rgba(102, 112, 133, 1)">
                    Discount
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight="500"
                    color="#4caf50"
                  >
                    - {formatCurrency(orderData.discount)}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 2,
                  }}
                >
                  <Typography variant="body2" color="rgba(102, 112, 133, 1)">
                    Shipping
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight="500"
                    color="rgba(102, 112, 133, 1)"
                  >
                    {formatCurrency(orderData.shippingCost)}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 2,
                  }}
                >
                  <Typography variant="body2" color="rgba(102, 112, 133, 1)">
                    Tax
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight="500"
                    color="rgba(102, 112, 133, 1)"
                  >
                    + {formatCurrency(orderData.tax)}
                  </Typography>
                </Box>

                <Divider sx={{ my: 1.5 }} />

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 2,
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    fontWeight="700"
                    color="rgba(102, 112, 133, 1)"
                  >
                    Total
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    fontWeight="700"
                    color="rgba(102, 112, 133, 1)"
                  >
                    {formatCurrency(orderData.totalAmount)}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  )
}

export default OrdersDetail
