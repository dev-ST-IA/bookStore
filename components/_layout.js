import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Footer from "./_footer";
import NavBar from "./_navbar";
import { Box } from "@mui/system";
import MetaHead from "./_head";
import AuthProvider from "./auth/_authProvider";
import { useSelector } from "react-redux";
import ToasterAlert from "./_alertToaster";

export default function Layout({ children }) {
  const mode = useSelector((state) => state.themeMode.mode);
  const theme = createTheme({
    palette: {
      mode,
    },
  });
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
          }}
        >
          <CssBaseline />
          <ToasterAlert />
          <main>
            <Box
              sx={{
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
