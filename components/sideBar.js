import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { Divider } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { ListItemText } from "@mui/material";
import React from "react";
import { useGetAllCategoriesQuery } from "../services/bookStoreApi";
import { useSelector, useDispatch } from "react-redux";
import { addCategory } from "../store/searchSlice";
import CenteredLoader from "./_centeredLoader";
import useAuth from "../hooks/useAuth";

export default function SideBar({ children }) {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search);
  const categoryId = search.category;
  const { data, isError, isLoading, isSuccess, error } =
    useGetAllCategoriesQuery();
  const auth = useAuth();
  const isLogged = auth?.isUserLogged;

  const handleCategoryClick = (id) => {
    dispatch(addCategory(id));
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            minWidth: 1,
            height: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: "1rem",
          }}
        >
          <Typography component="h1" variant="h6" color="inherit" noWrap>
            Categories
          </Typography>
          <Divider flexItem />
          {isSuccess && (
            <nav aria-label="book categories">
              <List>
                {isLogged && (
                  <ListItem>
                    <ListItemButton
                      selected={categoryId === -2}
                      onClick={() => handleCategoryClick(-2)}
                    >
                      <ListItemText primary={"Favourites"} />
                    </ListItemButton>
                  </ListItem>
                )}
                <ListItem>
                  <ListItemButton
                    selected={categoryId === -1}
                    onClick={() => handleCategoryClick(-1)}
                  >
                    <ListItemText primary={"All"} />
                  </ListItemButton>
                </ListItem>
                {data?.map((category) => (
                  <ListItem>
                    <ListItemButton
                      selected={categoryId === category.id}
                      onClick={() => handleCategoryClick(category.id)}
                    >
                      <ListItemText primary={category.name} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </nav>
          )}
          {isLoading && <CenteredLoader size={40} />}
        </Box>
        <Divider orientation="vertical" flexItem />
      </Box>
    </React.Fragment>
  );
}
