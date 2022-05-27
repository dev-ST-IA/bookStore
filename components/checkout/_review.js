import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useGetCartQuery } from "../../services/bookStoreApi";
import { useSelector } from "react-redux";
import _perItemInReceipt from "./_perItemInReceipt";
import _receipt from "./_receipt";
import _paymentDetails from "./_paymentDetails";

export default function _review() {
  const { data: cartProducts, ...cartArgs } = useGetCartQuery();
  const totalPrice = useSelector((state) => state.cart.total);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <_receipt cartProducts={cartProducts} totalPrice={totalPrice} />
      <Grid container spacing={2}>
        {/* <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>John Smith</Typography>
          <Typography gutterBottom>{addresses.join(", ")}</Typography>
        </Grid> */}
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <_paymentDetails />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
