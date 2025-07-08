"use client"
import type React from "react"
import { useState } from "react"
import {
  Box,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Divider,
  Paper,
  Container,
} from "@mui/material"
import { Close, Add, Remove } from "@mui/icons-material"
import Image from "next/image"

interface CartItem {
  id: number
  name: string
  description: string
  price: number
  quantity: number
  image: string
  inStock: boolean
}

const ShoppingCart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Loreal Ipsum",
      description: "Lorem ipsum dolor ipsum",
      price: 1234.89,
      quantity: 1,
      image: "/product.png?height=60&width=60",
      inStock: true,
    },
    {
      id: 2,
      name: "Loreal Ipsum",
      description: "Lorem ipsum dolor ipsum",
      price: 1234.89,
      quantity: 1,
      image: "/product.png?height=60&width=60",
      inStock: true,
    },
  ])

  const [discount, setDiscount] = useState("")

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const total = subtotal // Add discount logic here if needed

  const handleClose = () => {
    console.log("Close cart")
  }

  const handleCheckout = () => {
    console.log("Proceed to checkout")
  }

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          backgroundColor: "white",
          borderRadius: 2,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: "#333",
              fontSize: "1.25rem",
            }}
          >
            Shopping Cart
          </Typography>
        </Box>

        <Box
          sx={{
            // display: "flex",
            // gap: 4,
            flexDirection: { xs: "column", lg: "row" },
            // width:100
          }}
        >
          {/* Main Cart Content */}
          <Box sx={{ flex: 1 }}>
            {/* Cart Items Table */}
            <TableContainer
              sx={{
                backgroundColor: "white",
                borderRadius: 1,
                mb: 3,
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        color: "#333",
                        fontSize: "0.875rem",
                        py: 2,
                        borderBottom: "1px solid rgba(234, 104, 36, 1)",
                      }}
                    >
                      Item
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: 600,
                        color: "#333",
                        fontSize: "0.875rem",
                        py: 2,
                        borderBottom: "1px solid rgba(234, 104, 36, 1)",
                      }}
                    >
                      Price
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: 600,
                        color: "#333",
                        fontSize: "0.875rem",
                        py: 2,
                        borderBottom: "1px solid rgba(234, 104, 36, 1)",
                      }}
                    >
                      Quantity
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        fontWeight: 600,
                        color: "#333",
                        fontSize: "0.875rem",
                        py: 2,
                        borderBottom: "1px solid rgba(234, 104, 36, 1)",
                      }}
                    >
                      Subtotal
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item.id} sx={{
                      background: "#fafafa"
                    }}
                    >
                      <TableCell sx={{ py: 2, borderBottom: "1px solid #f0f0f0" }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                          <Box
                            sx={{
                              width: 60,
                              height: 60,
                              borderRadius: 1,
                              overflow: "hidden",
                              flexShrink: 0,
                            }}
                          >
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              width={60}
                              height={60}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </Box>
                          <Box>
                            <Typography
                              variant="body1"
                              sx={{
                                fontWeight: 600,
                                color: "#333",
                                fontSize: "0.875rem",
                                mb: 0.5,
                              }}
                            >
                              {item.name}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                color: "#666",
                                fontSize: "0.75rem",
                              }}
                            >
                              {item.description}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align="center" sx={{ py: 2, borderBottom: "1px solid #f0f0f0" }}>
                        <Typography
                          sx={{
                            fontWeight: 600,
                            color: "#333",
                            fontSize: "0.875rem",
                          }}
                        >
                          ${item.price.toFixed(2)}
                        </Typography>
                      </TableCell>
                      <TableCell align="center" sx={{ py: 2, borderBottom: "1px solid #f0f0f0" }}>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
                          <IconButton
                            size="small"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            sx={{
                              width: 24,
                              height: 24,
                              border: "1px solid #ddd",
                              borderRadius: "50%",
                              "&:hover": {
                                backgroundColor: "#f5f5f5",
                              },
                            }}
                          >
                            <Remove sx={{ fontSize: 14 }} />
                          </IconButton>
                          <Box sx={{ mx: 1, textAlign: "center", minWidth: 40 }}>
                            <Typography
                              sx={{
                                fontWeight: 600,
                                color: "#333",
                                fontSize: "0.875rem",
                              }}
                            >
                              {item.quantity}
                            </Typography>
                            <Typography
                              sx={{
                                color: "#4caf50",
                                fontSize: "0.625rem",
                                fontWeight: 500,
                                textTransform: "uppercase",
                                letterSpacing: "0.5px",
                              }}
                            >
                              IN STOCK
                            </Typography>
                          </Box>
                          <IconButton
                            size="small"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            sx={{
                              width: 24,
                              height: 24,
                              border: "1px solid #ddd",
                              borderRadius: "50%",
                              "&:hover": {
                                backgroundColor: "#f5f5f5",
                              },
                            }}
                          >
                            <Add sx={{ fontSize: 14 }} />
                          </IconButton>
                        </Box>
                      </TableCell>
                      <TableCell align="right" sx={{ py: 2, borderBottom: "1px solid #f0f0f0" }}>
                        <Typography
                          sx={{
                            fontWeight: 600,
                            color: "#333",
                            fontSize: "0.875rem",
                          }}
                        >
                          ${(item.price * item.quantity).toFixed(2)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>



          </Box>
          <Box display={"flex"} justifyContent={"space-between"} sx={{
            background:"#fafafa"
          }}>

          
          {/* Shipping Address */}
          <Box
            sx={{
              // backgroundColor: "white",
              borderRadius: 1,
              p: 5,
              // boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <Typography
              sx={{
                color: "#ff6b35",
                fontWeight: 600,
                fontSize: "0.95rem",
                mb: 2,
              }}
            >
              Shipping Address
            </Typography>
            <Box sx={{ color: "#666", fontSize: "0.875rem", lineHeight: 1.6 }}>
              <Typography sx={{ fontSize: "0.75rem", mb: 0.5 }}>Loreal Gummersbach Jaunstrasse</Typography>
              <Typography sx={{ fontSize: "0.75rem", mb: 0.5 }}>Gummersbach Jaunstrasse</Typography>
              <Typography sx={{ fontSize: "0.75rem", mb: 0.5 }}>Gummersbach Jaunstrasse Gummersbach</Typography>
              <Typography sx={{ fontSize: "0.75rem", mb: 0.5 }}>Postcode: 234534-007</Typography>
              <Typography sx={{ fontSize: "0.75rem" }}>Number: 234-234-2344</Typography>
            </Box>
          </Box>
          {/* Order Summary */}
          <Box
            sx={{
              width: { xs: "100%", lg: "400px" },
              flexShrink: 0,
            }}
          >
            <Box
              sx={{
                // backgroundColor: "white",
                borderRadius: 1,
                p: 3,
                // boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              {/* Subtotal */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography
                  sx={{
                    color: "#333",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                  }}
                >
                  Subtotal
                </Typography>
                <Typography
                  sx={{
                    color: "#333",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                  }}
                >
                  ${subtotal.toFixed(2)}
                </Typography>
              </Box>

              {/* Discount */}
              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  placeholder="Discount"
                  variant="outlined"
                  size="small"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      fontSize: "0.875rem",
                      backgroundColor: "#fafafa",
                      "& fieldset": {
                        borderColor: "transparent",
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
                  }}
                />
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Total */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Typography
                  sx={{
                    color: "#333",
                    fontSize: "1rem",
                    fontWeight: 600,
                  }}
                >
                  Total
                </Typography>
                <Typography
                  sx={{
                    color: "#333",
                    fontSize: "1rem",
                    fontWeight: 600,
                  }}
                >
                  ${total.toFixed(2)}
                </Typography>
              </Box>

              {/* Checkout Button */}
              <Button
                fullWidth
                variant="contained"
                onClick={handleCheckout}
                sx={{
                  backgroundColor: "#ff6b35",
                  color: "white",
                  py: 1.5,
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  textTransform: "none",
                  borderRadius: 1,
                  "&:hover": {
                    backgroundColor: "#e55a2b",
                  },
                }}
              >
                Checkout
              </Button>
            </Box>
          </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  )
}

export default ShoppingCart
