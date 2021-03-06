import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MoviePage from "./pages/movieDetailsPage";
import HomePage from "./pages/homePage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from "./components/siteHeader";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import {
  ThemeProvider,
  Theme,
  StyledEngineProvider,
  createTheme,
} from "@mui/material/styles";
import FavouriteMoviesProvider from "./context/favouriteMoviesContext";
import AddMovieReviewPage from "./pages//addReviewPage";
import MovieReviewsProvider from "./context/movieReviewsContext";

declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

const theme = createTheme();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <SiteHeader />
            <FavouriteMoviesProvider>
              <MovieReviewsProvider>
                <Routes>
                  <Route
                    path="/reviews/form"
                    element={<AddMovieReviewPage />}
                  />
                  <Route
                    path="/movies/favourites"
                    element={<FavouriteMoviesPage />}
                  />
                  <Route path="/reviews/:id" element={<MovieReviewPage />} />
                  <Route
                    path="/movies/favourites"
                    element={<FavouriteMoviesPage />}
                  />
                  <Route path="/movies/:id" element={<MoviePage />} />
                  <Route path="/" element={<HomePage />} />
                </Routes>
              </MovieReviewsProvider>
            </FavouriteMoviesProvider>
          </BrowserRouter>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
