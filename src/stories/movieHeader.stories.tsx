import React from "react";
import MovieHeader from "../components/headerMovie";
import { sampleMovie} from "./sampleData";

export default {
  title: "Movie Details Page/MovieHeader",
  component: MovieHeader,
};

export const Basic = () => <MovieHeader movie={sampleMovie} />;
Basic.storyName = "Default";