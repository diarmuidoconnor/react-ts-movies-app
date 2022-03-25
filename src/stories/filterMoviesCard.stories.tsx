
import React from "react";
import FilterMoviesCard from "../components/filterMoviesCard";
import { MovieT, FilterValues, FilterOption } from '../types'

export default {
  title: "Home Page/FilterMoviesCard",
  component: FilterMoviesCard,
};

export const Basic = () => {
  const filterValues : FilterValues<FilterOption> = {
    'genre': '',
    'title': ''
  }
  return <FilterMoviesCard filterValues={filterValues } onUserInput={() => {}} />;
};
Basic.storyName = "Default";
