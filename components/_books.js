import BookCard from "./_bookCard";
import { Box } from "@mui/system";
import { Pagination } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useSelector, useDispatch } from "react-redux";
import { addSort, addPage } from "../store/searchSlice";
import _sorting from "./_sorting";

export default function Books({ data, totalPages }) {
  const search = useSelector((state) => state.search);
  const queries = useSelector((state) => state.orderQuery);
  const sortValue = queries.Sort;
  const sort = search.Sort;
  const dispatch = useDispatch();

  const handleCategoryChange = (event) => {
    dispatch(addSort(event.target.value));
  };

  const handlePage = (event, value) => {
    dispatch(addPage(value));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "auto",
      }}
    >
      <_sorting
        action={addSort}
        sortables={[
          "popular",
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
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          p: 1,
          m: 1,
          width: "100%",
          justifyContent: "space-evenly",
          margin: "auto",
        }}
      >
        {data?.map((book) => (
          <BookCard {...book} />
        ))}
      </Box>
      <Pagination
        count={totalPages}
        variant="outlined"
        shape="rounded"
        onChange={handlePage}
        page={search?.Page || 1}
      />
    </Box>
  );
}
