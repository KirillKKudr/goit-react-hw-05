import { useEffect, useState } from "react";
import { getCast } from "../../Api/api";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import s from "./MovieCast.module.css";

const MovieCast = () => {
  const { moviesId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getMovieCast = async () => {
      setIsLoading(true);
      try {
        const data = await getCast(moviesId);
        setCast(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (moviesId) {
      getMovieCast();
    }
  }, [moviesId]);

  return (
    <div className={s.castRow}>
      {isLoading ? (
        <Loader />
      ) : cast && cast.length > 0 ? (
        cast.map((actor) => (
          <div className={s.actorItem} key={actor.id}>
            {actor.profile_path ? (
              <img
                className={s.actorImage}
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
              />
            ) : (
              <div className={s.noImagePlaceholder}>No Image</div>
            )}
            <p className={s.actorName}>{actor.name}</p>
          </div>
        ))
      ) : (
        <p>No cast available</p>
      )}
    </div>
  );
};

export default MovieCast;
