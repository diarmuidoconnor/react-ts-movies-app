import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import makeStyles from "@mui/styles/makeStyles";
import MovieList from "../movieList";
import { ListedMovie, MovieT } from "../../types";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#bfbfbf",
    paddingTop: theme.spacing(7),
  },
}));

function MovieListPageTemplate<T extends ListedMovie | MovieT>({
  movies,
  title,
  selectFavourite,
}: {
  movies: T[];
  title: string;
  selectFavourite: (id: number) => void;
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Header title={title} />
        </Grid>
        <Grid item container spacing={5}>
          <MovieList selectFavourite={selectFavourite} movies={movies} />
        </Grid>
      </Grid>
    </div>
  );
}
export default MovieListPageTemplate;
