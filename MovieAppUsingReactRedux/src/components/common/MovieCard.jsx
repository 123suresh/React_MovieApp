import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

export default function MovieCard({ imgSrc, width, height }) {
  return (
    <Card sx={{ maxWidth: +width }} className="movie__card">
      <CardMedia
        component="img"
        height={height}
        image={imgSrc}
        alt="Movie Image"
      />
    </Card>
  );
}
