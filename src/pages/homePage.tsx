import React from "react";
import Header from "../components/headerMovieList";
import Grid from "@mui/material/Grid";
import makeStyles from '@mui/styles/makeStyles';
import MovieList from "../components/movieList";
import { MovieT } from '../index'

const useStyles = makeStyles({
  root: {
    padding: "20px",
  },
});

const MovieListPage = ({ movies } : {movies : MovieT[] }) => {
  const classes = useStyles();
   
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Header title={"Home Page"} />
      </Grid>
      <Grid item container spacing={5}>
        <MovieList movies={movies}></MovieList>
      </Grid>
    </Grid>
  );
};
export default MovieListPage;
