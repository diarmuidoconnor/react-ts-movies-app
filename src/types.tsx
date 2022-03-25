export interface BaseMovie {
  title: string;
  budget: number;
  homepage: string | undefined;
  id: number;
  imdb_id: string;
  original_language: "en";
  overview: string;
  release_date: string;
  vote_average: number;
  popularity: number;
  poster_path?: string;
  tagline: string;
  runtime: number;
  revenue: number;
  vote_count: number;
  favourite?: boolean;
}
export interface MovieT extends BaseMovie {
  genres: {
    id: number;
    name: string;
  }[];
}

export interface ListedMovie extends BaseMovie {
  genre_ids: number[];
}

export type MovieModels = ListedMovie | MovieT;
export interface MovieImage {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: string;
  vote_average: number;
  vote_count: number;
  width: number;
}
export interface Genre {
  id: string;
  name: string;
}

export enum MovieRatings {
  Excellent = 5,
  Good = 4,
  Average = 3,
  Poor = 2,
  Terrible = 1
}

export type FilterOption = "title" | "genre";
export interface FilteringConfig<T> {
  value: string;
  condition: FilterCondition<T>;
}

export type FilterCondition<T> = (entity: T, value: string) => boolean;

export type FilterValues<A extends string> = {
  [key in A] : string;
}

// Omit<FilteringConfig<T>, "condition">;

export type Filters<Model,O extends string> = {
  [K in O] : FilteringConfig<Model>
}
export interface ReviewT {
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string;
    rating: number | null;
  };
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

export interface ReviewLocationState {
  review: ReviewT;
  movie: MovieT;
}
export interface ReviewCustom {
  movieId: BaseMovie["id"];
  author: string;
  rating: number;
  content: string;
}

export interface AddReviewLocationState {
  movieId: BaseMovie["id"];
}

export const isListedMovie = (movie: MovieModels): movie is ListedMovie => {
  return "genre_ids" in movie;
};

export const isDetailMovie = (movie: MovieModels): movie is MovieT => {
  return "genres" in movie;
};
