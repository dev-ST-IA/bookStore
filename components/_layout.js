import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from '@mui/material/Container';
import CssBaseline from "@mui/material/CssBaseline";
import Footer from "./_footer";

export default function Layout({children}) {
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {children}
        <Footer/>
      </Container>
    </ThemeProvider>
  );
}
