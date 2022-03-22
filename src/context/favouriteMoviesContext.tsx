import React, {
  useState,
  ReactNode,
  createContext,
} from "react";
import { ListedMovie, MovieT } from "../types";

export const FavouriteMoviesContext = createContext<{
  favourites: number[];
  addFavourite: (m: ListedMovie | MovieT) => void;
  removeFavourite: (m: ListedMovie | MovieT) => void;
}>({
  favourites: [],
  addFavourite: (m) => {},
  removeFavourite: () => {},
});

function FavouriteMoviesProvider({
  children
}: {
  children: ReactNode
}) {
  const [favourites, setFavourites] = useState<number[]>([]);

  const addToFavourites = function(movie : ListedMovie | MovieT) {
    let updatedFavourites = [...favourites];
    if (!favourites.includes(movie.id)) {
      updatedFavourites.push(movie.id);
    }
    setFavourites(updatedFavourites);
  };

  // We will use this function in a later section
  const removeFromFavourites = (movie: ListedMovie | MovieT ) => {
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
}

export default FavouriteMoviesProvider;
