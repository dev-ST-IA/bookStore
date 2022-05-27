import { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Autocomplete from "@mui/material/Autocomplete";
import { IconButton } from "@mui/material";
import { InputAdornment } from "@mui/material";
import { TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { addSearch } from "../store/searchBarSlice";
import { useGetAllBooksSearchQuery } from "../services/bookStoreApi";
import { useRouter } from "next/router";
import { setToaster } from "../store/toasterSlice";

export default function AppBarSearch({ sx }) {
  const [suggestions, setSuggestions] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();
  const search = useSelector((state) => state.searchBar.search);
  const { isError, isLoading, isSuccess, data, error, refetch } =
    useGetAllBooksSearchQuery(search);

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));

  const handleSearch = (e, val) => {
    dispatch(addSearch(val));
  };

  const handleChange = (event, newValue) => {
    dispatch(addSearch(newValue));
    const id = suggestions.filter((i) => i.view === newValue);
    if (id[0]) {
      router.push(`/book/${id[0].id}`);
    } else if (error) {
      dispatch(
        setToaster({
          message: "Something Went Wrong",
          severity: "error",
          navigateTo: null,
        })
      );
    }
  };

  useEffect(() => {
    if (search != "") {
      refetch();
    }
  }, [search]);

  useEffect(() => {
    if (data) {
      const filter = data.map((book) => ({
        id: book.id,
        view: `${book.title} - ${book.publisher}`,
      }));
      setSuggestions(filter);
    } else {
      setSuggestions([]);
    }
  }, [data]);

  return (
    <Autocomplete
      freeSolo
      id="free-solo-2-demo"
      options={suggestions.map((suggestion) => suggestion.view)}
      loading={isLoading}
      renderInput={(params) => (
        <TextField
          {...params}
          InputProps={{
            ...params.InputProps,
            type: "search",
            startAdornment: (
              <InputAdornment>
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}
      value={search}
      onChange={handleChange}
      onInputChange={handleSearch}
      sx={{ ...sx }}
    />
  );
}
