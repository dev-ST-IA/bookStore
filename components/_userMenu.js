import React from "react";
import { IconButton } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails, setToken } from "../store/authSlice";

export default function UserMenu() {
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = useSelector((state) => state.auth);
  const goToOrders = () => {
    router.push("/protected/orders");
  };

  const logOut = () => {
    dispatch(setUserDetails({}));
    dispatch(setToken());
    router.push("/auth/login");
  };

  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <IconButton {...bindTrigger(popupState)}>
            <MenuIcon />
          </IconButton>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={popupState.close} disabled>
              Profile
            </MenuItem>
            <MenuItem onClick={goToOrders}>Orders</MenuItem>
            <MenuItem onClick={logOut}>Logout</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}
