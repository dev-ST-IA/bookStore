import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { NativeSelect } from "@mui/material";

const sorts = [
  { value: "popular", name: "Popular" },
  { value: "name_asc", name: "Name-Ascending" },
  { value: "name_desc", name: "Name-Descending" },
  { value: "date_asc", name: "Date-Ascending" },
  { value: "date_desc", name: "Date-Descending" },
  { value: "price_asc", name: "Price-Ascending" },
  { value: "price_desc", name: "Price-Descending" },
];
export default function _sorting({
  action,
  sortables = [],
  value,
  width = 120,
  sx,
}) {
  const dispatch = useDispatch();
  const filteredSorts = sorts.filter((i) => sortables.includes(i.value));

  return (
    <Box sx={{ minWidth: width, p: 2, ...sx }}>
      <FormControl fullWidth>
        <InputLabel id="sorting-label">Sort By</InputLabel>
        <NativeSelect
          defaultValue={filteredSorts[0]}
          inputProps={{
            name: "Sort By",
            id: "sortable",
          }}
          onChange={(e) => dispatch(action(e.target.value))}
        >
          {filteredSorts.map((p) => (
            <option value={p.value}>{p.name}</option>
          ))}
        </NativeSelect>
      </FormControl>
    </Box>
  );
}
