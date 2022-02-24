import React from "react";
import MovieDetails from "../components/movieDetails";
import SampleMovie from "./sampleData";
import { MovieT } from '../types'

export default {
  title: "Movie Details Page/MovieDetails",
  component: MovieDetails,
};

export const Basic = () => <MovieDetails movie={SampleMovie} />;
Basic.storyName = "Default";