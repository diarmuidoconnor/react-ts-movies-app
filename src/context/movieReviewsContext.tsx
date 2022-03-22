import React, {
    useState,
    ReactNode,
    createContext,
  } from "react";
  import { ReviewCustom } from "../types";
  
  export const MovieReviewsContext = createContext<{
    reviews: ReviewCustom[];
    addReview: ( r: ReviewCustom) => void;
  }>({
    reviews: [],
    addReview: (r) => {}
  });
  
  function MovieReviewsProvider({
    children
  }: {
    children: ReactNode
  }) {
    const [reviews, setReviews] = useState<ReviewCustom[]>([]);
    console.log(reviews)
    const addReview : (r: ReviewCustom) => void = (review) => {
        setReviews( [...reviews,review ] )
      };
  
    return (
      <MovieReviewsContext.Provider
        value={{
          addReview,
          reviews
        }}
      >
        {children}
      </MovieReviewsContext.Provider>
    );
  }
  
  export default MovieReviewsProvider;
  