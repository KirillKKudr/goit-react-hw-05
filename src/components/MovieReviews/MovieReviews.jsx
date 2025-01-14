import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReviews } from "../../Api/api";
import styles from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { moviesId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getReviews(moviesId);
        setReviews(data); 
      } catch (err) {
        setError("Failed to load reviews.");
      } finally {
        setIsLoading(false);
      }
    };

    if (moviesId) {
      fetchReviews();
    }
  }, [moviesId]);

  return (
    <div className={styles.reviewsContainer}>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : reviews.length === 0 ? (
        <p>No reviews available.</p>
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review.id} className={styles.reviewItem}>
              <h3>{review.author}</h3>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;

