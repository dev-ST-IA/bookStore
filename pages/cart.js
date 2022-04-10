import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/_cartItem";
import { updateTotalPrice } from "../store/cartSlice";
import Layout from "../components/_layout";

const columns = [
  { id: "id", label: "ID", minWidth: 100 },
  { id: "title", label: "Title", minWidth: 100 },
  { id: "author", label: "Author", minWidth: 100 },
  {
    id: "publisher",
    label: "Publisher",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "price",
    label: "Price",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "units",
    label: "Available Units",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "quantity",
    label: "Quantity",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

function Cart() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const products = useSelector((state) => state.cart.products);
  const total = useSelector((state) => state.cart.total);
  const dispatch = useDispatch();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    setRows(products);
    const price = products
      .map((i) => Number(i.price) * Number(i.quantity))
      .reduce((val, i) => val + i, 0);
    dispatch(updateTotalPrice(price));
  }, [products]);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {products
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return <CartItem row={row} columns={columns} />;
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <TableFooter
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          margin: 2,
        }}
      >
        <Typography variant="h5" component="div">
          LKR {total ? total.toFixed(2) : total}
        </Typography>
        <Button variant="contained" color="success">
          Checkout
        </Button>
      </TableFooter>
    </Paper>
  );
}

Cart.layout = Layout;

export default Cart;
