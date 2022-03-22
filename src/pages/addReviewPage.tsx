import React from "react";
import PageTemplate from "../components/templateMoviePage";
import ReviewForm from "../components/reviewForm";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import { AddReviewLocationState, MovieT } from '../types'

const WriteReviewPage = () => {
  const  location = useLocation();
  const { movieId } = location.state as AddReviewLocationState
  const { data: movie, error, status } = useQuery<MovieT, Error >(
    ["movie", { id: movieId }],
    () => getMovie(Number(movieId))
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
    <PageTemplate movie={movie}>
      <ReviewForm movie={movie} />
    </PageTemplate>
          ) : (
            <p>Waiting for movie details</p>
          )}
          </>
  );
};

export default WriteReviewPage;