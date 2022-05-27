import AuthLayout from "../../components/auth/_authLayout";
import _checkOut from "../../components/checkout/_checkOut";
import { useSelector, useDispatch } from "react-redux";
import { useGetCartQuery } from "../../services/bookStoreApi";
import { setOpen, setToaster } from "../../store/toasterSlice";
import { useRouter } from "next/router";

function CheckOut() {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.toaster.open);
  const { data: cartProducts, ...args } = useGetCartQuery();
  const isCheckOutAvailable = cartProducts?.length > 0;
  const router = useRouter();
  const orderPlaced = useSelector((state) => state.placeOrder.orderPlaced);

  if (isCheckOutAvailable || orderPlaced) {
    return <_checkOut />;
  } else if (!args.isFetching && !args.isLoading) {
    router.back();
    dispatch(setOpen(true));
    dispatch(
      setToaster({
        message: "Cannot Enter Checkout Without Products In Your Cart",
        severity: "error",
        navigateTo: null,
      })
    );
    return null;
  } else {
    return null;
  }
}

export default CheckOut;
