import React, {
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
import { Genre, FilterValues, FilterOption } from "../../types";
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
  filterValues: FilterValues<FilterOption>,
  onUserInput: (f: FilterOption, s: string) => void;
}> = ({ filterValues, onUserInput }) => {
  const classes = useStyles();
  const { data, error, status } = useQuery<Genre[], Error>("genres", getGenres);

  if (status === 'loading') {
    return <Spinner />;
  }

  if (status === "error") {
    return <h1>{error?.message}</h1>;
  }
  const genres = data || [];
  if (genres[0].name !== "All") {
    genres.unshift({ id: "0", name: "All" });
  }

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
            value={filterValues.title}
            type="search"
            fullWidth={true}
            variant="filled"
            onChange={(e : ChangeEvent<HTMLInputElement>) => onUserInput('title', e.target.value )}
          />
          <FormControl className={classes.formControl}>
            <InputLabel id="genre-label">Genre</InputLabel>
            <Select
              labelId="genre-label"
              id="genre-select"
              value={filterValues.genre}
              defaultValue={"0"}
              onChange={(e: SelectChangeEvent) => onUserInput('genre', e.target.value  )}
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
