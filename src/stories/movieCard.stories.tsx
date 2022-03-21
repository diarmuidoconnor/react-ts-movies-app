import React from "react";
import MovieCard from "../components/movieCard";
import { movieListInstance } from "./sampleData";
import { MovieT , ListedMovie} from '../types'

export default {
  title: "Home Page/MovieCard",
  component: MovieCard,
};

export const Basic = () => {
  return (
    <MovieCard
      movie={movieListInstance}
      action={(m: ListedMovie) => <></>  }
    />
  );
};
Basic.storyName = "Default";

export const Exceptional = () => {
  let sampleNoPoster = { ...movieListInstance};
  delete sampleNoPoster.poster_path;
  return (
    <MovieCard
      movie={sampleNoPoster}
      action={(m: ListedMovie) => <></>  }
    />
  );
};
Exceptional.storyName = "exception";