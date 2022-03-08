import React, { FunctionComponent} from "react";
import { ReviewT} from '../../types'

const MovieReview: FunctionComponent<{
    review : ReviewT
}> =  ({ review }) => {
  return (
    <>
      <p>Review By: {review.author} </p>
      <p>{review.content} </p>
    </>
  );
};
export default MovieReview