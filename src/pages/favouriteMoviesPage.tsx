import React, { FunctionComponent } from "react";
import PageTemplate from "../components/templateMovieListPage";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/movieFilterUI";
import { ListedMovie, FilteringConfig, FilterOption } from "../types";

const titleFiltering: FilteringConfig<ListedMovie> = {
  name: "title",
  value: "",
  condition: titleFilter,
};
const genreFiltering: FilteringConfig<ListedMovie> = {
  name: "genre",
  value: "0",
  condition: genreFilter,
};

const FavouriteMoviesPage: FunctionComponent = () => {
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
    [titleFiltering, genreFiltering]
  );
  const toDo = () => true;
  // Get movies from local storage.
  const movies: ListedMovie[] = JSON.parse(
    localStorage.getItem("favourites") as string
  );
  const displayedMovies = filterFunction(movies) 

  const changeFilterValues: (t: FilterOption, v: string) => void = (
    type,
    value
  ) => {
    const newf = { name: type, value: value };
    const newFilters =
      type === "title" ? [newf, filterValues[1]] : [filterValues[0], newf];
    setFilterValues(newFilters);
  };

  return (
    <>
      <PageTemplate
        title="Favourite Movies"
        movies={displayedMovies}
        selectFavourite={toDo}
      />
      <MovieFilterUI
        filterInputChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
    </>
  );
};

export default FavouriteMoviesPage;
