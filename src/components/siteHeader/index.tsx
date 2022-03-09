import React, { FunctionComponent, MouseEvent , useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

import MenuIcon from "@mui/icons-material/MenuOpen";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import useTheme  from "@mui/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  appbar: {
    // background: 'none',
  },
  offset: theme.mixins.toolbar,
}));

const SiteHeader : FunctionComponent = () => {
  const classes = useStyles();
  const  navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const open = Boolean(anchorEl);
  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Favorites", path: "/movies/favourites" },
    { label: "Option 3", path: "/" },
    { label: "Option 4", path: "/" },
  ];

  const handleMenuSelect : (p : string) => void = (pageURL) => {
    navigate(pageURL);
  };

  const handleMenu : (e: MouseEvent) => void = (event) => {
    setAnchorEl(event.target as Element);
  };

  return ( 
    <>
      <AppBar className={classes.appbar}
      position="fixed" elevation={0} color='primary'> 
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            TMDB Client
          </Typography>
          <Typography variant="h6" className={classes.title}>
            All you ever wanted to know about Movies!
          </Typography>
          {isMobile ? (
            <>
              <IconButton
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                {menuOptions.map((opt) => (
                  <MenuItem
                    key={opt.label}
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <>
              {menuOptions.map((opt) => (
                <Button
                  key={opt.label}
                  color="inherit"
                  onClick={() => handleMenuSelect(opt.path)}
                >
                  {opt.label}
                </Button>
              ))}
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default SiteHeader;