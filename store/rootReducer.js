import { combineReducers } from "redux";
import authSlice from "./authSlice";
import cartSlice from "./cartSlice";
import searchSlice from "./searchSlice";
import { bookStoreApi } from "../services/bookStoreApi";
import searchBarSlice from "./searchBarSlice";
import toasterSlice from "./toasterSlice";

export const reducer = combineReducers({
  auth: authSlice,
  cart: cartSlice,
  search: searchSlice,
  searchBar: searchBarSlice,
  toaster: toasterSlice,
  [bookStoreApi.reducerPath]: bookStoreApi.reducer,
});
