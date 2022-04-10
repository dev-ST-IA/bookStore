import { useEffect } from "react";
import Books from "../components/_books";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import SideBar from "../components/sideBar";
import { useGetAllBooksQuery } from "../services/bookStoreApi";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import Layout from "../components/_layout";

function Home() {
  const search = useSelector((state) => state.search);
  const category = search.category;
  const Page = search.Page;
  const Size = search.Size;
  const Sort = search.Sort;
  const auth = useSelector((state) => state.auth);

  const { data, isError, isFetching, isLoading, isSuccess, error, refetch } =
    useGetAllBooksQuery({ Size, Sort, Page, category });
  const books = data?.books["$values"];
  const totalPages = data?.totalPages;

  useEffect(() => {
    refetch({ Size, Sort, Page, category });
  }, [category, Page, Size, Sort]);

  return (
    <Box
      sx={{
        width: 1,
        margin: "auto",
      }}
    >
      <Grid container columnGap={0} columnSpacing={0}>
        <Grid item xs>
          <SideBar />
        </Grid>
        <Grid item xs={10}>
          {isSuccess && <Books data={books} totalPages={totalPages} />}
          {isLoading && (
            <Box
              sx={{
                width: 1,
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress color="secondary" size={60} />
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

Home.layout = Layout;

export default Home;
