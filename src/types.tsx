export interface Genre {
    id: string;
    name: string;
  }

  export type MovieT = {
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
    popularity: number;
    poster_path?: string;
  } & { [k: string]: string | boolean | object | number };
  
  