import Rating from "@mui/material/Rating";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import {
  useStarBookMutation,
  useIsStarBookQuery,
} from "../../services/bookStoreApi";
import useAuth from "../../hooks/useAuth";

export default function _starBook({ id }) {
  const [starBook, { ...args }] = useStarBookMutation();
  const { data, ...isStarArgs } = useIsStarBookQuery({ id });
  const starValue = data?.isStar ? 1 : 0;
  const auth = useAuth();
  const isLoggedIn = auth?.isUserLogged;

  if (isLoggedIn) {
    return (
      <Box
        sx={{
          display: "flex",
          margin: "auto",
          justifyContent: "center",
          gap: 2,
          padding: 2,
          alignItems: "center",
        }}
      >
        <Typography textAlign="center" variant="body1" component="div">
          Add To Favourites
        </Typography>
        <Rating
          name="simple-controlled"
          value={starValue}
          onChange={(event, newValue) => {
            starBook({ id });
          }}
          max={1}
          size="large"
        />
      </Box>
    );
  }
  return null;
}
