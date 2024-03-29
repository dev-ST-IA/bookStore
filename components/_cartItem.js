import { useEffect, useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import { update, deleteProduct } from "../store/cartSlice";
import AddBoxSharpIcon from "@mui/icons-material/AddBoxSharp";
import RemoveSharpIcon from "@mui/icons-material/RemoveSharp";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import { IconButton } from "@mui/material";
import { Typography } from "@mui/material";
import { useGetBookQuery } from "../services/bookStoreApi";
import useAuth from "../hooks/useAuth";
import {
  useDeleteProductInCartMutation,
  useEditProductInCartMutation,
} from "../services/bookStoreApi";

export default function CartItem({ row, columns }) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.products);
  const [index, setIndex] = useState(null);
  const item = products?.filter((i) => i.id == row.id)[0];
  const { data, ...args } = useGetBookQuery(row?.id);
  const auth = useAuth();
  const isUserLogged = auth?.isUserLogged;
  const [deleteCurrentProduct, { ...deleteProductArgs }] =
    useDeleteProductInCartMutation();
  const [editProduct, { ...editProductArgs }] = useEditProductInCartMutation();

  const addQuantity = async (e, product = row) => {
    if (Number(product.quantity) < Number(product.units)) {
      if (isUserLogged) {
        editProduct({
          productId: row.id,
          quantity: Number(row.quantity) + 1,
        });
      } else {
        let obj = { ...product, quantity: product.quantity + 1 };
        dispatch(update({ index, object: obj }));
      }
    }
  };

  const minusQuantity = (e, product = row) => {
    if (product.quantity > 1) {
      if (isUserLogged) {
        editProduct({
          productId: row.id,
          quantity: Number(row.quantity) - 1,
        });
      } else {
        let obj = { ...product, quantity: product.quantity - 1 };
        dispatch(update({ index, object: obj }));
      }
    }
  };

  const removeItem = async () => {
    if (isUserLogged) {
      deleteCurrentProduct(row.id);
    } else {
      dispatch(deleteProduct({ id: row.id }));
    }
  };

  useEffect(() => {
    const index = products.findIndex((i) => i.id === row.id);
    setIndex(index);
  }, []);

  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
      <TableCell key="id">{row?.id?.toLocaleString("en-US")}</TableCell>
      <TableCell key="title">{row?.title}</TableCell>
      <TableCell key="author">{data?.authorName}</TableCell>
      <TableCell key="publisher" align="right">
        {row?.publisher}
      </TableCell>
      <TableCell key="price" align="right">
        {row?.price?.toLocaleString("en-US")}
      </TableCell>
      <TableCell key="units" align="right">
        {row?.units?.toLocaleString("en-US")}
      </TableCell>
      <TableCell
        key="quantity"
        align="right"
        sx={{ display: "flex", justifyContent: "right" }}
      >
        <IconButton onClick={(e) => addQuantity(e, row)}>
          <AddBoxSharpIcon />
        </IconButton>
        <Typography>{row.quantity}</Typography>
        <IconButton onClick={(e) => minusQuantity(e, row)}>
          <RemoveSharpIcon />
        </IconButton>
      </TableCell>
      <TableCell key="quantity" align="right">
        <IconButton onClick={removeItem}>
          <DeleteSharpIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
