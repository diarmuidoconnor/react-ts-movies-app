import React, { FunctionComponent} from "react";
import { useLocation } from "react-router-dom";
import PageTemplate from "../components/templateMoviePage";
import MovieReview from "../components/movieReview";
import { ReviewLocationState} from '../types'

const MovieReviewPage : FunctionComponent = () => {
  const location = useLocation()
  const { movie, review } = location.state as ReviewLocationState

  return (
    <PageTemplate movie={movie}>
      <MovieReview review={review} />
    </PageTemplate>
  );
};

export default MovieReviewPage;