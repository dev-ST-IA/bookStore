import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Box } from "@mui/system";
import { add } from "../store/cartSlice";
import { TextField } from "@mui/material";
import { useGetBookQuery } from "../services/bookStoreApi";

export default function BookCardButton({ id, sx, showQuantity = false }) {
  const [noQuantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const router = useRouter();
  const cart = useSelector((state) => state.cart).products;
  const isProductAvailable = cart.some((i) => i.id == id);
  const { data, isError, isFetching, isLoading, isSuccess } =
    useGetBookQuery(id);

  const addItToCart = () => {
    const values = {
      id,
      title: data.title,
      author: data.author,
      price: data.price,
      units: data.units,
      publisher: data.publisher,
      quantity: noQuantity,
    };
    dispatch(add(values));
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
    if (value <= units && value > 0) {
      setQuantity(value);
    }
  };

  return (
    <Box sx={{ ...sx }}>
      {isSuccess && (
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <Button
            variant="contained"
            size="small"
            startIcon={<AddShoppingCartIcon />}
            onClick={handleAddToCart}
            disabled={isProductAvailable}
          >
            Add To Cart
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
