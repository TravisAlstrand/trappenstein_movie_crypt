import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { handleAddMovieToWatchlist } from "../utils/supabaseFunctions";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const fetchData = () => {
      fetch(
        `https://api.themoviedb.org/3/movie/${id}?language=en-US'&api_key=${apiKey}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setMovie(data);
        })
        .catch((err) => console.error(err));
    };

    fetchData();
  }, [id]);

  const handleAddToWatchlist = async () => {
    const movieData = {
      movie_id: movie.id,
      movie_title: movie.title,
      release_date: movie.release_date,
      poster_url: movie.poster_path,
    };

    const { error: addedError } = await handleAddMovieToWatchlist(movieData);
    if (addedError) {
      setError(addedError.message);
      return;
    }
  };

  if (!movie) {
    return <main>Loading...</main>;
  }

  return (
    <main>
      <img
        src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
        alt={`Movie poster for ${movie.title}`}
      />
      <h1>{movie.title}</h1>
      <p>{movie.release_date.split("-")[0]}</p>
      <p>
        <em>{movie.tagline}</em>
      </p>
      <div>
        {movie.genres.length ? (
          movie.genres.map((genre, index) => (
            <span key={genre.id}>
              {genre.name}
              {index !== movie.genres.length - 1 && " - "}
            </span>
          ))
        ) : (
          <></>
        )}
      </div>
      <p>{movie.overview}</p>
      <button type="button" onClick={handleAddToWatchlist}>
        Add to Watchlist
      </button>
      {error ? <p style={{ color: "red" }}>{error}</p> : <></>}
    </main>
  );
};

export default MovieDetailsPage;
