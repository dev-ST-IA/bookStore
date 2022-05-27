import React from "react";
import { AuthContext } from "../../context/_authContext";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useGetUserQuery } from "../../services/bookStoreApi";
import { setUserDetails } from "../../store/authSlice";
import {
  useGetCartQuery,
  useAddProductToCartMutation,
} from "../../services/bookStoreApi";
import { updateCart, updateTotalPrice } from "../../store/cartSlice";

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const { data, isSuccess, isError, error } = useGetUserQuery();
  const {
    data: cart,
    isSuccess: isCartSuccess,
    isError: isCartError,
    error: cartError,
  } = useGetCartQuery();
  const [addToCart, { ...addToCartArgs }] = useAddProductToCartMutation();
  const [isUserLogged, setIsUserLogged] = useState(true);
  const authData = useSelector((state) => state.auth);
  const token = authData.token;
  const products = useSelector((state) => state.cart.products);

  useEffect(() => {
    const isUserLoggedIn = token != null && token != "" ? true : false;
    setIsUserLogged(isUserLoggedIn);
  }, [authData]);

  useEffect(() => {
    if (!isError && isSuccess && data) {
      dispatch(setUserDetails(data));
    }
  }, [data]);

  // const bulkAdd = async (products) => {
  //   products.forEach((product) => {
  //     addToCart({ productId: product.id, quantity: product.quantity });
  //   });
  // };
  useEffect(() => {
    if (isUserLogged) {
      if (!isCartError && isCartSuccess) {
        dispatch(updateCart(cart));
        const totalPrice = cart.reduce(
          (total, i) => total + Number(i.totalPrice),
          0
        );
        dispatch(updateTotalPrice(totalPrice));
      }
      // if (cart?.length <= 0 && products?.length > 0) {
      //   bulkAdd(products);
      // }
    }
  }, [cart, isUserLogged, data]);

  const value = { isUserLogged, authData };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
