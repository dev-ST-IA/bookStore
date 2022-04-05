import React from "react";
import Typography from '@mui/material/Typography';
import Link from "next/link";

export default function Footer(props) {
  function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link href={"https://mui.com/"}>
        {/* <Link color="inherit" href="https://mui.com/"> */}
          <a>
              Your Website
              </a>
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }
  return <Copyright sx={{ mt: 8, mb: 4 }} />;
}
