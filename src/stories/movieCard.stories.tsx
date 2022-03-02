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
      selectFavourite={(id:number) => {}  }
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
      selectFavourite={(id:number) => {}  }
    />
  );
};
Exceptional.storyName = "exception";