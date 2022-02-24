import React from "react";
import MovieCard from "../components/movieCard";
import SampleMovie from "./sampleData";
import { MovieT } from '../index'

export default {
  title: "Home Page/MovieCard",
  component: MovieCard,
};

export const Basic = () => {
  return (
    <MovieCard
      movie={SampleMovie}
    />
  );
};
Basic.storyName = "Default";

export const Exceptional = () => {
  let sampleNoPoster = { ...SampleMovie};
  delete sampleNoPoster.poster_path;
  return (
    <MovieCard
      movie={sampleNoPoster}
    />
  );
};
Exceptional.storyName = "exception";