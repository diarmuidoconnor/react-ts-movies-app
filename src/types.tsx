export interface Genre {
  id: string;
  name: string;
}

export interface MovieT {
  title: string;
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
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
}
//& { [k: string]: string | boolean | object | number };

export type ListedMovie = Omit<MovieT, "genres"> & {
  genre_ids: number[];
  favourite?: boolean;
};
export interface MovieImage {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export type FilterOption = "genre" | "title";

export interface FilteringConfig<T> {
  name : string;
  value: string;
  condition: FilterCondition<T>
}

export type FilterCondition<T> = (entity : T, value : string) => boolean; 
export type FilterValue<T> = Omit<FilteringConfig<T>, 'condition' >;
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
    movie: MovieT
  
}
