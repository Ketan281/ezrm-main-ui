import { createTheme } from "@mui/material/styles"

export const theme = createTheme({
  palette: {
    primary: {
      main: "#ff7849",
      light: "#ff6b35",
    },
    secondary: {
      main: "#ffffff",
    },
    background: {
      default: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Poppins", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "8rem",
      fontWeight: 700,
      letterSpacing: "0.1em",
      "@media (max-width:960px)": {
        fontSize: "4rem",
      },
      "@media (max-width:600px)": {
        fontSize: "3rem",
      },
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 300,
      "@media (max-width:600px)": {
        fontSize: "1.25rem",
      },
    },
    body1: {
      fontSize: "1.125rem",
      lineHeight: 1.6,
      "@media (max-width:600px)": {
        fontSize: "1rem",
      },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "25px",
        },
      },
    },
  },
})
