"use client"

import type React from "react"
import {
  Dialog,
  DialogContent,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  Typography,
  IconButton,
  Box,
} from "@mui/material"
import { Close } from "@mui/icons-material"

interface QuoteFormModalProps {
  isOpen: boolean
  onClose: () => void
  productName?: string
}

const QuoteFormModal: React.FC<QuoteFormModalProps> = ({ isOpen, onClose, productName }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted")
    onClose()
  }

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth={false}
      PaperProps={{
        sx: {
          width: "600px",
          maxWidth: "90vw",
          borderRadius: "12px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
        },
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        {/* Header */}
        <Box sx={{ p: 3, pb: 2, position: "relative" }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "#333",
              fontSize: "18px",
              mb: 0,
            }}
          >
            Tell Us Your Requirement
          </Typography>
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 16,
              top: 16,
              color: "#999",
              "&:hover": {
                bgcolor: "#f5f5f5",
              },
            }}
          >
            <Close sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>

        {/* Form */}
        <Box component="form" onSubmit={handleSubmit} sx={{ px: 3, pb: 3 }}>
          {/* Enter Product - Full Width */}
          <Box sx={{ mb: 2.5 }}>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#333",
                mb: 1,
                fontWeight: 500,
              }}
            >
              <span style={{ color: "#ff4444" }}>*</span> Enter Product
            </Typography>
            <TextField
              fullWidth
              required
              defaultValue={productName || "Organic Mucuna pruriens Powder"}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: "45px",
                  fontSize: "14px",
                  borderRadius: "6px",
                  "& fieldset": {
                    borderColor: "#e0e0e0",
                  },
                  "&:hover fieldset": {
                    borderColor: "#ccc",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#4CAF50",
                    borderWidth: "1px",
                  },
                },
                "& .MuiInputBase-input": {
                  padding: "12px 14px",
                },
              }}
            />
          </Box>

          {/* Pack Quantity and Company Website - Side by Side */}
          <Box sx={{ display: "flex", gap: 2, mb: 2.5 }}>
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#333",
                  mb: 1,
                  fontWeight: 500,
                }}
              >
                <span style={{ color: "#ff4444" }}>*</span> Pack Quantity
              </Typography>
              <TextField
                fullWidth
                required
                type="number"
                defaultValue="1"
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "45px",
                    fontSize: "14px",
                    borderRadius: "6px",
                    "& fieldset": {
                      borderColor: "#e0e0e0",
                    },
                    "&:hover fieldset": {
                      borderColor: "#ccc",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#4CAF50",
                      borderWidth: "1px",
                    },
                  },
                  "& .MuiInputBase-input": {
                    padding: "12px 14px",
                  },
                }}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#333",
                  mb: 1,
                  fontWeight: 500,
                }}
              >
                Company Website Link
              </Typography>
              <TextField
                fullWidth
                placeholder="Ex. www.example.com"
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "45px",
                    fontSize: "14px",
                    borderRadius: "6px",
                    "& fieldset": {
                      borderColor: "#e0e0e0",
                    },
                    "&:hover fieldset": {
                      borderColor: "#ccc",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#4CAF50",
                      borderWidth: "1px",
                    },
                  },
                  "& .MuiInputBase-input": {
                    padding: "12px 14px",
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "#999",
                    opacity: 1,
                  },
                }}
              />
            </Box>
          </Box>

          {/* Email and Mobile - Side by Side */}
          <Box sx={{ display: "flex", gap: 2, mb: 2.5 }}>
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#333",
                  mb: 1,
                  fontWeight: 500,
                }}
              >
                <span style={{ color: "#ff4444" }}>*</span> Email
              </Typography>
              <TextField
                fullWidth
                required
                type="email"
                placeholder="Ex. user@example.com"
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "45px",
                    fontSize: "14px",
                    borderRadius: "6px",
                    "& fieldset": {
                      borderColor: "#e0e0e0",
                    },
                    "&:hover fieldset": {
                      borderColor: "#ccc",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#4CAF50",
                      borderWidth: "1px",
                    },
                  },
                  "& .MuiInputBase-input": {
                    padding: "12px 14px",
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "#999",
                    opacity: 1,
                  },
                }}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#333",
                  mb: 1,
                  fontWeight: 500,
                }}
              >
                <span style={{ color: "#ff4444" }}>*</span> Mobile
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <FormControl sx={{ minWidth: "80px" }}>
                  <Select
                    defaultValue="+1"
                    variant="outlined"
                    sx={{
                      height: "45px",
                      fontSize: "14px",
                      borderRadius: "6px",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#e0e0e0",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#ccc",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#4CAF50",
                        borderWidth: "1px",
                      },
                      "& .MuiSelect-select": {
                        padding: "12px 14px",
                        display: "flex",
                        alignItems: "center",
                      },
                    }}
                  >
                    <MenuItem value="+1">🇺🇸 +1</MenuItem>
                    <MenuItem value="+44">🇬🇧 +44</MenuItem>
                    <MenuItem value="+91">🇮🇳 +91</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  required
                  placeholder="345446645"
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: "45px",
                      fontSize: "14px",
                      borderRadius: "6px",
                      "& fieldset": {
                        borderColor: "#e0e0e0",
                      },
                      "&:hover fieldset": {
                        borderColor: "#ccc",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#4CAF50",
                        borderWidth: "1px",
                      },
                    },
                    "& .MuiInputBase-input": {
                      padding: "12px 14px",
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: "#999",
                      opacity: 1,
                    },
                  }}
                />
              </Box>
            </Box>
          </Box>

          {/* Department and Company Type - Side by Side */}
          <Box sx={{ display: "flex", gap: 2, mb: 2.5 }}>
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#333",
                  mb: 1,
                  fontWeight: 500,
                }}
              >
                <span style={{ color: "#ff4444" }}>*</span> Department
              </Typography>
              <FormControl fullWidth required>
                <Select
                  displayEmpty
                  variant="outlined"
                  sx={{
                    height: "45px",
                    fontSize: "14px",
                    borderRadius: "6px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#e0e0e0",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#ccc",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#4CAF50",
                      borderWidth: "1px",
                    },
                    "& .MuiSelect-select": {
                      padding: "12px 14px",
                      color: "#999",
                    },
                    "& .MuiSelect-icon": {
                      color: "#999",
                    },
                  }}
                  renderValue={(value) => {
                    if (!value) {
                      return "Please Select a Department"
                    }
                    return value as string
                  }}
                >
                  <MenuItem value="sales">Sales</MenuItem>
                  <MenuItem value="marketing">Marketing</MenuItem>
                  <MenuItem value="procurement">Procurement</MenuItem>
                  <MenuItem value="operations">Operations</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#333",
                  mb: 1,
                  fontWeight: 500,
                }}
              >
                Company Type
              </Typography>
              <FormControl fullWidth>
                <Select
                  displayEmpty
                  variant="outlined"
                  sx={{
                    height: "45px",
                    fontSize: "14px",
                    borderRadius: "6px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#e0e0e0",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#ccc",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#4CAF50",
                      borderWidth: "1px",
                    },
                    "& .MuiSelect-select": {
                      padding: "12px 14px",
                      color: "#999",
                    },
                    "& .MuiSelect-icon": {
                      color: "#999",
                    },
                  }}
                  renderValue={(value) => {
                    if (!value) {
                      return "Please Select a Type"
                    }
                    return value as string
                  }}
                >
                  <MenuItem value="manufacturer">Manufacturer</MenuItem>
                  <MenuItem value="distributor">Distributor</MenuItem>
                  <MenuItem value="retailer">Retailer</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          {/* Monthly Volume and Timeline - Side by Side */}
          <Box sx={{ display: "flex", gap: 2, mb: 2.5 }}>
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#333",
                  mb: 1,
                  fontWeight: 500,
                }}
              >
                <span style={{ color: "#ff4444" }}>*</span> Monthly Volume
              </Typography>
              <FormControl fullWidth required>
                <Select
                  displayEmpty
                  variant="outlined"
                  sx={{
                    height: "45px",
                    fontSize: "14px",
                    borderRadius: "6px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#e0e0e0",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#ccc",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#4CAF50",
                      borderWidth: "1px",
                    },
                    "& .MuiSelect-select": {
                      padding: "12px 14px",
                      color: "#999",
                    },
                    "& .MuiSelect-icon": {
                      color: "#999",
                    },
                  }}
                  renderValue={(value) => {
                    if (!value) {
                      return "Please Select a Volume"
                    }
                    return value as string
                  }}
                >
                  <MenuItem value="1-10">1-10 units</MenuItem>
                  <MenuItem value="11-50">11-50 units</MenuItem>
                  <MenuItem value="51-100">51-100 units</MenuItem>
                  <MenuItem value="100+">100+ units</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#333",
                  mb: 1,
                  fontWeight: 500,
                }}
              >
                <span style={{ color: "#ff4444" }}>*</span> Timeline
              </Typography>
              <FormControl fullWidth required>
                <Select
                  displayEmpty
                  variant="outlined"
                  sx={{
                    height: "45px",
                    fontSize: "14px",
                    borderRadius: "6px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#e0e0e0",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#ccc",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#4CAF50",
                      borderWidth: "1px",
                    },
                    "& .MuiSelect-select": {
                      padding: "12px 14px",
                      color: "#999",
                    },
                    "& .MuiSelect-icon": {
                      color: "#999",
                    },
                  }}
                  renderValue={(value) => {
                    if (!value) {
                      return "Please Select a Timeline"
                    }
                    return value as string
                  }}
                >
                  <MenuItem value="immediate">Immediate</MenuItem>
                  <MenuItem value="1-week">Within 1 week</MenuItem>
                  <MenuItem value="1-month">Within 1 month</MenuItem>
                  <MenuItem value="3-months">Within 3 months</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          {/* Call Availability Section */}
          <Box sx={{ mb: 3 }}>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#333",
                mb: 2,
                fontWeight: 500,
              }}
            >
              Would you be available for a call at your earliest convenience?
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#333",
                    mb: 1,
                    fontWeight: 500,
                  }}
                >
                  Day
                </Typography>
                <FormControl fullWidth>
                  <Select
                    displayEmpty
                    variant="outlined"
                    sx={{
                      height: "45px",
                      fontSize: "14px",
                      borderRadius: "6px",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#e0e0e0",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#ccc",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#4CAF50",
                        borderWidth: "1px",
                      },
                      "& .MuiSelect-select": {
                        padding: "12px 14px",
                        color: "#999",
                      },
                      "& .MuiSelect-icon": {
                        color: "#999",
                      },
                    }}
                    renderValue={(value) => {
                      if (!value) {
                        return "Please Select a Day"
                      }
                      return value as string
                    }}
                  >
                    <MenuItem value="today">Today</MenuItem>
                    <MenuItem value="tomorrow">Tomorrow</MenuItem>
                    <MenuItem value="this-week">This Week</MenuItem>
                    <MenuItem value="next-week">Next Week</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#333",
                    mb: 1,
                    fontWeight: 500,
                  }}
                >
                  Time (Timezone-EST)
                </Typography>
                <FormControl fullWidth>
                  <Select
                    displayEmpty
                    variant="outlined"
                    sx={{
                      height: "45px",
                      fontSize: "14px",
                      borderRadius: "6px",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#e0e0e0",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#ccc",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#4CAF50",
                        borderWidth: "1px",
                      },
                      "& .MuiSelect-select": {
                        padding: "12px 14px",
                        color: "#999",
                      },
                      "& .MuiSelect-icon": {
                        color: "#999",
                      },
                    }}
                    renderValue={(value) => {
                      if (!value) {
                        return "Please Select time"
                      }
                      return value as string
                    }}
                  >
                    <MenuItem value="9-10">9:00 AM - 10:00 AM</MenuItem>
                    <MenuItem value="10-11">10:00 AM - 11:00 AM</MenuItem>
                    <MenuItem value="11-12">11:00 AM - 12:00 PM</MenuItem>
                    <MenuItem value="2-3">2:00 PM - 3:00 PM</MenuItem>
                    <MenuItem value="3-4">3:00 PM - 4:00 PM</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Box>

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              bgcolor: "#F05A25",
              color: "white",
              height: "48px",
              fontSize: "16px",
              fontWeight: 500,
              textTransform: "none",
              borderRadius: "6px",
              boxShadow: "none",
              "&:hover": {
                bgcolor: "#689F38",
                boxShadow: "none",
              },
              "&:active": {
                boxShadow: "none",
              },
            }}
          >
            Place an Enquiry
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default QuoteFormModal
