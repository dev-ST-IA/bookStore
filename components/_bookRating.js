import Rating from "@mui/material/Rating";
import {
  useGetBookRatingQuery,
  useRateBookMutation,
} from "../services/bookStoreApi";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import useAuth from "../hooks/useAuth";
import { Link } from "@mui/material";

export default function _bookRating({ id, rating = "user" }) {
  const [userRating, setUserRating] = useState(0);
  const { data, ...bookRateArgs } = useGetBookRatingQuery({ id });
  const [rateBook, { ...rateBookArgs }] = useRateBookMutation();
  const bookFinalRating = data?.book?.finalRating || 0;
  const bookUserRating = data?.rating || 0;
  const auth = useAuth();
  const isLoggedIn = auth?.isUserLogged;

  const handleUserRating = async (e, val) => {
    if (userRating != val) {
      try {
        await rateBook({ id, rate: val });
      } catch (error) {
        alert(error);
      }
    }
  };

  useEffect(() => {
    if (rating === "user") {
      setUserRating(bookUserRating);
    }
  }, [data]);

  if (rating === "user") {
    if (isLoggedIn) {
      return (
        <Rating
          name="book-rating-user"
          value={bookUserRating}
          max={10}
          precision={0.5}
          onChange={handleUserRating}
        />
      );
    } else {
      return (
        <Link href={`/auth/login?redirect=/book/${id}`} passHref>
          <a>Log In To Proceed With Your Shopping</a>
        </Link>
      );
    }
  } else {
    return (
      <>
        {bookFinalRating > 0 && (
          <Rating
            name="book-rating-final"
            value={bookFinalRating}
            max={10}
            precision={0.5}
            readOnly
          />
        )}
        {bookFinalRating <= 0 && (
          <Typography textAlign="center" variant="body1" component="div">
            Unrated
          </Typography>
        )}
      </>
    );
  }
}
