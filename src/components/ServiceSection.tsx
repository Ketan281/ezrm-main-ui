import type React from "react"
import { Box, Typography, Container } from "@mui/material"

interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        py: 1,
        px: 1,
        transition: "all 0.3s ease",
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(-4px)",
        },
      }}
    >
      {/* Icon */}
      <Box sx={{ mb: 2 }}>{icon}</Box>

      {/* Title */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          color: "#1e293b",
          mb: 1.5,
          fontSize: "1.1rem",
          lineHeight: 1.3,
        }}
      >
        {title}
      </Typography>

      {/* Description */}
      <Typography
        variant="body2"
        sx={{
          color: "#64748b",
          fontSize: "0.875rem",
          lineHeight: 1.5,
          textAlign: "center",
          maxWidth: "250px",
        }}
      >
        {description}
      </Typography>
    </Box>
  )
}

// Exact replica icons based on the image
const TransparentPricingIcon = () => (
  <Box
    sx={{
      width: 60,
      height: 60,
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {/* Light blue background shape */}
    <Box
      sx={{
        width: 45,
        height: 35,
        bgcolor: "#7dd3fc",
        borderRadius: "8px",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    />
    {/* Orange rectangle overlay */}
    <Box
      sx={{
        position: "absolute",
        width: 20,
        height: 20,
        bgcolor: "#ff6b35",
        borderRadius: "4px",
        right: 8,
        bottom: 8,
      }}
    />
  </Box>
)

const DigitalDocumentationIcon = () => (
  <Box
    sx={{
      width: 60,
      height: 60,
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {/* Orange document background */}
    <Box
      sx={{
        width: 40,
        height: 50,
        bgcolor: "#ff6b35",
        borderRadius: "6px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 0.4,
      }}
    >
      {/* Document lines */}
      <Box sx={{ width: 24, height: 2.5, bgcolor: "white", borderRadius: 1 }} />
      <Box sx={{ width: 24, height: 2.5, bgcolor: "white", borderRadius: 1 }} />
      <Box sx={{ width: 24, height: 2.5, bgcolor: "white", borderRadius: 1 }} />
      <Box sx={{ width: 18, height: 2.5, bgcolor: "white", borderRadius: 1 }} />
    </Box>
    {/* Small document overlay */}
    <Box
      sx={{
        position: "absolute",
        width: 24,
        height: 30,
        bgcolor: "#7dd3fc",
        borderRadius: "4px",
        right: 4,
        top: 4,
      }}
    />
  </Box>
)

const LogisticsIcon = () => (
  <Box
    sx={{
      width: 60,
      height: 60,
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {/* Blue curved line */}
    <Box
      sx={{
        width: 45,
        height: 25,
        border: "4px solid #7dd3fc",
        borderRadius: "25px",
        borderBottom: "none",
        position: "relative",
      }}
    />
    {/* Orange circle at end */}
    <Box
      sx={{
        position: "absolute",
        width: 14,
        height: 14,
        bgcolor: "#ff6b35",
        borderRadius: "50%",
        right: 10,
        bottom: 18,
      }}
    />
    {/* Small dots along the path */}
    <Box
      sx={{
        position: "absolute",
        width: 8,
        height: 8,
        bgcolor: "#fbbf24",
        borderRadius: "50%",
        left: 18,
        bottom: 22,
      }}
    />
    <Box
      sx={{
        position: "absolute",
        width: 8,
        height: 8,
        bgcolor: "#10b981",
        borderRadius: "50%",
        left: 30,
        bottom: 24,
      }}
    />
  </Box>
)

const RealTimeTrackingIcon = () => (
  <Box
    sx={{
      width: 60,
      height: 60,
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {/* Light blue background */}
    <Box
      sx={{
        width: 40,
        height: 35,
        bgcolor: "#7dd3fc",
        borderRadius: "8px",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    />
    {/* Orange overlay element */}
    <Box
      sx={{
        position: "absolute",
        width: 22,
        height: 22,
        bgcolor: "#ff6b35",
        borderRadius: "4px",
        right: 6,
        bottom: 6,
      }}
    />
    {/* Small tracking dots */}
    <Box
      sx={{
        position: "absolute",
        width: 5,
        height: 5,
        bgcolor: "#fbbf24",
        borderRadius: "50%",
        top: 10,
        right: 15,
      }}
    />
  </Box>
)

const QualityIcon = () => (
  <Box
    sx={{
      width: 60,
      height: 60,
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {/* Yellow/orange background */}
    <Box
      sx={{
        width: 40,
        height: 35,
        bgcolor: "#fbbf24",
        borderRadius: "8px",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    />
    {/* Orange overlay */}
    <Box
      sx={{
        position: "absolute",
        width: 20,
        height: 20,
        bgcolor: "#ff6b35",
        borderRadius: "4px",
        right: 8,
        bottom: 8,
      }}
    />
  </Box>
)

const ZeroWaitingIcon = () => (
  <Box
    sx={{
      width: 60,
      height: 60,
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {/* Clock circle */}
    <Box
      sx={{
        width: 45,
        height: 45,
        border: "4px solid #7dd3fc",
        borderRadius: "50%",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    />
    {/* Clock hands */}
    <Box
      sx={{
        position: "absolute",
        width: 3,
        height: 14,
        bgcolor: "#ff6b35",
        borderRadius: 1.5,
        transformOrigin: "bottom",
        transform: "rotate(90deg)",
      }}
    />
    <Box
      sx={{
        position: "absolute",
        width: 3,
        height: 10,
        bgcolor: "#ff6b35",
        borderRadius: 1.5,
        transformOrigin: "bottom",
        transform: "rotate(0deg)",
      }}
    />
  </Box>
)

const NoIntermediaryIcon = () => (
  <Box
    sx={{
      width: 60,
      height: 60,
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {/* Blue background */}
    <Box
      sx={{
        width: 40,
        height: 35,
        bgcolor: "#7dd3fc",
        borderRadius: "8px",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    />
    {/* Orange overlay with prohibition sign */}
    <Box
      sx={{
        position: "absolute",
        width: 22,
        height: 22,
        bgcolor: "#ff6b35",
        borderRadius: "4px",
        right: 6,
        bottom: 6,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Prohibition line */}
      <Box
        sx={{
          width: 14,
          height: 3,
          bgcolor: "white",
          borderRadius: 1.5,
          transform: "rotate(45deg)",
        }}
      />
    </Box>
  </Box>
)

const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: <TransparentPricingIcon />,
      title: "Transparent Pricing",
      description: "Opportunity to compare price points for the products you buy",
    },
    {
      icon: <DigitalDocumentationIcon />,
      title: "Digital Documentation",
      description: "Easy access to your purchase history, quantities and other information",
    },
    {
      icon: <LogisticsIcon />,
      title: "End to End Logistics",
      description: "Streamlined supply chain operations for continued business",
    },
    {
      icon: <RealTimeTrackingIcon />,
      title: "Real time tracking & analysis",
      description: "Keep an eye on your orders every step of the way",
    },
    {
      icon: <QualityIcon />,
      title: "High Quality Raw Material",
      description: "We know you value quality - we do too",
    },
    {
      icon: <ZeroWaitingIcon />,
      title: "Zero Waiting time",
      description: "A range of products, readily available for you",
    },
    {
      icon: <NoIntermediaryIcon />,
      title: "No intermediary",
      description: "Access a direct trade exchange for greater convenience",
    },
  ]

  return (
    <Box
      sx={{
        bgcolor: "#f1f5f9",
        py: { xs: 6, md: 8 },
        position: "relative",
      }}
    >
      {/* Decorative Plus Signs */}
      <Typography
        sx={{
          position: "absolute",
          top: "20%",
          right: "8%",
          color: "#ff6b35",
          fontSize: "1.5rem",
          fontWeight: "300",
        }}
      >
        +
      </Typography>
      <Typography
        sx={{
          position: "absolute",
          top: "30%",
          right: "12%",
          color: "#ff6b35",
          fontSize: "1.2rem",
          fontWeight: "300",
        }}
      >
        +
      </Typography>

      <Container maxWidth="lg">
        {/* Section Title */}
        <Box
          sx={{
            textAlign: "center",
            mb: 6,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 600,
              color: "#1e293b",
              fontSize: { xs: "1.8rem", md: "2.2rem" },
              position: "relative",
              display: "inline-block",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: -6,
                left: "50%",
                transform: "translateX(-50%)",
                width: 50,
                height: 2,
                bgcolor: "#ff6b35",
                borderRadius: 1,
              },
            }}
          >
            We Offer Best Services
          </Typography>
        </Box>

        {/* Services Grid - First Row (4 items) */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 4,
            mb: 4,
            mt:8
          }}
        >
          {services.slice(0, 4).map((service, index) => (
            <Box
              key={index}
              sx={{
                flex: { xs: "1 1 100%", sm: "1 1 45%", lg: "1 1 22%" },
                minWidth: "250px",
                maxWidth: "300px",
              }}
            >
              <ServiceCard icon={service.icon} title={service.title} description={service.description} />
            </Box>
          ))}
        </Box>

        {/* Services Grid - Second Row (3 items) */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 4,
            mt:10
          }}
        >
          {services.slice(4, 7).map((service, index) => (
            <Box
              key={index + 4}
              sx={{
                flex: { xs: "1 1 100%", sm: "1 1 45%", lg: "1 1 30%" },
                minWidth: "250px",
                maxWidth: "300px",
              }}
            >
              <ServiceCard icon={service.icon} title={service.title} description={service.description} />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  )
}

export default ServicesSection