import React, { useContext, useState, ChangeEventHandler } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import makeStyles from "@mui/styles/makeStyles";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import { MovieReviewsContext } from "../../context//movieReviewsContext";
import MenuItem from "@mui/material/MenuItem";
import {MovieT, ReviewCustom } from '../../types'
import Snackbar from "@mui/material/Snackbar"; 
import MuiAlert from "@mui/lab/Alert";
import { useNavigate } from 'react-router-dom'

const ratings = [
  {
    value: 5,
    label: "Excellent",
  },
  {
    value: 4,
    label: "Good",
  },
  {
    value: 3,
    label: "Average",
  },
  {
    value: 2,
    label: "Poor",
  },
  {
    value: 0,
    label: "Terrible",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    "& > * ": {
      marginTop: theme.spacing(2),
    },
  },
  textField: {
    width: "40ch",
  },
  submit: {
    marginRight: theme.spacing(2),
  },
  snack: {
    width: "50%",
    "& > * ": {
      width: "100%",
    },
  },
}));

function ReviewForm ({ movie } : { movie : MovieT}) {
  const classes = useStyles();
  const { register, handleSubmit, errors, reset } = useForm();
  const { addReview} = useContext(MovieReviewsContext);
  const [rating, setRating] = useState(3);
  const [open, setOpen] = useState(false);  //NEW
  const navigate = useNavigate()

  const handleRatingChange : ChangeEventHandler<HTMLInputElement> = (event ) => {
    setRating(Number(event.target.value));
  };

  const onSubmit = (review : ReviewCustom) => {
    review.movieId = movie.id;
    review.rating = rating;
    addReview(review)
    setOpen(true);   // NEW
  };

  const handleSnackClose  = () => {     // NEW
    setOpen(false);
    navigate("/movies/favourites");
  };

  return (
    <Box component="div" className={classes.root}>
      <Typography component="h2" variant="h3">
        Write a review
      </Typography>
      <Snackbar
        className={classes.snack}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        onClose={handleSnackClose}
      >
        <MuiAlert
          severity="success"
          variant="filled"
          onClose={handleSnackClose}
        >
          <Typography variant="h4">
            Thank you for submitting a review
          </Typography>
        </MuiAlert>
      </Snackbar>
      <form
        className={classes.form}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <TextField
          className={classes.textField}
          variant="outlined"
          margin="normal"
          required
          id="author"
          label="Author's name"
          name="author"
          autoFocus
          inputRef={register({ required: "Author name required" })}
        />
        {errors.author && (
          <Typography variant="h6" component="p">
            {errors.author.message}
          </Typography>
        )}

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="content"
          label="Review text"
          id="content"
          multiline
          rows={10}
          inputRef={register({
            required: "No review text",
            minLength: { value: 10, message: "Review is too short" },
          })}
        />
        {errors.content && (
          <Typography variant="h6" component="p">
            {errors.content.message}
          </Typography>
        )}
        <TextField
          id="select-rating"
          select
          variant="outlined"
          label="Rating Select"
          value={rating}
          onChange={handleRatingChange}
          helperText="Don't forget your rating"
        >
          {ratings.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
          <Button
            type="reset"
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={() => {
              reset({
                author: "",
                content: "",
              });
            }}
          >
            Reset
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ReviewForm;