import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Footer from "./_footer";
import NavBar from "./_navbar";
import { Box } from "@mui/system";
import MetaHead from "./_head";
import AuthProvider from "./auth/_authProvider";

export default function Layout({ children }) {
  const theme = createTheme();
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <MetaHead />
        <NavBar />
        <Box
          component="main"
          sx={{
            margin: "auto",
            width: 1,
            minHeight: 1,
            bgcolor: (theme) => theme.palette.grey.A100,
          }}
        >
          <CssBaseline />
          <main>
            <Box
              sx={{
                backgroundColor: theme.palette.grey.A200,
                margin: "auto",
                paddingBottom: "1rem",
                width: 1,
                minHeight: 1,
              }}
            >
              {children}
            </Box>
          </main>
        </Box>
        <Footer />
      </ThemeProvider>
    </AuthProvider>
  );
}
