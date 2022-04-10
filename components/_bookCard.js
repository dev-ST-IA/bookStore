import { useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { Typography } from "@mui/material";
import { ButtonBase } from "@mui/material";
import BookCardButton from "./_bookCardButton";
import { useRouter } from "next/router";

export default function BookCard({
  sx,
  title,
  author,
  price,
  id,
  publisher,
  units,
  ...other
}) {
  const router = useRouter();
  const goToBook = () => {
    router.push(`/book/${id}`);
  };

  return (
    <Card sx={{ maxWidth: 250, minWidth: 250, margin: 2, ...sx }}>
      <ButtonBase
        sx={{
          display: "flex",
          flexDirection: "column",
          margin: "auto",
          width: 1,
        }}
        onClick={goToBook}
      >
        <CardHeader title={title} subheader={author} />
        <CardMedia
          component="img"
          height="194"
          image="/static/images/cards/paella.jpg"
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="h5" component="div">
            {price}
            {" LKR"}
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions>
        <BookCardButton
          id={id}
          sx={{ display: "flex", justifyContent: "space-evenly", width: 1 }}
        />
      </CardActions>
    </Card>
  );
}
