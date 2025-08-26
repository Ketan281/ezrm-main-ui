import React from "react";
import {
  Box,
  Typography,
  Avatar,
} from "@mui/material";
import {
  Person,
  ShoppingBag,
  Lock,
  Settings,
  Work,
  LocationOn,
} from "@mui/icons-material";

interface ProfileSidebarProps {
  customer: any;
  currentPage: string;
  onPageChange: (page: string) => void;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  customer,
  currentPage,
  onPageChange,
}) => {
  const menuItems = [
    {
      id: "profile",
      label: "My Accounts",
      icon: Person,
      handler: () => onPageChange("profile"),
    },
    {
      id: "addresses",
      label: "Address Management",
      icon: LocationOn,
      handler: () => onPageChange("addresses"),
    },
    {
      id: "orders",
      label: "My Orders",
      icon: ShoppingBag,
      handler: () => onPageChange("orders"),
    },
    {
      id: "rfqs",
      label: "My RFQs",
      icon: Work,
      handler: () => onPageChange("rfqs"),
    },
    {
      id: "change-password",
      label: "Change Password",
      icon: Lock,
      handler: () => onPageChange("change-password"),
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      handler: () => onPageChange("settings"),
    },
  ];

  return (
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
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <Box
              key={item.id}
              onClick={item.handler}
              sx={{
                backgroundColor: isActive ? "#ff6b35" : "transparent",
                color: isActive ? "white" : "#666",
                display: "flex",
                alignItems: "center",
                gap: 2,
                px: 3,
                py: 2.5,
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: isActive ? "#ff6b35" : "#f8f9fa",
                },
                ...(isActive && {
                  borderRight: "3px solid #ff6b35",
                }),
              }}
            >
              <IconComponent sx={{ fontSize: 20 }} />
              <Typography
                sx={{
                  fontSize: "15px",
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                {item.label}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default ProfileSidebar;
