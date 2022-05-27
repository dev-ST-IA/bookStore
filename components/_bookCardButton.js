import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Box } from "@mui/system";
import { add, update } from "../store/cartSlice";
import { TextField } from "@mui/material";
import {
  useGetBookQuery,
  useAddProductToCartMutation,
  useEditProductInCartMutation,
} from "../services/bookStoreApi";
import useAuth from "../hooks/useAuth";

export default function BookCardButton({ id, sx, showQuantity = false }) {
  const [noQuantity, setQuantity] = useState(1);
  const [index, setIndex] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const cart = useSelector((state) => state.cart).products;
  const isProductAvailable = cart.some((i) => i.id == id);
  const { data, isError, isFetching, isLoading, isSuccess } =
    useGetBookQuery(id);
  const auth = useAuth();
  const isUserLogged = auth?.isUserLogged;
  const [addProductToCart, { ...addToCartAgrs }] =
    useAddProductToCartMutation();
  const [editProduct, { ...editProductArgs }] = useEditProductInCartMutation();

  const addItToCart = () => {
    if (isUserLogged) {
      if (!isProductAvailable) {
        addProductToCart({ productId: id, quantity: noQuantity });
      } else {
        editProduct({
          productId: id,
          quantity: noQuantity,
        });
      }
    } else {
      const values = {
        id,
        title: data.title,
        authorName: data.authorName,
        price: data.price,
        units: data.units,
        publisher: data.publisher,
        quantity: noQuantity,
      };
      if (!isProductAvailable) {
        dispatch(add(values));
      } else {
        let obj = { ...product, quantity: product.quantity - 1 };
        dispatch(update({ index, object: obj }));
      }
    }
  };

  const handleAddToCart = () => {
    addItToCart();
  };

  const handleBuy = () => {
    if (!isProductAvailable) {
      addItToCart();
    }
    router.push("/cart");
  };

  const handleQuantityInput = (e) => {
    const value = e.target.value;
    if (value <= data?.units && value > 0) {
      setQuantity(value);
    }
  };

  useEffect(() => {
    const index = cart.findIndex((i) => i.id === id);
    setIndex(index);
  }, []);

  return (
    <Box sx={{ ...sx }}>
      {isSuccess && (
        <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
          <Button
            variant="contained"
            size="small"
            startIcon={<AddShoppingCartIcon />}
            onClick={
              showQuantity
                ? handleAddToCart
                : !showQuantity && !isProductAvailable
                ? handleAddToCart
                : null
            }
            href={isProductAvailable && !showQuantity ? "/cart" : null}
          >
            {isProductAvailable && !showQuantity ? "Go To Cart" : "Add To Cart"}
          </Button>
          {showQuantity && (
            <TextField
              id="outlined-number"
              label="Quantity"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              value={noQuantity}
              onChange={handleQuantityInput}
            />
          )}
        </Box>
      )}
      <Button variant="contained" size="small" onClick={handleBuy}>
        Buy Now
      </Button>
    </Box>
  );
}
