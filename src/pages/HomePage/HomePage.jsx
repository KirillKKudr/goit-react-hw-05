import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../Api/api";
import MoviesList from "../../components/MovieList/MovieList";
import styles from "../HomePage/HomePage.module.css"

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchTrendingMovies();
        setMovies(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <div>
      <MoviesList movies={movies} isLoading={isLoading} />
    </div>
  );
};

export default HomePage;