import React, { SetStateAction } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { ListedMovie, FilterValues, FilterOption } from "../types";
import { getMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  movieFilters
} from "../components/movieFilterUI";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";

const MovieListPage = () => {
  const { data, error, status } = useQuery<ListedMovie[], Error>(
    "discover",
    getMovies
  ); 
  const { filterValues, setFilterValues, filterFunction } =
    useFiltering<ListedMovie,FilterOption>([], movieFilters);

  const changeFilterValues: (t: FilterOption, v: string) => void = (
    type,
    value
  ) => {
    let newfilterValues : SetStateAction<FilterValues<FilterOption>>  = { ...filterValues, [type]: value} ;
    setFilterValues(newfilterValues );
  };

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
          return <AddToFavouritesIcon movie={movie} />;
        }}
      />
      <MovieFilterUI
        filterInputChange={changeFilterValues}
        filterValues={filterValues}
      />
    </>
  );
};
export default MovieListPage;
