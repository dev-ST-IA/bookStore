import { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import AppBarSearch from "./_appbarSearch";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { IconButton } from "@mui/material";
import { Badge } from "@mui/material";
import UserMenu from "./_userMenu";
import { useSelector } from "react-redux";
import { useAuth } from "../hooks/useAuth";

export default function NavBar() {
  const auth = useAuth();
  const isUserLoggedIn = auth?.isUserLogged;
  const products = useSelector((state) => state.cart.products);
  const noOfProducts = products.length;

  return (
    <AppBar
      position="static"
      color="default"
      sx={{
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        bgcolor: (theme) => theme.palette.grey.A100,
        minWidth: 1,
      }}
    >
      <Toolbar sx={{ gap: 1 }}>
        <Link href="/">
          <Button variant="text" color="inherit">
            <Typography variant="h6" color="inherit" noWrap>
              E-Book
            </Typography>
          </Button>
        </Link>
        <AppBarSearch sx={{ flexGrow: 1, width: "50%" }} />
        <Link
          variant="button"
          color="text.primary"
          href="/cart"
          sx={{ my: 1, mx: 1.5 }}
        >
          <IconButton>
            <Badge badgeContent={noOfProducts} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Link>
        {!isUserLoggedIn && (
          <Button
            href="/auth/login"
            variant="contained"
            color="success"
            sx={{ my: 1, mx: 1.5 }}
          >
            Login
          </Button>
        )}
        {isUserLoggedIn && <UserMenu />}
      </Toolbar>
    </AppBar>
  );
}
