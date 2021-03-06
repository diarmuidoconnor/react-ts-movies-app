import React, { FunctionComponent } from "react";
import MovieHeader from "../headerMovie";
import Grid from "@mui/material/Grid";
import makeStyles from "@mui/styles/makeStyles";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getMovieImages } from "../../api/tmdb-api";
import { MovieT, MovieImage } from "../../types";
import { useQuery } from "react-query";
import Spinner from '../spinner'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(7),
  },
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

const TemplateMoviePage: FunctionComponent<{
  movie: MovieT;
}> = ({ movie, children }) => {
  const classes = useStyles();
  const id = movie.id
  const { data: images , error, status } = useQuery<MovieImage[], Error>(
    ["images", id ],
    () => getMovieImages(id)
  );
  if (status === 'loading') {
    return <Spinner />;
  }

  if (status === 'error') {
    return <h1>{error}</h1>;
  }

  return (
    <div className={classes.root}>
      <MovieHeader movie={movie} />

      <Grid container spacing={5} style={{ padding: "15px" }}>
        <Grid item xs={3}>
          <div className={classes.gridListRoot}>
            <ImageList className={classes.gridList} cols={1}>
              {images?.map((image) => (
                <ImageListItem key={image.file_path} cols={1}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                    alt={""}
                  />
                </ImageListItem>
              )) ?? {}}
            </ImageList>
          </div>
        </Grid>

        <Grid item xs={9}>
          {children}
        </Grid>
      </Grid>
    </div>
  );
};

export default TemplateMoviePage;
