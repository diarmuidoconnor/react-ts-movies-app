import React from "react";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { MovieT } from '../../types'
import { Link } from "react-router-dom";

function WriteReviewIcon( { movie } :  { movie : MovieT } ) {
  return (
    <Link
    to={`..//reviews/form`}
      state={ 
        {
          movieId: movie.id,
        }

      } 
  >
    <RateReviewIcon color="primary" fontSize="large" />
    </Link>
  );
};

export default  WriteReviewIcon;