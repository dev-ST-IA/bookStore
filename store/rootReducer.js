import { combineReducers } from "redux";
import authSlice from "./authSlice";
import cartSlice from "./cartSlice";
import searchSlice from "./searchSlice";
import { bookStoreApi } from "../services/bookStoreApi";
import searchBarSlice from "./searchBarSlice";
import toasterSlice from "./toasterSlice";
import placeOrderSlice from "./placeOrderSlice";
import orderQuerySlice from "./orderQuerySlice";
import modelSlice from "./modelSlice";
import themeModeSlice from "./themeModeSlice";

export const reducer = combineReducers({
  auth: authSlice,
  cart: cartSlice,
  search: searchSlice,
  searchBar: searchBarSlice,
  toaster: toasterSlice,
  placeOrder: placeOrderSlice,
  orderQuery: orderQuerySlice,
  model: modelSlice,
  themeMode: themeModeSlice,
  [bookStoreApi.reducerPath]: bookStoreApi.reducer,
});
