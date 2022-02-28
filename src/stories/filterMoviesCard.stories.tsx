
import React from "react";
import FilterMoviesCard from "../components/filterMoviesCard";
import { MovieT } from '../types'

export default {
  title: "Home Page/FilterMoviesCard",
  component: FilterMoviesCard,
};

export const Basic = () => {
  return <FilterMoviesCard titleFilter="" genreFilter="" onUserInput={() => {}} />;
};
Basic.storyName = "Default";
