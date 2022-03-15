import React, { useState, createContext, FunctionComponent } from "react";
import { ListedMovie, MovieT } from "../types";

export const FavouriteMoviesContext = createContext<{
  favourites: number[];
  addFavourite: (m: ListedMovie) => void;
  removeFavourite: (m: MovieT) => void;
}>({
  favourites: [],
  addFavourite: () => {},
  removeFavourite: () => {},
});

const FavouriteMoviesProvider : FunctionComponent = ( {children} ) => {
  const [favourites, setFavourites] = useState<number[]>([]);

  const addToFavourites : (m: ListedMovie) => void = (movie) => {
    let updatedFavourites = [...favourites];
    if (!favourites.includes(movie.id)) {
      updatedFavourites.push(movie.id);
    }
    setFavourites(updatedFavourites);
  };

  // We will use this function in a later section
  const removeFromFavourites = (movie : MovieT) => {
    setFavourites(favourites.filter((mId) => mId !== movie.id));
  };

  return (
    <FavouriteMoviesContext.Provider
      value={{
        favourites,
        addFavourite: addToFavourites,
        removeFavourite: removeFromFavourites,
      }}
    >
      {children}
    </FavouriteMoviesContext.Provider>
  );
};

export default FavouriteMoviesProvider;
