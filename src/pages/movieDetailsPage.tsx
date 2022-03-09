import React from "react";
import MovieDetails from "../components/movieDetails/";
import {useParams} from  'react-router-dom'
import PageTemplate from "../components/templateMoviePage";
import useMovie from "../hooks/useMovie";

const MoviePage = ( ) => {
  const { id } = useParams();
  const mId = Number(id)
  const [movie] = useMovie(mId);  // New

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