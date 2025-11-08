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
    return (
      <main className="flex min-h-screen items-center justify-center bg-linear-to-b from-neutral-900 via-neutral-800 to-neutral-900 font-montserrat">
        <div className="text-center">
          <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-xl text-gray-300">Loading your watchlist...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto flex h-full min-h-screen max-w-7xl flex-col items-center bg-linear-to-b from-neutral-900 via-neutral-800 to-neutral-900 px-4 py-12 font-montserrat">
      {/* Header Section */}
      <div className="mb-8 text-center">
        <h1 className="mb-3 bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text font-metal text-5xl text-transparent drop-shadow-lg md:text-6xl">
          Your Watchlist
        </h1>
        <p className="text-lg text-gray-400">
          {movies.length > 0
            ? `${movies.length} ${movies.length === 1 ? "movie" : "movies"} waiting for you`
            : "Your collection of movies to watch"}
        </p>
      </div>

      {error && (
        <div className="mb-8 w-full max-w-2xl rounded-lg bg-red-900/50 px-6 py-4 text-center text-red-300">
          {error}
        </div>
      )}

      {/* Movie Grid */}
      {movies.length > 0 ? (
        <section className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </section>
      ) : (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="mb-6 rounded-2xl border-2 border-neutral-700 bg-neutral-900/50 p-12 text-center shadow-2xl">
            <p className="mb-2 text-3xl">🎬</p>
            <p className="mb-3 text-2xl font-semibold text-gray-300">
              Your watchlist is empty
            </p>
            <p className="mb-6 text-gray-400">
              Start adding movies you want to watch!
            </p>
            <a
              href="/movies/search"
              className="inline-block rounded-lg bg-linear-to-r from-blue-600 to-purple-600 px-8 py-3 font-semibold text-white shadow-lg shadow-blue-900/30 transition-all hover:scale-105 hover:from-blue-700 hover:to-purple-700 hover:shadow-blue-900/50"
            >
              Search Movies
            </a>
          </div>
        </div>
      )}
    </main>
  );
};

export default WatchlistPage;
