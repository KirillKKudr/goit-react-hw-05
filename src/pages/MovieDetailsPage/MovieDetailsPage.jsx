import { useEffect, useState, useRef } from "react";
import { NavLink, Outlet, useParams, useLocation } from "react-router-dom";
import { getFullDataMovie } from "../../Api/api";
import Loader from "../../components/Loader/Loader";

const MovieDetailsPage = () => {
  const { moviesId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from || "/movies");
  const [fullData, setFullData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Movie ID: ", moviesId);
      const data = await getFullDataMovie(moviesId);
      setFullData(data);
    };

    fetchData();
  }, [moviesId]);

  if (!fullData) return <Loader />;

  return (
    <div>
      <NavLink to={backLinkRef.current}>← Back to movies</NavLink>
      <h1>{fullData.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500/${fullData.poster_path}`}
        alt={fullData.title}
      />
      <p>{fullData.overview}</p>
      <p>Rating: {fullData.popularity}</p>
      <nav>
        <NavLink to="cast">Cast</NavLink>
        <NavLink to="reviews">Reviews</NavLink>
      </nav>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
