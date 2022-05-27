import { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import _addressForm from "./_addressForm";
import _paymentForm from "./_paymentForm";
import _review from "./_review";
import { useRouter } from "next/dist/client/router";
import _centeredLoader from "../_centeredLoader";
import {
  useGetCartQuery,
  usePlaceOrderMutation,
} from "../../services/bookStoreApi";
import { setPlace } from "../../store/placeOrderSlice";
import { useDispatch } from "react-redux";
import Link from "next/dist/client/link";

const steps = ["Shipping address", "Payment details", "Review your order"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <_addressForm />;
    case 1:
      return <_paymentForm />;
    case 2:
      return <_review />;
    default:
      throw new Error("Unknown step");
  }
}

export default function _checkOut() {
  const { data: cartProducts, ...cartArgs } = useGetCartQuery();
  const [placeOrder, { data: orderData, ...orderArgs }] =
    usePlaceOrderMutation();
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(2);
  const dispatch = useDispatch();

  const handleNext = () => {
    setActiveStep(3);
  };

  const handleOrder = async () => {
    try {
      const response = await placeOrder().unwrap();
      dispatch(setPlace(true));
      handleNext();
    } catch (error) {
      console.log(error);
    }
  };

  const handleBack = () => {
    router.push("/cart");
    // setActiveStep(activeStep - 1);
  };

  return (
    <Box
      sx={{
        width: 1,
        minHeight: 600,
        margin: "auto",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Paper
        variant="outlined"
        sx={{
          my: { xs: 3, md: 6 },
          p: { xs: 2, md: 3 },
          mx: "auto",
          maxWidth: "sm",
        }}
      >
        <Typography component="h1" variant="h4" align="center">
          Checkout
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <>
          {activeStep === steps.length ? (
            <>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order Id is {orderData?.id}. You Can Check Your Order
                Status By Viewing Your Orders In The{" "}
                <span>
                  <Button
                    variant="text"
                    onClick={() => dispatch(setPlace(false))}
                    href="/protected/orders"
                  >
                    Order Section
                  </Button>
                </span>
                .
              </Typography>
              {/* {activeStep === steps.length - 1 ? "Place order" : "Next"} */}
              <Button
                variant="contained"
                onClick={() => dispatch(setPlace(false))}
                href="/"
              >
                Back To Home
              </Button>
            </>
          ) : (
            <>
              {getStepContent(2)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back To Cart
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={handleOrder}
                  sx={{ mt: 3, ml: 1 }}
                  disabled={cartArgs.error}
                >
                  {/* {activeStep === steps.length - 1 ? "Place order" : "Next"} */}
                  Place Order
                </Button>
              </Box>
            </>
          )}
        </>
      </Paper>
    </Box>
  );
}
