import React, { useState } from "react";
import Fab from "@mui/material/Fab";
import FilterCard from "../filterMoviesCard";
import Drawer from "@mui/material/Drawer";
import makeStyles from "@mui/styles/makeStyles";
import {
  MovieModels,
  Filters,
  FilterOption,
  FilterValues,
  isListedMovie,
} from "../../types";

export const movieFilters: Filters<MovieModels,FilterOption> = {
  title: {
    value: "",
    condition: (movie, value) => {
      return movie.title.toLowerCase().search(value.toLowerCase()) !== -1;
    },
  },
  genre: {
    value: "0",
    condition: (movie, value) => {
      const genreId = Number(value);
      let genres: number[];
      if (isListedMovie(movie)) genres = movie.genre_ids;
      else genres = movie.genres.map((g) => g.id);
      return genreId > 0 ? genres.includes(genreId) : true;
    },
  }
};

// export const titleFilter: FilterCondition<BaseMovie> = function (movie, value) {
//   return movie.title.toLowerCase().search(value.toLowerCase()) !== -1;
// };

// export const genreFilter: FilterCondition<MovieModels> = function (
//   movie,
//   value
// ) {
//   const genreId = Number(value);
//   let genres: number[];
//   if (isListedMovie(movie)) genres = movie.genre_ids;
//   else genres = movie.genres.map((g) => g.id);
//   return genreId > 0 ? genres.includes(genreId) : true;
// };

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#bfbfbf",
  },
  fab: {
    marginTop: theme.spacing(8),
    position: "fixed",
    top: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const MovieFilterUI = ({
  filterInputChange,
  filterValues
}: {
  filterInputChange: (f: FilterOption, s: string) => void;
  filterValues : FilterValues<FilterOption>
}) => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        className={classes.fab}
      >
        Filter
      </Fab>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <FilterCard
          onUserInput={filterInputChange}
          filterValues={filterValues}
        />
      </Drawer>
    </>
  );
};

export default MovieFilterUI;
