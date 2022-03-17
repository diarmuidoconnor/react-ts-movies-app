import React, { FunctionComponent, useState } from "react";
import Fab from "@mui/material/Fab";
import FilterCard from "../filterMoviesCard";
import Drawer from "@mui/material/Drawer";
import makeStyles from "@mui/styles/makeStyles";
import { ListedMovie, MovieT, FilterOption, FilterCondition } from "../../types";

export const titleFilter : FilterCondition<ListedMovie | MovieT> = function (movie, value) {
  return movie.title.toLowerCase().search(value.toLowerCase()) !== -1;
};

export const genreFilter : FilterCondition<ListedMovie> = function (movie, value) {
  const genreId = Number(value);
  return genreId > 0 ? movie.genre_ids.includes(genreId) : true;
};

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

const MovieFilterUI : FunctionComponent<{
    filterInputChange : (f: FilterOption, s: string) => void;
    titleFilter : string,
    genreFilter : string
}> = ({ filterInputChange, titleFilter, genreFilter }) => {
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
          titleFilter={titleFilter}
          genreFilter={genreFilter}
        />
      </Drawer>
    </>
  );
};

export default MovieFilterUI;