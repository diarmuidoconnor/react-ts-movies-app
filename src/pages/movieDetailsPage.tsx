import React, {useState, useEffect} from "react";
import MovieDetails from "../components/movieDetails/";
import { MovieT } from '..//types'
import {useParams} from  'react-router-dom'
import { getMovie } from "../api/tmdb-api";
import PageTemplate from "../components/templateMoviePage";

const MoviePage = ( ) => {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieT | undefined>(undefined);

  const mId = Number(id)

  useEffect(() => {
    getMovie(mId).then((movie) => {
      setMovie(movie);
    });
  }, [mId] );

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