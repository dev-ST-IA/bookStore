import { useState } from "react";
import { useDispatch } from "react-redux";
import { Box } from "@mui/system";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

export default function _generalDataGrid({
  sorting,
  search,
  columns,
  getData,
  pagination,
  queries,
  rowToolBar,
}) {
  const dispatch = useDispatch();
  const [selectedRow, setSelectedRow] = useState(null);
  const { data, isError, isLoading, isFetching, error } = getData;
  const { addSize, addPage } = pagination;
  const { Size, Page } = queries;

  return (
    <>
      <Box
        sx={{
          margin: "1rem auto",
          width: "90%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {sorting}
        {search}
      </Box>
      <Box
        sx={{
          height: 500,
          maxHeight: 500,
          margin: "1rem auto",
          width: "90%",
        }}
      >
        <DataGrid
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          rows={data?.rows ? data?.rows : []}
          loading={isLoading || isFetching}
          error={error?.data?.title}
          onPageSizeChange={(number) => dispatch(addSize(number))}
          onPageChange={(number) => dispatch(addPage(number + 1))}
          rowCount={data?.totalPages * Size || 1}
          rowsPerPageOptions={[10, 20, 50, 100]}
          pageSize={Size}
          page={Page - 1}
          editMode="row"
          onRowClick={(params, e, details) => setSelectedRow(params.row)}
        />
      </Box>
      {rowToolBar(selectedRow)}
    </>
  );
}
