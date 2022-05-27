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
import { Box } from "@mui/system";

export default function BookCard({
  sx,
  title,
  authorName,
  authorId,
  price,
  id,
  publisher,
  units,
  categoryId,
  categoryName,
  imageUrl,
  ...other
}) {
  const router = useRouter();
  const goToBook = () => {
    router.push(`/book/${id}`);
  };

  return (
    <Card sx={{ maxWidth: 250, minWidth: 300, margin: 2, ...sx }}>
      <ButtonBase
        sx={{
          display: "flex",
          flexDirection: "column",
          margin: "auto",
          width: 1,
        }}
        onClick={goToBook}
      >
        <CardHeader
          sx={{ minHeight: "7rem", maxHeight: "15rem", overflow: "auto" }}
          title={title}
          subheader={authorName}
        />
        <Box sx={{ height: "30rem", margin: "auto" }}>
          <CardMedia
            component="img"
            image={imageUrl}
            alt={title}
            sx={{
              objectFit: "contain",
              width: 1,
              minHeight: "30rem",
              margin: "auto",
            }}
          />
        </Box>

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
