import { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import Loader from "../../components/Loader/Loader";
import { fetchMoviesByTitle } from "../../Api/api";
import MoviesList from "../../components/MovieList/MovieList";
import styles from "./MoviesPage.module.css";
import { useSearchParams } from "react-router-dom";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (!query) return;

    const getData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchMoviesByTitle(query);
        console.log(data);
        setMovies(data || []); 
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [query]);

  const onSubmit = (values) => {
    console.log(values);
    if (!values.query) {
      setSearchParams({});
      return;
    }
    setSearchParams({ query: values.query });
  };

  return (
    <div>
      <Formik initialValues={{ query }} onSubmit={onSubmit}>
        <Form className={styles.wrapperFormAction}>
          <Field
            className={styles.inputMovie}
            name="query"
            type="text"
            placeholder="Enter your movie"
          />
          <button className={styles.buttonSearchMovie} type="submit">
            Search movie
          </button>
        </Form>
      </Formik>

      {query && !isLoading && (
        <>
          {movies.length > 0 ? (
            <MoviesList movies={movies} isLoading={isLoading} />
          ) : (
            <p className={styles.notFoundQuery}> No movies found for {query}.</p>
          )}
        </>
      )}

      {isLoading && <Loader />}
    </div>
  );
};

export default MoviesPage;