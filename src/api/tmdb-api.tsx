import {
  ListedMovie,
  MovieT,
  Genre,
  MovieImage,
  ReviewT
} from "../types";

export const getMovies: () => Promise<ListedMovie[]> = () => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Discover endpoint error");
      }
      return response.json();
    })
    .then((json) => {
      const discoerMovies = json.results;
      return discoerMovies;
    })
    .catch((error) => {
      throw error;
    });
};

export const getMovie : ( id : number) => Promise<MovieT> = (id) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`Movie endpoint error - Movie id = ${id} `);
    }
    return response.json();
  })
  .catch((error) => {
    throw error
 });
};

export const getGenres: () => Promise<Genre[]> = () => {
  return fetch(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
      process.env.REACT_APP_TMDB_KEY +
      "&language=en-US"
  )
    .then((res) => res.json() as Promise<{ genres : Genre[] } > )
    .then((json) => {
      return json.genres ;
    })
    .catch((error) => {
      throw error;
    });
};
export const getMovieImages: ( id: number) => Promise<MovieImage[]> = (id) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.REACT_APP_TMDB_KEY}`
  )
    .then((res) => res.json())
    .then((json) => json.posters);
};

export const getMovieReviews: (id: number) => Promise<ReviewT[]> = (id) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_TMDB_KEY}`
  )
    .then((res) => res.json())
    .then((json) => {
      // console.log(json.results);
      return json.results;
    });
};
