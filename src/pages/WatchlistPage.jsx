import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";

import { getUserWatchlist } from "../utils/supabaseFunctions";

import MovieCard from "../components/MovieCard";

const WatchlistPage = () => {
  const { user } = useContext(UserContext);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const getWatchlist = async () => {
    const { data, error: watchlistError } = await getUserWatchlist(user.id);
    setLoading(false);
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

  if (loading) {
    return <main className="flex justify-center text-white">Loading...</main>;
  }

  return (
    <main className="h-full min-h-screen bg-neutral-800 font-montserrat">
      <h1 className="py-8 text-center text-4xl text-white">Your Watchlist</h1>
      <section className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </section>
    </main>
  );
};

export default WatchlistPage;
