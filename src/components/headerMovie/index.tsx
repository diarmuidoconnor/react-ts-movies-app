import React, { FunctionComponent } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import makeStyles from "@mui/styles/makeStyles";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import { MovieT } from "../..//types";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    padding: theme.spacing(1.5),
  },
  tagLine: {
    fontSize: "1.5rem",
  },
}));

const MovieHeader: FunctionComponent<{ movie: MovieT }> = ({ movie }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Paper component="div" className={classes.root}>
      <IconButton
        aria-label="go back"
        size="large"
        onClick={() => navigate(-1)}
      >
        <ArrowBackIcon color="primary" fontSize="large" />
      </IconButton>

      <Typography variant="h4" component="h3">
        {movie.title}
        <a href={movie.homepage as string}>
          <HomeIcon color="primary" />
        </a>
        <br />
        <span className={classes.tagLine}>{`   "${movie.tagline}"`} </span>
      </Typography>
      <IconButton
        aria-label="go forward"
        size="large"
        onClick={() => navigate(-1)}
      >
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default MovieHeader;
