import { useEffect, useState } from "react";
import BookCard from "./_bookCard";
import { Box } from "@mui/system";
import { Pagination } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useSelector, useDispatch } from "react-redux";
import { addSort, addPage } from "../store/searchSlice";

export default function Books({ data, totalPages }) {
  const search = useSelector((state) => state.search);
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
      <FormControl sx={{ m: 1, minWidth: 170, alignSelf: "end" }}>
        <InputLabel id="demo-simple-select-helper-label">Sort By</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={sort}
          label="Sort By"
          onChange={handleCategoryChange}
        >
          <MenuItem value={"popular"}>Popularity</MenuItem>
          <MenuItem value={"date_asc"}>Newest</MenuItem>
          <MenuItem value={"date_desc"}>Oldest</MenuItem>
          <MenuItem value={"price_asc"}>Price : Low To High</MenuItem>
          <MenuItem value={"price_desc"}>Price : High To Low</MenuItem>
          <MenuItem value={"name_asc"}>Book Title - Ascending</MenuItem>
          <MenuItem value={"name_desc"}>Book Title - Descending</MenuItem>
        </Select>
      </FormControl>
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
        {data.map((book) => (
          <BookCard {...book} />
        ))}
      </Box>
      <Pagination
        count={totalPages}
        variant="outlined"
        shape="rounded"
        onChange={handlePage}
      />
    </Box>
  );
}
