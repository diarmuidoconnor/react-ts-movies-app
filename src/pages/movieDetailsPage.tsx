import React, {useState, useEffect} from "react";
import MovieHeader from "../components/headerMovie/";
import MovieDetails from "../components/movieDetails/";
import Grid from "@mui/material/Grid";
import makeStyles from '@mui/styles/makeStyles';
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { MovieT , MovieImage} from '..//types'
import {useParams} from  'react-router-dom'
import { getMovie, getMovieImages } from "../api/tmdb-api";

const useStyles = makeStyles((theme) => ({
  gridListRoot: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  gridList: {
    width: 450,
    height: "100vh",
  },
}));

const MoviePage = ( ) => {
  const classes = useStyles();
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieT | undefined>(undefined);
  const [images, setImages] = useState<MovieImage[]>([]);

  useEffect(() => {
    getMovie(id as string).then((movie) => {
      setMovie(movie);
    });
  }, [id]);

  useEffect(() => {
    getMovieImages(id as string ).then((images) => {
      setImages(images);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {movie ? (
        <>
          <MovieHeader movie={movie} />
          <Grid container spacing={5} style={{ padding: "15px" }}>
            <Grid item xs={3}>
              <div className={classes.gridListRoot}>
                <ImageList
                  className={classes.gridList}
                  cols={1}
                >
                  {images.map((image) => (
                    <ImageListItem
                      key={image.file_path}
                      cols={1}
                    >
                      <img alt={" "}
                        src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </div>
            </Grid>
            <Grid item xs={9}>
              <MovieDetails movie={movie} />
            </Grid>
          </Grid>
        </>
      ) : (
        <h2>Waiting for API data</h2>
      )}
    </>
  );
};

export default MoviePage;