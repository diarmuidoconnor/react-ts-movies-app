import React, { SetStateAction, useContext, FunctionComponent } from "react";
import PageTemplate from "../components/templateMovieListPage";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  movieFilters
} from "../components/movieFilterUI";
import { MovieT, FilterValues, FilterOption } from "../types";
import { FavouriteMoviesContext } from "../context/favouriteMoviesContext"
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromFavourites from "../components/cardIcons/removeFromFavourites";
import WriteReview from "../components/cardIcons/writeReview";

// const titleFiltering: FilteringConfig<MovieT> = {
//   name: "title",
//   value: "",
//   condition: titleFilter,
// };
// const genreFiltering: FilteringConfig<MovieT> = {
//   name: "genre",
//   value: "0",
//   condition: genreFilter,
// };

const FavouriteMoviesPage: FunctionComponent = () => {
  const {favourites: movieIds } = useContext(FavouriteMoviesContext)
  const { filterValues, setFilterValues, filterFunction } = useFiltering<MovieT,FilterOption>(
    [],
    movieFilters
  );

  const favouriteMovieQueries = useQueries<MovieT[]>(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: () => getMovie(movieId),
      };
    })
  );  
  const isLoading = favouriteMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const allFavourites = favouriteMovieQueries.map((q) => (q.data as MovieT));
  const displayMovies = allFavourites
    ? filterFunction(allFavourites)
    : [];

  const changeFilterValues: (t: FilterOption, v: string) => void = (
    type,
    value
  ) => {
    let newfilterValues : SetStateAction<FilterValues<FilterOption>>  = { ...filterValues, [type]: value} ;
    setFilterValues(newfilterValues );
  };
  
  return (
    <>
      <PageTemplate
        title="Favourite Movies"
        movies={displayMovies}
        action={(movie) => {
          return (
            <>
              <RemoveFromFavourites movie={movie} />
              <WriteReview movie={movie} />
            </>
          );
        }}
      />
      <MovieFilterUI
        filterInputChange={changeFilterValues}
        filterValues={filterValues}
      />
    </>
  );
};

export default FavouriteMoviesPage;
