import { useEffect } from "react";
import Books from "../components/_books";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import SideBar from "../components/sideBar";
import {
  useGetAllBooksQuery,
  useGetStarredBooksQuery,
} from "../services/bookStoreApi";
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
  const {
    data: starredData,
    refetch: refetchStarred,
    ...starredArgs
  } = useGetStarredBooksQuery({
    Size,
    Sort,
    Page,
  });
  const books = category != -2 ? data?.books : starredData?.books;
  const totalPages =
    category != -2 ? data?.totalPages : starredData?.totalPages;

  useEffect(() => {
    if (category === -2) {
      refetchStarred({ Size, Sort, Page, category });
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    } else {
      refetch({ Size, Sort, Page, category });
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
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
