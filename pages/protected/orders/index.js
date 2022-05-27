import React from "react";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import AuthLayout from "../../../components/auth/_authLayout";
import _ordersTable from "../../../components/orders/_ordersTable";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

function Orders() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <_ordersTable />
        </Paper>
      </Grid>
    </Grid>
  );
}

Orders.layout = AuthLayout;
export default Orders;
