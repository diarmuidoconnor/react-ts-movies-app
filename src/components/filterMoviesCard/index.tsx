import React, {
  useCallback,
  FunctionComponent,
  ChangeEvent,
} from "react";
import makeStyles from "@mui/styles/makeStyles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Genre, FilterOption } from "../../types";
import { SelectChangeEvent } from "@mui/material";
import { getGenres } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../spinner'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: { height: 300 },

  formControl: {
    margin: theme.spacing(1),
    minWidth: "100%",
    backgroundColor: "rgb(255, 255, 255)",
  },
}));

const FilterMoviesCard: FunctionComponent<{
  titleFilter: string;
  genreFilter: string;
  onUserInput: (f: FilterOption, s: string) => void;
}> = ({ titleFilter, genreFilter, onUserInput }) => {
  const classes = useStyles();
  const { data, error, status } = useQuery<Genre[], Error>("genres", getGenres);

  const handleGenreChange = useCallback((e: SelectChangeEvent): void => {
    e.preventDefault();
    handleChange("genre", e.target.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTextChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    handleChange("title", e.target.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status === 'loading') {
    return <Spinner />;
  }

  if (status === "error") {
    return <h1>{error?.message}</h1>;
  }
  const genres = data || [];

  const handleChange = (type: FilterOption, value: string) => {
    // Completed later
    onUserInput(type, value); // NEW
  };



  return (
    <>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h1">
            <SearchIcon fontSize="large" />
            Filter the movies.
          </Typography>
          <TextField
            className={classes.formControl}
            id="filled-search"
            label="Search field"
            value={titleFilter}
            type="search"
            fullWidth={true}
            variant="filled"
            onChange={handleTextChange}
          />
          <FormControl className={classes.formControl}>
            <InputLabel id="genre-label">Genre</InputLabel>
            <Select
              labelId="genre-label"
              id="genre-select"
              value={genreFilter}
              defaultValue={"0"}
              onChange={handleGenreChange}
            >
              {genres.map((genre) => {
                return (
                  <MenuItem key={genre.id} value={genre.id}>
                    {genre.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </CardContent>
      </Card>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h1">
            <SearchIcon fontSize="large" />
            Sort the movies.
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default FilterMoviesCard;
