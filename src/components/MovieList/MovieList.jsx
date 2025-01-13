import { NavLink, useLocation } from "react-router-dom";
import Loader from "../Loader/Loader";
import styles from "./MovieList.module.css";

const MoviesList = ({ movies, isLoading }) => {
  const location = useLocation();

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <ul className={styles.movies}>
          {movies
            .filter((item) => item.poster_path)
            .map((item) => (
              <li key={item.id} className={styles.movieItem}>
                <NavLink
                  to={`/movies/${item.id}`}
                  state={{ from: location }}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt={item.title}
                  />
                </NavLink>
                <h3>{item.title}</h3>
                <p>
                  Release:{" "}
                  {item.release_date ? item.release_date : "Date unknown"}
                </p>
                <p>
                  Vote average: {item.vote_average ? item.vote_average : "N/A"}
                </p>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default MoviesList;


