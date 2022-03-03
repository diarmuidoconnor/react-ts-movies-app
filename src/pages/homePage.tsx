import React, { useState, useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { ListedMovie } from "../types";
import { getMovies } from "../api/tmdb-api";

const MovieListPage = () => {
  const [movies, setMovies] = useState<ListedMovie[]>([]);

  const favourites = movies.filter((m) => m.favourite);
  localStorage.setItem("favourites", JSON.stringify(favourites));

  const addToFavourites: (id: number) => void = (movieId) => {
    const updatedMovies = movies.map((m) =>
      m.id === movieId ? { ...m, favourite: true } : m
    );
    setMovies(updatedMovies);
  };

  useEffect(() => {
    getMovies().then(movies => {
      setMovies(movies);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageTemplate
      title="Discover Movies"
      movies={movies}
      selectFavourite={addToFavourites}
    />
  );
};
export default MovieListPage;
