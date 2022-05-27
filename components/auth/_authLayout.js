import Layout from "../_layout";
import useAuth from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../../store/toasterSlice";
import { useRouter } from "next/router";
import { setToaster } from "../../store/toasterSlice";
import { useEffect } from "react";

export default function AuthLayout({ children }) {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.toaster.open);
  const auth = useAuth();
  const isUserLoggedIn = auth?.isUserLogged;
  const router = useRouter();
  const pathName = router.pathname;

  useEffect(() => {
    if (isUserLoggedIn === false) {
      dispatch(setOpen(true));
      dispatch(
        setToaster({
          message: "Your Not Logged In",
          severity: "error",
          navigateTo: `/auth/login?redirect=${pathName}`,
        })
      );
    }
  }, [isUserLoggedIn, auth]);

  return <Layout>{children}</Layout>;
}
