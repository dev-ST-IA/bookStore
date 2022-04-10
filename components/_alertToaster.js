import { useSelector, useDispatch } from "react-redux";
import { setOpen } from "../store/toasterSlice";
import { Alert } from "@mui/material";
import { Snackbar } from "@mui/material";
import { useRouter } from "next/router";

export default function ToasterAlert({
  message = "Something Went Wrong",
  severity = "error",
  navigateTo = null,
  isOpen = false,
  duration = 3000,
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const open = useSelector((state) => state.toaster.open);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setOpen(false));
    if (navigateTo) {
      router.push(navigateTo);
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
