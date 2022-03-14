import React from "react";
import MovieDetails from "../components/movieDetails/";
import {useParams} from  'react-router-dom'
import PageTemplate from "../components/templateMoviePage";
import { getMovie } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner'
import { MovieT } from "../types";

const MoviePage = ( ) => {
  const { id } = useParams();
  const movieId = Number(id)
  // const mId = Number(id)
  const { data: movie, error, status } = useQuery<MovieT, Error >(
    ["movie", { id: movieId }],
    () => getMovie(movieId)
  );

  if (status === 'loading') {
    return <Spinner />;
  }

  if (status === 'error') {
    return <h1>{error}</h1>;
  }
  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={movie}>
            <MovieDetails movie={movie} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MoviePage;