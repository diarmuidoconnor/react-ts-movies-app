import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MoviePage from "./pages/movieDetailsPage";
import HomePage from "./pages/homePage";
import {
  ThemeProvider,
  Theme,
  StyledEngineProvider,
  createTheme,
} from "@mui/material/styles";
declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

const theme = createTheme();

const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/movies/:id" element={<MoviePage />} />
            <Route path="/" element={<HomePage/>} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
