import { useGetBookQuery } from "../../services/bookStoreApi";
import _centeredLoader from "../_centeredLoader";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export default function _perItemInReceipt({
  id,
  quantity,
  totalPrice,
  ...props
}) {
  const { data: book, ...args } = useGetBookQuery(id);

  if (args.isSuccess) {
    return (
      <ListItem
        key={book?.id}
        sx={{
          py: 1,
          px: 0,
          display: "flex",
          width: 1,
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <ListItemText
          primary={book?.title}
          secondary={book?.authorName}
          sx={{ flexGrow: 0, width: 0.4, overflow: "auto" }}
        />
        <Typography variant="body2">{book?.price}</Typography>
        <Typography variant="body2">{quantity}</Typography>
        <Typography variant="body2">{totalPrice}</Typography>
      </ListItem>
    );
  } else if (args.isLoading || args.isFetching) {
    return <_centeredLoader />;
  } else {
    return <Typography variant="body2">Cannot Load Product Data</Typography>;
  }
}
