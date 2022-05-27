import { FilledInput, FormControl } from "@mui/material";
import { InputAdornment } from "@mui/material";
import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import { useCommentBookMutation } from "../services/bookStoreApi";
import useAuth from "../hooks/useAuth";
export default function _enterComment({ id }) {
  const [comment, setComment] = useState("");
  const handleComment = (e) => setComment(e.target.value);
  const [enterComment, { isSuccess, isLoading, isError }] =
    useCommentBookMutation({ id, comment });
  const auth = useAuth();
  const isLoggedIn = auth?.isUserLogged;
  const handleSubmit = async (e) => {
    if (comment != "") {
      try {
        await enterComment({ id, comment });
        setComment("");
      } catch (error) {
        alert(error);
      }
    }
  };

  if (isLoggedIn) {
    return (
      <FormControl sx={{ m: 1, width: 1 }} variant="filled">
        <FilledInput
          placeholder="Enter Comment"
          multiline
          variant="filled"
          onChange={handleComment}
          onKeyDown={(e) => (e.key === "Enter" ? handleSubmit(e) : null)}
          value={comment}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="enter comment"
                edge="end"
                onClick={handleSubmit}
              >
                <SendIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    );
  } else {
    return null;
  }
}
