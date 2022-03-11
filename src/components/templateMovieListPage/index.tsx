import React, { FunctionComponent } from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import makeStyles from "@mui/styles/makeStyles";
import MovieList from "../movieList";
import { ListedMovie } from "../../types";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#bfbfbf",
    paddingTop: theme.spacing(7),
  },
}));

const MovieListPageTemplate: FunctionComponent<{
  movies: ListedMovie[];
  title: string;
  selectFavourite: (id: number) => void;
}> = ({ movies, title, selectFavourite }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Header title={title} />
        </Grid>
        <Grid item container spacing={5}>
          <MovieList
            selectFavourite={selectFavourite}
            movies={movies}
          />
        </Grid>
      </Grid>
    </div>
  );
};
export default MovieListPageTemplate;
