import { useState } from "react";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import BookCardButton from "../../components/_bookCardButton";
import { Divider } from "@mui/material";
import { useGetBookQuery } from "../../services/bookStoreApi";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CenteredLoader from "../../components/_centeredLoader";
import ToasterAlert from "../../components/_alertToaster";
import Layout from "../../components/_layout";

function Book() {
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
              <Typography textAlign={"center"} variant="h3" component="div">
                {data?.author || ""}
              </Typography>
              <ul>
                <li>
                  <Typography textAlign="left" variant="body1" component="div">
                    Publisher{": " + data.publisher}
                  </Typography>
                </li>
                <li>
                  <Typography textAlign="left" variant="body1" component="div">
                    Category{": " + data.category || ""}
                  </Typography>
                </li>
              </ul>
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
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={10}>
          <Divider flexItem orientation="horizontal" />
          <Box sx={{ width: 0.75, margin: "1rem  auto" }}>
            <Typography textAlign={"left"} variant="h4" component="div">
              Description
            </Typography>
            <Typography textAlign={"left"} variant="body1" component="div">
              {data.description}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    );
  } else if (isLoading || isFetching) {
    return <CenteredLoader />;
  } else if (isError) {
    setOpen(true);
    return (
      <ToasterAlert
        message="Not Sure If There Is A Book Like That"
        severity="error"
        navigateTo={"/"}
      />
    );
  } else {
    return null;
  }
}

Book.layout = Layout;

export default Book;
