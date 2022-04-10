import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/dist/client/router";
import { useLoginMutation } from "../../services/bookStoreApi";
import { useFormik } from "formik";
import { loginSchema } from "../../schemas/loginSchema";
import { Switch } from "@mui/material";
import ToasterAlert from "../_alertToaster";
import { useSelector, useDispatch } from "react-redux";
import { setOpen } from "../../store/toasterSlice";
import { setToken, setUserDetails } from "../../store/authSlice";

export default function SignIn() {
  const [toaster, setToaster] = useState({ message: "", severity: "" });
  const isOpen = useSelector((state) => state.toaster.open);
  const [checked, setChecked] = useState(true);
  const [login, { data, isError, isSuccess, isLoading, error }] =
    useLoginMutation();
  const router = useRouter();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      userName: "",
      emailAddress: "",
      password: "",
    },
    validationSchema: loginSchema,
  });
  const handleSwitch = (event) => {
    setChecked(event.target.checked);
    formik.setFieldValue("emailAddress", "");
    formik.setFieldValue("userName", "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await login(formik.values).unwrap();
      dispatch(setToken(res.token));
      dispatch(setUserDetails(res));
      setToaster({
        message: `Login Success`,
        severity: "success",
      });
      dispatch(setOpen(true));
      router.push("/");
    } catch (err) {
      setToaster({
        message: `Login Failed \n Error: ${err?.data?.title}`,
        severity: "error",
      });
      dispatch(setOpen(true));
    }
  };

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
        Sign in
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <FormControlLabel
          control={
            <Switch
              checked={checked}
              onChange={handleSwitch}
              inputProps={{ "aria-label": "controlled" }}
            />
          }
          label={checked ? "Email" : "Username"}
        />

        {checked && (
          <TextField
            value={formik.values.emailAddress}
            onChange={formik.handleChange}
            error={
              formik.touched.emailAddress && Boolean(formik.errors.emailAddress)
            }
            helperText={formik.errors.emailAddress}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="emailAddress"
            autoComplete="email"
            autoFocus
            type="email"
          />
        )}
        {!checked && (
          <TextField
            value={formik.values.userName}
            onChange={formik.handleChange}
            error={formik.touched.userName && Boolean(formik.errors.userName)}
            helperText={formik.errors.userName}
            margin="normal"
            required
            fullWidth
            id="userName"
            label="Username"
            name="userName"
            autoComplete="username"
            autoFocus
            type="text"
          />
        )}
        <TextField
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.errors.password}
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="password"
        />
        {/* <FormControlLabel
          control={<Checkbox value="remember" color="success" />}
          label="Remember me"
        /> */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, backgroundColor: "green" }}
        >
          Sign In
        </Button>
        <Grid container spacing={2}>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="/auth/register" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
          <Grid item>
            <Link href="/" variant="body2">
              {"Just Shop"}
            </Link>
          </Grid>
        </Grid>
      </Box>
      <ToasterAlert {...toaster} isOpen={isOpen} />
    </Box>
  );
}
