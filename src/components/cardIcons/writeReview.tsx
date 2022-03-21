import React from "react";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { MovieT } from '../../types'

function WriteReviewIcon( { movie } :  { movie : MovieT } ) {
  return (
    <RateReviewIcon color="primary" fontSize="large" />
  );
};

export default  WriteReviewIcon;