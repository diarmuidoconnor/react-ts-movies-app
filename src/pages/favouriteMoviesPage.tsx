import React, { useContext, FunctionComponent } from "react";
import PageTemplate from "../components/templateMovieListPage";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter
} from "../components/movieFilterUI";
import { MovieT, FilteringConfig, FilterOption } from "../types";
import { FavouriteMoviesContext } from "../context/favouriteMoviesContext"
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromFavourites from "../components/cardIcons/removeFromFavourites";
import WriteReview from "../components/cardIcons/writeReview";

const titleFiltering: FilteringConfig<MovieT> = {
  name: "title",
  value: "",
  condition: titleFilter,
};
const genreFiltering: FilteringConfig<MovieT> = {
  name: "genre",
  value: "0",
  condition: function (movie, value) {
    const genreId = Number(value);
    const genre_ids = movie.genres.map((g) => g.id);
    return genreId > 0 ? genre_ids.includes(genreId) : true;
  },
  // condition: genreFilter,
};

const FavouriteMoviesPage: FunctionComponent = () => {
  const {favourites: movieIds } = useContext(FavouriteMoviesContext)
  const { filterValues, setFilterValues, filterFunction } = useFiltering<MovieT>(
    [],
    [titleFiltering, genreFiltering]
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
    const newf = { name: type, value: value };
    const newFilters =
      type === "title" ? [newf, filterValues[1]] : [filterValues[0], newf];
    setFilterValues(newFilters);
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
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
    </>
  );
};

export default FavouriteMoviesPage;
