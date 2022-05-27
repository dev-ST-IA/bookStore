import { Box } from "@mui/system";
import _enterComment from "./_enterComment";
import _bookComment from "./_bookComment";
import Pagination from "@mui/material/Pagination";
import { useGetCommentsQuery } from "../services/bookStoreApi";
import { useState } from "react";

export default function _bookComments({ id }) {
  const [paging, setPaging] = useState({ Page: 1, Size: 5 });
  const { data, isSuccess, isError, isLoading } = useGetCommentsQuery({
    ...paging,
    id,
  });
  const handlePage = (e, val) => {
    setPaging((prev) => ({ ...prev, Page: val }));
  };
  const comments = data?.comments;
  return (
    <Box
      sx={{
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
        width: 1,
      }}
    >
      <_enterComment id={id} />
      <Box
        sx={{
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 1,
          width: 1,
        }}
      >
        {comments?.map((i) => (
          <_bookComment {...i} />
        ))}
      </Box>
      <Pagination
        count={data?.totalPages}
        page={paging.Page}
        onChange={handlePage}
        variant="outlined"
        shape="rounded"
      />
    </Box>
  );
}
