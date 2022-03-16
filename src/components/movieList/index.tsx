import React from "react";
import Movie from "../movieCard/";
import Grid from "@mui/material/Grid";
import { ListedMovie, MovieT } from "../../types";

function MovieList<T extends ListedMovie | MovieT>({
  movies,
  selectFavourite,
}: {
  movies: T[];
  selectFavourite: (id: number) => void;
}) {
  let movieCards = movies.map((m) => (
    <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Movie key={m.id} movie={m} selectFavourite={selectFavourite} />
    </Grid>
  ));
  return <>{movieCards}</>;
}

export default MovieList;
