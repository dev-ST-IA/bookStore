import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import { registerSchema } from "../../schemas/registerSchema";
import { useRegisterMutation } from "../../services/bookStoreApi";
import { useSelector, useDispatch } from "react-redux";
import { setToken, setUserDetails } from "../../store/authSlice";
import { setToaster } from "../../store/toasterSlice";
import { useRouter } from "next/dist/client/router";
import { setOpen } from "../../store/toasterSlice";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

export default function SignUp() {
  const dispatch = useDispatch();
  const router = useRouter();
  const isOpen = useSelector((state) => state.toaster.open);
  const [register, { data, isError, isSuccess, error, isLoading }] =
    useRegisterMutation();
  const auth = useAuth();
  const isUserLogged = auth?.isUserLogged;
  const redirectQuery = router.query?.redirect;
  const formik = useFormik({
    initialValues: {
      emailAddress: "",
      userName: "",
      password: "",
      cPassword: "",
      phoneNumber: "",
      firstName: "",
      lastName: "",
    },
    validationSchema: registerSchema,
    onSubmit: () => {},
    validateOnChange: true,
    isInitialValid: true,
  });
  const handleSubmit = async (event, val) => {
    event.preventDefault();
    try {
      const payload = await register(formik.values).unwrap();
      if (payload.token) {
        dispatch(setToken(payload.token));
        dispatch(setUserDetails(payload));
        dispatch(
          setToaster({
            message: `Registration Success`,
            severity: "success",
            navigateTo: null,
          })
        );
        dispatch(setOpen(true));

        if (redirectQuery) {
          router.push(`${redirectQuery}`);
        } else {
          router.push("/");
        }
      } else {
      }
    } catch (err) {
      dispatch(
        setToaster({
          message: `Registration Failed \n Error: ${error?.data?.title}`,
          severity: "error",
          navigateTo: null,
        })
      );
      dispatch(setOpen(true));
    }
  };

  if (isUserLogged) {
    router.back();
    dispatch(setOpen(true));
    dispatch(
      setToaster({
        message: `Your Logged In`,
        severity: "warning",
        navigateTo: null,
      })
    );
    return null;
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        px: 10,
        py: 5,
        margin: "2rem auto",
        border: "1px solid black",
      }}
      maxWidth="sm"
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={formik.values.emailAddress}
              onChange={formik.handleChange}
              error={
                formik.touched.emailAddress &&
                Boolean(formik.errors.emailAddress)
              }
              helperText={
                formik.touched.emailAddress && formik.errors.emailAddress
              }
              required
              fullWidth
              id="email"
              label="Email Address"
              name="emailAddress"
              autoComplete="email"
              type="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={formik.values.userName}
              onChange={formik.handleChange}
              error={formik.touched.userName && Boolean(formik.errors.userName)}
              helperText={formik.touched.userName && formik.errors.userName}
              required
              fullWidth
              id="userName"
              label="Username"
              name="userName"
              autoComplete="username"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              error={
                formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
              }
              helperText={
                formik.touched.phoneNumber && formik.errors.phoneNumber
              }
              required
              fullWidth
              id="phoneNumber"
              label="Mobile Number"
              name="phoneNumber"
              autoComplete="phoneNumber"
              type="tel"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={formik.values.cPassword}
              onChange={formik.handleChange}
              error={
                formik.touched.cPassword && Boolean(formik.errors.cPassword)
              }
              helperText={formik.touched.cPassword && formik.errors.cPassword}
              required
              fullWidth
              name="cPassword"
              label="Confirm Password"
              type="password"
              id="password"
              autoComplete="new-password"
            />
          </Grid>
          {/* <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive inspiration, marketing promotions and updates via email."
            />
          </Grid> */}
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
        <Grid container justifyContent="flex-end" spacing={2}>
          <Grid item>
            <Link
              href={
                redirectQuery
                  ? `/auth/login?redirect=${redirectQuery}`
                  : "/auth/login"
              }
              variant="body2"
            >
              Already have an account? Sign in
            </Link>
          </Grid>
          <Grid item>
            <Link href="/" variant="body2">
              {"Just Shop"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
