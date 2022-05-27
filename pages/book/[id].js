import { useState } from "react";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import BookCardButton from "../../components/_bookCardButton";
import { Divider } from "@mui/material";
import { useGetBookQuery } from "../../services/bookStoreApi";
import _bookComments from "../../components/_bookComments";
import CenteredLoader from "../../components/_centeredLoader";
import Layout from "../../components/_layout";
import { setOpen, setToaster } from "../../store/toasterSlice";
import { useDispatch } from "react-redux";
import _bookRating from "../../components/_bookRating";
import _starBook from "./_starBook";

function Book() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { data, isError, isFetching, isLoading, isSuccess, error } =
    useGetBookQuery(id);

  if (isSuccess) {
    return (
      <Grid container padding={10}>
        <Grid item xs={12} md={6}>
          <Box sx={{ maxWidth: 1 }}>
            {isSuccess && data.imageUrl != "" && (
              <img
                src={data.imageUrl}
                alt={data.title}
                loading="lazy"
                style={{
                  minWidth: "100%",
                  maxWidth: `auto`,
                  maxHeight: `30rem`,
                  objectFit: "contain",
                }}
              />
            )}
            {(!isSuccess || data.imageUrl == "") && (
              <Typography textAlign={"center"} variant="body1" component="div">
                Image Not Available{" \n"}
              </Typography>
            )}
            <_starBook id={id} />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingBottom: "1rem",
            }}
          >
            <Box sx={{ flexGrow: 0.5 }}>
              <Typography textAlign={"center"} variant="h2" component="div">
                {data.title}
              </Typography>
              <Typography textAlign={"center"} variant="h5" component="div">
                {data?.authorName || ""}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  margin: 2,
                  gap: 1,
                  alignItems: "center",
                }}
              >
                <Typography textAlign="center" variant="body1" component="div">
                  Publisher{": " + data.publisher}
                </Typography>
                <Typography textAlign="center" variant="body1" component="div">
                  Category{": " + data.categoryName || ""}
                </Typography>
                <_bookRating id={id} rating="book" />
              </Box>
            </Box>
            <Box sx={{ justifySelf: "flex-end" }}>
              <BookCardButton
                id={data.id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  gap: 2,
                }}
                showQuantity={true}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Typography textAlign="center" variant="body1" component="div">
                  Your Rating
                </Typography>
                <_bookRating id={id} rating="user" />
              </Box>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={12} marginTop={3}>
          <Divider flexItem orientation="horizontal" />
          <Box sx={{ width: 0.75, margin: "1rem  auto" }}>
            <Typography textAlign={"left"} variant="h4" component="div">
              Description
            </Typography>
            <Typography textAlign={"left"} variant="body1" component="div">
              {data.description}
            </Typography>
          </Box>
          <Divider flexItem orientation="horizontal" />
        </Grid>
        <Grid item xs={12} md={12}>
          <Box sx={{ width: 0.75, margin: "1rem  auto" }}>
            <Typography textAlign={"left"} variant="h4" component="div">
              Comments
            </Typography>
            <_bookComments id={id} />
          </Box>
        </Grid>
      </Grid>
    );
  } else if (isLoading || isFetching) {
    return <CenteredLoader />;
  } else if (isError) {
    dispatch(setOpen(true));
    dispatch(
      setToaster({
        message: "Not Sure If There Is A Book Like That",
        severity: "error",
        navigateTo: "/",
      })
    );
    return null;
  } else {
    return null;
  }
}

Book.layout = Layout;

export default Book;
