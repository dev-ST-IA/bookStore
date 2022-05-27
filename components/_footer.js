import React from "react";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Copyright from "./_copyright";
import { Box } from "@mui/system";
import { Container } from "@mui/material";

export default function Footer(props) {
  return (
    <Box
      component="footer"
      sx={{
        mb: 0,
        padding: "1rem",
      }}
    >
      <Container sx={{}}>
        <Typography variant="body1" textAlign={"center"}>
          E-Book Pvt (Ltd) Book Store
        </Typography>
        <Copyright />
      </Container>
    </Box>
  );
}
