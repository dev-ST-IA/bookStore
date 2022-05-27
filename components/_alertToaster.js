import { useSelector, useDispatch } from "react-redux";
import { setOpen } from "../store/toasterSlice";
import { Alert } from "@mui/material";
import { Snackbar } from "@mui/material";
import { useRouter } from "next/router";

export default function ToasterAlert() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { message, severity, navigateTo, open, duration } = useSelector(
    (state) => state.toaster
  );

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setOpen(false));
    if (navigateTo) {
      router.replace(navigateTo);
    }
  };

  return (
    <Snackbar open={open} autoHideDuration={duration} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
