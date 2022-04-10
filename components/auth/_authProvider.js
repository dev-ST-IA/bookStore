import React from "react";
import { AuthContext } from "../../context/_authContext";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useGetUserQuery } from "../../services/bookStoreApi";
import { setUserDetails } from "../../store/authSlice";

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const { data, isSuccess, isError } = useGetUserQuery();
  const [isUserLogged, setIsUserLogged] = useState(false);
  const authData = useSelector((state) => state.auth);
  const token = authData.token;

  useEffect(() => {
    const isUserLoggedIn = token != null && token != "" ? true : false;
    setIsUserLogged(isUserLoggedIn);
  }, [authData]);

  useEffect(() => {
    if (!isError && isSuccess && data) {
      dispatch(setUserDetails(data));
    }
  }, [data]);

  const value = { isUserLogged, authData };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
