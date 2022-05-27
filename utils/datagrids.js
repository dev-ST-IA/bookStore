export const ordersColumns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "orderDate",
    headerName: "OrderDate",
    type: "date",
    width: 200,
  },
  {
    field: "totalPrice",
    headerName: "Total Amount",
    type: "number",
    sortable: true,
    minWidth: 160,
  },
  {
    field: "totalSales",
    headerName: "No Of Books Bought",
    type: "number",
    sortable: true,
    minWidth: 160,
  },
  {
    field: "orderStatus",
    headerName: "Order Status",
    sortable: true,
    minWidth: 160,
  },
];
