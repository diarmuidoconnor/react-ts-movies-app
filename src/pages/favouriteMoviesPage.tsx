import React, { useContext, FunctionComponent } from "react";
import PageTemplate from "../components/templateMovieListPage";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/movieFilterUI";
import { ListedMovie, MovieT, FilteringConfig, FilterOption } from "../types";
import { FavouriteMoviesContext } from "../context/favouriteMoviesContext"
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
 
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
  const {favourites: movieIds } = useContext(FavouriteMoviesContext)
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
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
  // const displayMovies = allFavourites
  //   ? filterFunction(allFavourites)
  //   : [];

  const toDo = () => true;
  // Get movies from local storage.
  // const movies: ListedMovie[] = JSON.parse(
  //   localStorage.getItem("favourites") as string
  // );
  // const displayedMovies = filterFunction(movies) 

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
        movies={[]}
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
