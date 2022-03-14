import React, { FunctionComponent} from 'react';
import makeStyles from "@mui/styles/makeStyles";
import CircularProgress from '@mui/material/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: "center",
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

const CircularIndeterminate : FunctionComponent = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress />
      <CircularProgress />
    </div>
  );
}

export default CircularIndeterminate