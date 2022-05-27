import React from "react";
import { useGetUserQuery } from "../../services/bookStoreApi";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
export default function _paymentDetails({ paymentDetails = null }) {
  const { data: userData, ...userArgs } = useGetUserQuery();
  const actualData = paymentDetails ? paymentDetails : userData;
  return (
    <Grid container>
      <React.Fragment key={actualData?.id}>
        <Grid item xs={6}>
          <Typography gutterBottom>Name</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography
            gutterBottom
          >{`${actualData?.firstName} ${actualData?.lastName}`}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography gutterBottom>Mobile Number</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography gutterBottom>{`${actualData?.phoneNumber}`}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography gutterBottom>Email Address</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography gutterBottom>{`${actualData?.emailAddress}`}</Typography>
        </Grid>
      </React.Fragment>
    </Grid>
  );
}
