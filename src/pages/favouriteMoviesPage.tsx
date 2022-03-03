import React, { FunctionComponent } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { ListedMovie } from "../types";

const FavouriteMoviesPage: FunctionComponent = () => {
  const toDo = () => true;
  // Get movies from local storage.
  const movies: ListedMovie[] = JSON.parse(
    localStorage.getItem("favourites") as string
  );

  return (
    <PageTemplate
      title="Favourite Movies"
      movies={movies}
      selectFavourite={toDo}
    />
  );
};

export default FavouriteMoviesPage;
