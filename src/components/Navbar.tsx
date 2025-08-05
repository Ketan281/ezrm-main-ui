"use client"

import type React from "react"
import { useState } from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
  Avatar,
  Divider,
} from "@mui/material"
import {
  Search as SearchIcon,
  FavoriteBorder as HeartIcon,
  ShoppingCartOutlined as CartIcon,
  Person as PersonIcon,
  // ShoppingBag as OrdersIcon,
  ExitToApp as LogoutIcon,
  KeyboardArrowDown as ArrowDownIcon,
} from "@mui/icons-material"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAppStore } from "@/store/use-app-store"
import { useCustomerLogout } from "@/api/handlers"

const Navbar: React.FC = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const router = useRouter()
  const { customer, isAuthenticated } = useAppStore()
  const logoutMutation = useCustomerLogout()

  const [profileMenuAnchor, setProfileMenuAnchor] = useState<null | HTMLElement>(null)
  const isProfileMenuOpen = Boolean(profileMenuAnchor)

  const handleSignInClick = () => {
    router.push("/sign_in")
  }

  const handleFavouriteClick = () => {
    router.push("/favourite")
  }

  const handleCartClick = () => {
    router.push("/cart")
  }

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileMenuAnchor(event.currentTarget)
  }

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null)
  }

  const handleProfileClick = () => {
    handleProfileMenuClose()
    router.push("/profile")
  }



  const handleLogout = async () => {
    handleProfileMenuClose()
    try {
      await logoutMutation.mutateAsync()
      router.push("/")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        py: 1,
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          px: { xs: 2, md: 3 },
        }}
      >
        {/* Logo */}
        <Link href="/" passHref>
          <Box
            component="img"
            src="/ezrm-logo.png"
            alt="EZRM - Raw Materials Simplified"
            sx={{
              height: { xs: 32, md: 40 },
              width: "auto",
              filter: "brightness(0) invert(1)", // Makes the logo white
              cursor: "pointer",
            }}
          />
        </Link>

        <Box display={"flex"} alignItems={"center"} gap={4}>
          {/* Navigation Links - Hidden on mobile */}
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 3 }}>
              {["About", "Product", "Tools", "Certifications"].map((item) => (
                <Link key={item} href={`/${item.toLowerCase()}`} passHref>
                  <Typography
                    sx={{
                      color: "white",
                      textDecoration: "none",
                      fontSize: "14px",
                      cursor: "pointer",
                      "&:hover": {
                        opacity: 0.8,
                      },
                    }}
                  >
                    {item}
                  </Typography>
                </Link>
              ))}
            </Box>
          )}

          {/* Right Side Icons */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <IconButton
              sx={{
                bgcolor: "white",
                width: 40,
                height: 40,
                "&:hover": {
                  bgcolor: "#f5f5f5",
                },
              }}
            >
              <SearchIcon sx={{ color: "#666", fontSize: 20 }} />
            </IconButton>

            <IconButton
              onClick={handleFavouriteClick}
              sx={{
                bgcolor: "white",
                width: 40,
                height: 40,
                "&:hover": {
                  bgcolor: "#f5f5f5",
                },
              }}
            >
              <HeartIcon sx={{ color: "#666", fontSize: 20 }} />
            </IconButton>

            <IconButton
              onClick={handleCartClick}
              sx={{
                bgcolor: "white",
                width: 40,
                height: 40,
                "&:hover": {
                  bgcolor: "#f5f5f5",
                },
              }}
            >
              <CartIcon sx={{ color: "#666", fontSize: 20 }} />
            </IconButton>

            {/* Conditional Rendering: Profile Dropdown or Sign In Button */}
            {isAuthenticated && customer ? (
              <>
                {/* Profile Dropdown Button */}
                <Box
                  onClick={handleProfileMenuOpen}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    bgcolor: "white",
                    color: "#ff7849",
                    fontWeight: 600,
                    fontSize: "14px",
                    px: 2,
                    py: 1,
                    ml: 1,
                    cursor: "pointer",
                    borderRadius: "8px",
                    minWidth: "120px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: "#f5f5f5",
                      transform: "scale(1.02)",
                    },
                    "&:active": {
                      transform: "scale(0.98)",
                    },
                  }}
                >
                  <Avatar
                    sx={{
                      width: 24,
                      height: 24,
                      bgcolor: "#ff7849",
                      color: "white",
                      fontSize: "10px",
                      fontWeight: 600,
                    }}
                  >
                    {getInitials(customer.name)}
                  </Avatar>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#ff7849",
                      maxWidth: "80px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {customer.name.split(" ")[0]}
                  </Typography>
                  <ArrowDownIcon
                    sx={{
                      fontSize: 16,
                      color: "#ff7849",
                      transform: isProfileMenuOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                    }}
                  />
                </Box>

                {/* Profile Dropdown Menu */}
                <Menu
                  anchorEl={profileMenuAnchor}
                  open={isProfileMenuOpen}
                  onClose={handleProfileMenuClose}
                  PaperProps={{
                    sx: {
                      mt: 1,
                      minWidth: 200,
                      borderRadius: "12px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                      border: "1px solid #f0f0f0",
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  {/* User Info Header */}
                  <Box sx={{ px: 3, py: 2, borderBottom: "1px solid #f0f0f0" }}>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#333",
                        mb: 0.5,
                      }}
                    >
                      {customer.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "#666",
                      }}
                    >
                      {customer.email}
                    </Typography>
                  </Box>

                  {/* Menu Items */}
                  <MenuItem
                    onClick={handleProfileClick}
                    sx={{
                      px: 3,
                      py: 1.5,
                      "&:hover": {
                        backgroundColor: "#f8f9fa",
                      },
                    }}
                  >
                    <PersonIcon sx={{ fontSize: 18, color: "#666", mr: 2 }} />
                    <Typography sx={{ fontSize: "14px", color: "#333" }}>My Profile</Typography>
                  </MenuItem>



                  <Divider sx={{ my: 1 }} />

                  <MenuItem
                    onClick={handleLogout}
                    disabled={logoutMutation.isPending}
                    sx={{
                      px: 3,
                      py: 1.5,
                      "&:hover": {
                        backgroundColor: "#ffeaea",
                      },
                    }}
                  >
                    <LogoutIcon sx={{ fontSize: 18, color: "#d32f2f", mr: 2 }} />
                    <Typography sx={{ fontSize: "14px", color: "#d32f2f" }}>
                      {logoutMutation.isPending ? "Signing out..." : "Sign Out"}
                    </Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              /* Sign In Button */
              <Box
                onClick={handleSignInClick}
                sx={{
                  position: "relative",
                  bgcolor: "white",
                  color: "#ff7849",
                  fontWeight: 700,
                  fontSize: "14px",
                  px: 3,
                  py: 1.2,
                  ml: 1,
                  cursor: "pointer",
                  clipPath: "polygon(0% 0%, calc(100% - 15px) 0%, 100% 50%, calc(100% - 15px) 100%, 0% 100%, 15px 50%)",
                  minWidth: "90px",
                  textAlign: "center",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: "#f5f5f5",
                    transform: "scale(1.02)",
                  },
                  "&:active": {
                    transform: "scale(0.98)",
                  },
                }}
              >
                SIGN IN
              </Box>
            )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
