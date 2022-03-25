import React, { useContext, MouseEventHandler } from "react";
import { FavouriteMoviesContext } from "../../context/favouriteMoviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { ListedMovie } from '../../types'

function AddToFavouritesIcon ({ movie } : { movie : ListedMovie}) {
  const { addFavourite } = useContext(FavouriteMoviesContext);

  const handleAddToFavourites :  MouseEventHandler<HTMLButtonElement> = 
    (e) => {
     e.preventDefault();
     addFavourite(movie);
   }
  
  return (
    <IconButton aria-label="add to favorites" onClick={handleAddToFavourites}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToFavouritesIcon