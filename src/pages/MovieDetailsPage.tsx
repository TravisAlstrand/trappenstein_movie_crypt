import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  success: boolean;
};

export default function MovieDetailsPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}`
        );
        const data: Movie = await res.json();
        setMovie(data);
      } catch (err) {
        console.error("Error fetching movie details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!movie || movie.success === false) return <p>Movie not found.</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>{movie.title}</h2>
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
        style={{ borderRadius: "8px", marginBottom: "1rem" }}
      />
      <p>
        <strong>Release Date:</strong> {movie.release_date}
      </p>
      <p>
        <strong>Rating:</strong> {movie.vote_average} / 10
      </p>
      <p>
        <strong>Overview:</strong> {movie.overview}
      </p>
    </div>
  );
}
