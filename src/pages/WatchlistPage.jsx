import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";

import { getUserWatchlist } from "../utils/supabaseFunctions";

import MovieCard from "../components/MovieCard";

const WatchlistPage = () => {
  const { user } = useContext(UserContext);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  const getWatchlist = async () => {
    const { data, error: watchlistError } = await getUserWatchlist(user.id);
    if (watchlistError) {
      setError(watchlistError.message);
      return;
    } else {
      normalizeMovieData(data);
    }
  };

  const normalizeMovieData = (movieArray) => {
    const retrievedMovies = [];
    movieArray.forEach((movie) => {
      const normalizedMovie = {
        id: movie.movie_id,
        title: movie.movie_title,
        release_date: movie.release_date,
        poster_path: movie.poster_url,
      };
      retrievedMovies.push(normalizedMovie);
    });
    setMovies(retrievedMovies);
  };

  useEffect(() => {
    getWatchlist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (movies.length === 0) {
    return <main>Loading...</main>;
  }

  return (
    <main>
      <h1>Your Watchlist</h1>
      <section>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </section>
    </main>
  );
};

export default WatchlistPage;
