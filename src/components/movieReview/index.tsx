import React from "react";
import { ReviewT } from "../../types";

const MovieReview = ({ review }: { review: ReviewT }) => {
  return (
    <>
      <p>Review By: {review.author} </p>
      <p>{review.content} </p>
    </>
  );
};
export default MovieReview;
