import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { getMovie } from "../api/tmdb-api";
import { MovieT } from "../types";

const useMovie: (
  id: number
) => [MovieT | undefined, Dispatch<SetStateAction<MovieT | undefined>>] = (
  id
) => {
  const [movie, setMovie] = useState<MovieT | undefined>(undefined);
  useEffect(() => {
    getMovie(id).then((movie) => {
      setMovie(movie);
    });
  }, [id]);
  return [movie, setMovie];
};

export default useMovie;
