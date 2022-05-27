import React from "react";
import { Box } from "@mui/system";
import { TextField, Typography } from "@mui/material";
import { Input } from "@mui/material";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setEditOpen } from "../../store/modelSlice";
import { useState, useEffect } from "react";
import {
  useGetOrderQuery,
  useEditOrderMutation,
} from "../../services/bookStoreApi";
import _receipt from "../checkout/_receipt";
import { setOpen, setToaster } from "../../store/toasterSlice";

export default function _editOrder({ id }) {
  const dispatch = useDispatch();
  const { data: orderData, ...orderDataArgs } = useGetOrderQuery(id);
  const [edit, { ...editArgs }] = useEditOrderMutation();
  const open = useSelector((state) => state.toaster.open);
  const [marked, setMarked] = useState(false);

  const changeStatus = async () => {
    try {
      const res = await edit({ id: id, status: "Delivered" }).unwrap();
      dispatch(
        setToaster({
          message: "Success",
          severity: "success",
          navigateTo: null,
        })
      );
      dispatch(setOpen(true));
      dispatch(
        setToaster({
          message: "Status Changed Successfully",
          severity: "success",
          navigateTo: null,
        })
      );
      setMarked(true);
    } catch (error) {
      setMarked(false);
      dispatch(
        setToaster({
          message: "Something Went Wrong,Failed To Mark",
          severity: "error",
          navigateTo: null,
        })
      );
      dispatch(setOpen(true));
    }
  };

  useEffect(() => {
    if (!id || orderDataArgs.isError) {
      dispatch(setEditOpen(false));
      dispatch(setOpen(true));
      dispatch(
        setToaster({
          message: "Something Went Wrong",
          severity: "error",
          navigateTo: null,
        })
      );
    }
  }, [id, orderDataArgs.isError]);

  return (
    <Box
      sx={{
        margin: " auto",
        display: "flex",
        flexDirection: "column",
        gap: 1,
        width: 1,
      }}
    >
      <Typography textAlign={"left"} variant="h5" component="h5">
        Change Order Status
      </Typography>
      <Box
        sx={{
          maxHeight: 400,
          width: 1,
          margin: "1rem auto",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            overflow: "auto",
            margin: "auto",
            width: 1,
            padding: 3,
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 1,
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h6" component="h6">
                Order Id
              </Typography>
              <Typography variant="body1" component="h6">
                {orderData?.id}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h6" component="h6">
                Order Status
              </Typography>
              <Typography variant="body1" component="h6">
                {!marked ? orderData?.orderStatus : "Delivered"}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h6" component="h6">
                Date
              </Typography>
              <Typography variant="body1" component="h6">
                {new Date(orderData?.orderDate).toLocaleDateString()}
              </Typography>
            </Box>
          </Box>

          <Typography variant="h6" component="h6">
            Receipt
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              border: "1px solid grey",
              padding: 1,
            }}
          >
            <_receipt
              cartProducts={orderData?.cartProducts}
              totalPrice={orderData?.totalPrice}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            gap: 1,
          }}
        >
          <Button
            variant="contained"
            size="small"
            color="primary"
            disabled={!(orderData?.orderStatus === "Ordered") || marked}
            onClick={changeStatus}
          >
            Mark As Delivered
          </Button>
          <Button
            variant="contained"
            size="small"
            color="warning"
            onClick={() => dispatch(setEditOpen(false))}
          >
            Close
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
