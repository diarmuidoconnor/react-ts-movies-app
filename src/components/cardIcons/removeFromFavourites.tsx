import React, { useContext, MouseEventHandler } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/DeleteForever";
import { FavouriteMoviesContext } from "../../context/favouriteMoviesContext";
import { MovieT } from '../../types'
 
function RemoveFromFavouritesIcon ( { movie } : { movie : MovieT } )  {
  const { removeFavourite } = useContext(FavouriteMoviesContext);

  const handleRemoveFromFavourites : MouseEventHandler<HTMLElement> = 
    (e) => {
     e.preventDefault();
     removeFavourite(movie);
   }
  return (
    <IconButton
      aria-label="remove from favorites"
      onClick={handleRemoveFromFavourites}
    >
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromFavouritesIcon;