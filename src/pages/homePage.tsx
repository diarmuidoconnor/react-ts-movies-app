import React, { useState, useEffect } from "react";
import Header from "../components/headerMovieList";
import Grid from "@mui/material/Grid";
import { Fab } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import makeStyles from "@mui/styles/makeStyles";
import MovieList from "../components/movieList";
import FilterCard from "../components/filterMoviesCard";
import { MovieT, FilterOption, ListedMovie } from "../types";

// import { EmojiTransportation } from "@mui/icons-material";

const useStyles = makeStyles((theme) =>  ({
  root: {
    padding: "20px",
  },
  fab: {
    marginTop: theme.spacing(8),
    position: "fixed",
    top: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const MovieListPage = () => {
  const classes = useStyles();
  const [movies, setMovies] = useState<ListedMovie[]>([]);
  const [titleFilter, setTitleFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const genreId = Number(genreFilter);

  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(titleFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    });

  const handleChange: (type: FilterOption, value: string) => void = (
    type,
    value
  ) => {
    console.log(typeof genreId)
    if (type === "title") setTitleFilter(value);
    else setGenreFilter(value);
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&page=1`
    )
      .then((res) => res.json())
      .then((json) => {
        // console.log(json);
        return json.results;
      })
      .then((movies) => {
        setMovies(movies);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Header title={"Discover Movies"} />
        </Grid>
        <Grid item container spacing={5}>
          <MovieList movies={displayedMovies}></MovieList>
        </Grid>
      </Grid>
      <Fab
        className={classes.fab}
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
      >
        Filter
      </Fab>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <FilterCard
          onUserInput={handleChange}
          titleFilter={titleFilter}
          genreFilter={genreFilter}
        />
      </Drawer>
    </>
  );
};
export default MovieListPage;
