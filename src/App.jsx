import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import React, { Suspense } from "react";

const HomePage = React.lazy(() => import("./pages/HomePage/HomePage"));
const NotFoundPage = React.lazy(() => import("./pages/NotFoundPage/NotFoundPage"));
const MoviesPage = React.lazy(() => import("./pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = React.lazy(() => import("./pages/MovieDetailsPage/MovieDetailsPage"));
const MovieCast = React.lazy(() => import("./components/MovieCast/MovieCast"));
const MovieReviews = React.lazy(() => import("./components/MovieReviews/MovieReviews"));

const App = () => {
  return (
    <>
      <Navigation />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:moviesId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
