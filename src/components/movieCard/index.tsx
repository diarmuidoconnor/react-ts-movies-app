import React, { useContext, MouseEventHandler } from "react";
import makeStyles from "@mui/styles/makeStyles";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import { ListedMovie, MovieT } from "../..//types";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import { FavouriteMoviesContext } from "../../context/favouriteMoviesContext"

const useStyles = makeStyles({
  card: { maxWidth: 345 },
  media: { height: 500 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
});

function MovieCard<T extends ListedMovie | MovieT>({ movie, selectFavourite } : {
  movie: T,
  selectFavourite: (id: number) => void
} )  {
  const classes = useStyles();
  const {favourites, addFavourite } = useContext(FavouriteMoviesContext)

  if (favourites.find((id) => id === movie.id)) {
    movie.favourite = true;
  } else {
    movie.favourite = false
  }
    
  const handleAddToFavourite : MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    addFavourite(movie);
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        // className={classes.header}
        avatar={
          movie.favourite ? (
            <Avatar className={classes.avatar}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
        title={
          <Typography variant="h5" component="p">
            {movie.title}{" "}
          </Typography>
        }
      />
      <CardMedia
        className={classes.media}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : `${process.env.PUBLIC_URL}/assets/film-poster-placeholder.png`
        }
      />
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />
              {movie.release_date}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              {"  "} {movie.vote_average}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favourites"
          
          onClick={handleAddToFavourite}
        >
          <FavoriteIcon color="primary" fontSize="large" />
        </IconButton>

        <Link to={`/movies/${movie.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default MovieCard;
