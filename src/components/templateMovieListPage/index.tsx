import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import makeStyles from "@mui/styles/makeStyles";
import MovieList from "../movieList";
import { ListedMovie, MovieT } from "../../types";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#bfbfbf",
    minHeight: "100vh",
    paddingTop: theme.spacing(3),
  },
}));

function MovieListPageTemplate<T extends ListedMovie | MovieT>({
  movies,
  title,
  action,
}: {
  movies: T[];
  title: string;
  action: (m: T) => React.ReactNode;
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Header title={title} />
        </Grid>
        <Grid item container spacing={5}>
          <MovieList action={action} movies={movies} />
        </Grid>
      </Grid>
    </div>
  );
}
export default MovieListPageTemplate;
