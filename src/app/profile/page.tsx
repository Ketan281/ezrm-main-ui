"use client"

import type React from "react"
import { useState } from "react"
import {
    Box,
    Typography,
    Avatar,
    IconButton,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    TextField,
    InputAdornment,
    Link,
} from "@mui/material"
import { Person, ShoppingBag, Lock, Settings, Edit, EditOutlined } from "@mui/icons-material"
import Image from "next/image"
import OrdersPage from "../my_orders/page"
import ProtectedRoute from "@/components/ProtectedRoute"
import { useAppStore } from "@/store/use-app-store"
const PixelPerfectClone: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<"profile" | "orders">("profile")
    const { customer } = useAppStore()
    const handleMyOrdersClick = () => {
        setCurrentPage("orders")
    }

    const handleBackToProfile = () => {
        setCurrentPage("profile")
    }

    if (currentPage === "orders") {
        return <OrdersPage onBack={handleBackToProfile} />
    }

    return (
        <ProtectedRoute>
            <Box
                sx={{
                    display: "flex",
                    minHeight: "100vh",
                    backgroundColor: "#f8f9fa",
                    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                }}
            >
                {/* Left Sidebar */}
                <Box
                    sx={{
                        width: { xs: "100%", md: "280px" },
                        backgroundColor: "white",
                        borderRight: "1px solid #e0e0e0",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    {/* Profile Header */}
                    <Box
                        sx={{
                            p: 3,
                            borderBottom: "1px solid #f0f0f0",
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                fontSize: "16px",
                                fontWeight: 600,
                                color: "#333",
                                mb: 0.5,
                            }}
                        >
                            Profile
                        </Typography>
                    </Box>

                    {/* User Info */}
                    <Box
                        sx={{
                            p: 3,
                            borderBottom: "1px solid #f0f0f0",
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                        }}
                    >
                        <Avatar
                            sx={{
                                width: 48,
                                height: 48,
                                backgroundColor: "#d0d0d0",
                            }}
                        />
                        <Box>
                            <Typography
                                sx={{
                                    fontSize: "14px",
                                    color: "#666",
                                    mb: 0.5,
                                }}
                            >
                                Hello
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "16px",
                                    fontWeight: 600,
                                    color: "#333",
                                    mb: 0.5,
                                }}
                            >
                                {customer?.name}
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "14px",
                                    color: "#666",
                                }}
                            >
                                Personal Information
                            </Typography>
                        </Box>
                    </Box>

                    {/* Navigation Menu */}
                    <Box sx={{ flex: 1 }}>
                        {/* My Accounts - Active */}
                        <Box
                            sx={{
                                backgroundColor: "#ff6b35",
                                color: "white",
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                px: 3,
                                py: 2.5,
                                cursor: "pointer",
                            }}
                        >
                            <Person sx={{ fontSize: 20 }} />
                            <Typography
                                sx={{
                                    fontSize: "15px",
                                    fontWeight: 500,
                                }}
                            >
                                My Accounts
                            </Typography>
                        </Box>

                        {/* My Orders */}
                        <Box
                            onClick={handleMyOrdersClick}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                px: 3,
                                py: 2.5,
                                cursor: "pointer",
                                "&:hover": {
                                    backgroundColor: "#f8f9fa",
                                },
                            }}
                        >
                            <ShoppingBag sx={{ fontSize: 20, color: "#666" }} />
                            <Typography
                                sx={{
                                    fontSize: "15px",
                                    fontWeight: 400,
                                    color: "#666",
                                }}
                            >
                                My Orders
                            </Typography>
                        </Box>

                        {/* Change Password */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                px: 3,
                                py: 2.5,
                                cursor: "pointer",
                                "&:hover": {
                                    backgroundColor: "#f8f9fa",
                                },
                            }}
                        >
                            <Lock sx={{ fontSize: 20, color: "#666" }} />
                            <Typography
                                sx={{
                                    fontSize: "15px",
                                    fontWeight: 400,
                                    color: "#666",
                                }}
                            >
                                Change Password
                            </Typography>
                        </Box>

                        {/* Settings */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                px: 3,
                                py: 2.5,
                                cursor: "pointer",
                                "&:hover": {
                                    backgroundColor: "#f8f9fa",
                                },
                            }}
                        >
                            <Settings sx={{ fontSize: 20, color: "#666" }} />
                            <Typography
                                sx={{
                                    fontSize: "15px",
                                    fontWeight: 400,
                                    color: "#666",
                                }}
                            >
                                Settings
                            </Typography>
                        </Box>

                        {/* Settings (Second instance) */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                px: 3,
                                py: 2.5,
                                cursor: "pointer",
                                "&:hover": {
                                    backgroundColor: "#f8f9fa",
                                },
                            }}
                        >
                            <Settings sx={{ fontSize: 20, color: "#666" }} />
                            <Typography
                                sx={{
                                    fontSize: "15px",
                                    fontWeight: 400,
                                    color: "#666",
                                }}
                            >
                                Settings
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                {/* Main Content Area */}
                <Box
                    sx={{
                        flex: 1,
                        backgroundColor: "white",
                        p: { xs: 2, md: 4 },
                    }}
                >
                    {/* Profile Photo Section */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            mb: 4,
                        }}
                    >
                        <Box
                            sx={{
                                position: "relative",
                                display: "inline-block",
                            }}
                        >
                            <Avatar
                                sx={{
                                    width: 80,
                                    height: 80,
                                    backgroundColor: "#f0f0f0",
                                }}
                            >
                                <Image
                                    src="/placeholder.svg?height=80&width=80"
                                    alt="Profile"
                                    width={80}
                                    height={80}
                                    style={{
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                    }}
                                />
                            </Avatar>
                            <IconButton
                                sx={{
                                    position: "absolute",
                                    bottom: -2,
                                    right: -2,
                                    backgroundColor: "white",
                                    border: "2px solid #e0e0e0",
                                    width: 28,
                                    height: 28,
                                    "&:hover": {
                                        backgroundColor: "#f8f9fa",
                                    },
                                }}
                            >
                                <EditOutlined sx={{ fontSize: 14, color: "#666" }} />
                            </IconButton>
                        </Box>

                        <Link
                            href="#"
                            sx={{
                                color: "#1976d2",
                                textDecoration: "none",
                                fontSize: "14px",
                                fontWeight: 500,
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                "&:hover": {
                                    textDecoration: "underline",
                                },
                            }}
                        >
                            <Edit sx={{ fontSize: 16 }} />
                            Change profile information
                        </Link>
                    </Box>

                    {/* Form Fields */}
                    <Box sx={{ maxWidth: 500 }}>
                        {/* Name Field */}
                        <Box sx={{ mb: 3 }}>
                            <Typography
                                sx={{
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    color: "#333",
                                    mb: 1,
                                }}
                            >
                                Name
                            </Typography>
                            <TextField
                                fullWidth
                                value={customer?.name || ""}
                                variant="outlined"
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        backgroundColor: "#f8f9fa",
                                        fontSize: "14px",
                                        "& fieldset": {
                                            borderColor: "#e0e0e0",
                                        },
                                        "&:hover fieldset": {
                                            borderColor: "#c0c0c0",
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: "#1976d2",
                                        },
                                    },
                                    "& .MuiInputBase-input": {
                                        padding: "12px 14px",
                                        color: "#666",
                                    },
                                }}
                            />
                        </Box>

                        {/* Gender Field */}
                        <Box sx={{ mb: 3 }}>
                            <Typography
                                sx={{
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    color: "#333",
                                    mb: 1,
                                }}
                            >
                                Gender
                            </Typography>
                            <FormControl>
                                <RadioGroup
                                    row
                                    value="male"
                                    sx={{
                                        gap: 3,
                                    }}
                                >
                                    <FormControlLabel
                                        value="male"
                                        control={
                                            <Radio
                                                sx={{
                                                    color: "#1976d2",
                                                    "&.Mui-checked": {
                                                        color: "#1976d2",
                                                    },
                                                }}
                                            />
                                        }
                                        label={<Typography sx={{ fontSize: "14px", color: "#333" }}>Male</Typography>}
                                    />
                                    <FormControlLabel
                                        value="female"
                                        control={
                                            <Radio
                                                sx={{
                                                    color: "#c0c0c0",
                                                    "&.Mui-checked": {
                                                        color: "#1976d2",
                                                    },
                                                }}
                                            />
                                        }
                                        label={<Typography sx={{ fontSize: "14px", color: "#333" }}>Female</Typography>}
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Box>

                        {/* Phone Number Field */}
                        <Box sx={{ mb: 3 }}>
                            <Typography
                                sx={{
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    color: "#333",
                                    mb: 1,
                                }}
                            >
                                Phone number
                            </Typography>
                            <TextField
                                fullWidth
                                value={customer?.phone || ""}
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Box
                                                sx={{
                                                    width: 20,
                                                    height: 14,
                                                    backgroundColor: "#ff9933",
                                                    position: "relative",
                                                    mr: 1,
                                                }}
                                            >
                                                {/* Indian Flag Placeholder */}
                                                <Box
                                                    sx={{
                                                        width: "100%",
                                                        height: "33.33%",
                                                        backgroundColor: "#ff9933",
                                                    }}
                                                />
                                                <Box
                                                    sx={{
                                                        width: "100%",
                                                        height: "33.33%",
                                                        backgroundColor: "white",
                                                    }}
                                                />
                                                <Box
                                                    sx={{
                                                        width: "100%",
                                                        height: "33.33%",
                                                        backgroundColor: "#138808",
                                                    }}
                                                />
                                            </Box>
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        backgroundColor: "#f8f9fa",
                                        fontSize: "14px",
                                        "& fieldset": {
                                            borderColor: "#e0e0e0",
                                        },
                                        "&:hover fieldset": {
                                            borderColor: "#c0c0c0",
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: "#1976d2",
                                        },
                                    },
                                    "& .MuiInputBase-input": {
                                        padding: "12px 14px",
                                        color: "#666",
                                    },
                                }}
                            />
                        </Box>

                        {/* Email Field */}
                        <Box sx={{ mb: 3 }}>
                            <Typography
                                sx={{
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    color: "#333",
                                    mb: 1,
                                }}
                            >
                                Email
                            </Typography>
                            <TextField
                                fullWidth
                                value={customer?.email || ""}
                                variant="outlined"
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        backgroundColor: "#f8f9fa",
                                        fontSize: "14px",
                                        "& fieldset": {
                                            borderColor: "#e0e0e0",
                                        },
                                        "&:hover fieldset": {
                                            borderColor: "#c0c0c0",
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: "#1976d2",
                                        },
                                    },
                                    "& .MuiInputBase-input": {
                                        padding: "12px 14px",
                                        color: "#666",
                                    },
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </ProtectedRoute>
    )
}

export default PixelPerfectClone
