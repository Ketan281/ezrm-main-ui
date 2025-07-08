"use client"
import type React from "react"
import { AppBar, Toolbar, Typography, Box, IconButton, useMediaQuery, useTheme } from "@mui/material"
import {
  Search as SearchIcon,
  FavoriteBorder as HeartIcon,
  ShoppingCartOutlined as CartIcon,
} from "@mui/icons-material"
import Link from "next/link"
import { useRouter } from "next/navigation"

const Navbar: React.FC = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const router = useRouter()

  const handleSignInClick = () => {
    router.push("/sign_in")
  }
  const handleFavouriteClick = () =>{
    router.push("/favourite")
  }
  const handleCartClick = () =>{
    router.push("/cart")
  }
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        // background: "transparent",
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
        <Box
          component="img"
          src="/ezrm-logo.png"
          alt="EZRM - Raw Materials Simplified"
          sx={{
            height: { xs: 32, md: 40 },
            width: "auto",
            filter: "brightness(0) invert(1)", // Makes the logo white
          }}
        />
        <Box display={"flex"} alignItems={"center"} gap={4}>
          {/* Navigation Links - Hidden on mobile */}
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 3 }}>
              {["About", "Product", "Tools", "Certifications"].map((item) => (
                <Link key={item} href={`/${item.toLowerCase()}`} passHref>
                  <Typography
                    component="a"
                    fontSize={"14px"}
                    sx={{
                      color: "white",
                      textDecoration: "none",
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
            {/* Custom Banner-Style SIGN IN Button */}
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
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
