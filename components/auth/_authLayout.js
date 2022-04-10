import Layout from "../_layout";
import { useAuth } from "../../hooks/useAuth";
import ToasterAlert from "../_alertToaster";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../../store/toasterSlice";

export default function AuthLayout({ children }) {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.toaster.open);
  const auth = useAuth();
  const isUserLoggedIn = auth?.isUserLoggedIn;

  if (isUserLoggedIn) {
    return <Layout>{children}</Layout>;
  } else {
    dispatch(setOpen(true));
    return (
      <ToasterAlert
        isOpen={open}
        severity="error"
        message="Your Not Logged In"
        navigateTo="/auth/login"
      />
    );
  }
}
