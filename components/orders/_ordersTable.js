import { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import _modelWithButton from "../_modelWithButton";
import _editOrder from "./_editOrder";
import { setEditOpen } from "../../store/modelSlice";
import { useSelector, useDispatch } from "react-redux";
import { ordersColumns } from "../../utils/datagrids";
import { useGetAllOrdersQuery } from "../../services/bookStoreApi";
import {
  addPage,
  addSize,
  setSearch,
  addSort,
  addRange,
} from "../../store/orderQuerySlice";
import _sorting from "../_sorting";
import _generalDataGrid from "../_generalDataGrid";

export default function _ordersTable() {
  const dispatch = useDispatch();
  const queries = useSelector((state) => state.orderQuery);
  const { ...args } = useGetAllOrdersQuery(queries);
  const models = useSelector((state) => state.model);
  const editModel = models.editOpen;
  const sortValue = queries.Sort;
  const search = queries.search;

  return (
    <_generalDataGrid
      sorting={
        <_sorting
          action={addSort}
          sortables={[
            "name_asc",
            "name_desc",
            "date_asc",
            "date_desc",
            "price_asc",
            "price_desc",
          ]}
          sx={{ alignSelf: "flex-end" }}
          value={sortValue}
        />
      }
      search={
        <TextField
          id="standard-basic"
          label="Search For Orders"
          variant="standard"
          fullWidth
          onChange={(e) => dispatch(setSearch(e.target.value))}
          value={search}
        />
      }
      columns={ordersColumns}
      getData={{ ...args }}
      pagination={{ addSize, addPage }}
      queries={{ ...queries }}
      rowToolBar={(row) => {
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              gap: 1,
              flexGrow: 1,
            }}
          >
            <_modelWithButton
              buttonColor={"secondary"}
              buttonText="View/Change Order Status"
              buttonIcon={<EditIcon />}
              setOpen={setEditOpen}
              open={editModel}
              disabled={!row?.id}
            >
              <_editOrder id={row?.id} />
            </_modelWithButton>
          </Box>
        );
      }}
    />
  );
}
