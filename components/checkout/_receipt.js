import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import _perItemInReceipt from "./_perItemInReceipt";

export default function _receipt({ cartProducts, totalPrice }) {
  return (
    <List disablePadding>
      {cartProducts?.map((product) => (
        <_perItemInReceipt {...product} />
      ))}

      <ListItem sx={{ py: 1, px: 0 }}>
        <ListItemText primary="Total" />
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          LKR {" " + totalPrice}
        </Typography>
      </ListItem>
    </List>
  );
}
