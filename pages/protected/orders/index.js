import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { useDemoData } from "@mui/x-data-grid-generator";
import { TextField } from "@mui/material";
import AuthLayout from "../../../components/auth/_authLayout";

const VISIBLE_FIELDS = ["name", "rating", "country", "dateCreated", "isAdmin"];

function Orders() {
  const { data } = useDemoData({
    dataSet: "Employee",
    visibleFields: VISIBLE_FIELDS,
    rowLength: 100,
  });

  return (
    <React.Fragment>
      <Box sx={{ margin: "1rem auto", width: "90%" }}>
        <TextField
          id="standard-basic"
          label="Search For Orders"
          variant="standard"
          fullWidth
        />
      </Box>
      <Box
        sx={{
          height: 500,
          maxHeight: 500,
          margin: "1rem auto",
          width: "90%",
        }}
      >
        <DataGrid {...data} components={{ Toolbar: GridToolbar }} />
      </Box>
    </React.Fragment>
  );
}

Orders.layout = AuthLayout;
export default Orders;
