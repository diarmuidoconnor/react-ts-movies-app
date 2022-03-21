import React, { useCallback } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { ListedMovie, FilteringConfig, FilterOption } from "../types";
import { getMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/movieFilterUI";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites'

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
 
const MovieListPage = () => {
  const { data, error, status } = useQuery<ListedMovie[], Error>(
    "discover",
    getMovies
  );
  const { filterValues, setFilterValues, filterFunction } = useFiltering<ListedMovie>(
    [],
    [titleFiltering, genreFiltering]
  );

  const changeFilterValues: (t: FilterOption, v: string) => void = useCallback(
    (type, value) => {
      const newf = { name: type, value: value };
      const newFilters =
        type === "title" ? [newf, filterValues[1]] : [filterValues[0], newf];
      setFilterValues(newFilters);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "error") {
    return <h1>{error?.message}</h1>;
  }

  const movies = data || [];
  const displayedMovies = filterFunction(movies);

  return (
    <>
      <PageTemplate<ListedMovie>
        title="Discover Movies"
        movies={displayedMovies}
        action={(movie) => {
          return <AddToFavouritesIcon movie={movie} />
        }}
      />
      <MovieFilterUI
        filterInputChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
    </>
  );
};
export default MovieListPage;
