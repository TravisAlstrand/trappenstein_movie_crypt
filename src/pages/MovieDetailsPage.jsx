import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import {
  handleAddMovieToWatchlist,
  checkIfMovieIsInWatchlist,
  handleRemoveMovieFromWatchlist,
} from "../utils/supabaseFunctions";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

const MovieDetailsPage = () => {
  const { user } = useContext(UserContext);

  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState(null);
  const [director, setDirector] = useState(null);
  const [presentInWatchlist, setPresentInWatchlist] = useState(false);
  const [error, setError] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const fetchDetails = async () => {
      const [movieRes, creditsRes] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`),
        fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`,
        ),
      ]);
      const movieData = await movieRes.json();
      const creditsData = await creditsRes.json();
      console.log(creditsData);
      const sortedCast = creditsData?.cast
        ? [...creditsData.cast].sort((a, b) => b.popularity - a.popularity)
        : [];
      const directorData = creditsData?.crew?.find(
        (person) => person.job === "Director",
      );
      setMovie(movieData);
      setCast(sortedCast);
      setDirector(directorData);
    };
    fetchDetails();
  }, [id]);

  useEffect(() => {
    const checkWatchList = async () => {
      if (user && movie) {
        const result = await checkIfMovieIsInWatchlist(user.id, movie.id);
        setPresentInWatchlist(!!result);
      }
    };

    checkWatchList();
  }, [user, movie]);

  const handleAddButton = async () => {
    const movieData = {
      movie_id: movie.id,
      movie_title: movie.title,
      release_date: movie.release_date,
      poster_url: movie.poster_path,
    };

    try {
      const addedData = await handleAddMovieToWatchlist(movieData);
      if (addedData.data) {
        setPresentInWatchlist(true);
      } else if (addedData.error) {
        setError(addedData.error.message);
      }
    } catch (err) {
      setError(err.message);
      return;
    }
  };

  const handleRemoveButton = async () => {
    try {
      const removedData = await handleRemoveMovieFromWatchlist(
        user.id,
        movie.id,
      );
      if (removedData) {
        setPresentInWatchlist(false);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (!movie) {
    return (
      <main className="flex justify-center font-montserrat text-white">
        Loading...
      </main>
    );
  }

  return (
    <main className="mx-auto h-full min-h-screen w-full max-w-7xl bg-neutral-800 font-montserrat text-white">
      {/* Hero Section with Backdrop */}
      <div className="relative mb-12 w-full">
        {/* Backdrop Image with Overlay */}
        <div className="relative h-[400px] w-full overflow-hidden sm:h-[450px] md:h-[500px]">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={`Movie backdrop for ${movie.title}`}
            className="h-full w-full object-cover"
          />
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-linear-to-t from-neutral-800 via-neutral-800/70 to-transparent"></div>
          <div className="absolute inset-0 bg-linear-to-b from-neutral-800/30 via-transparent to-neutral-800"></div>
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-end pb-4 sm:pb-6 md:pb-8">
          <div className="container mx-auto flex w-full flex-col items-center gap-4 px-4 sm:flex-row sm:items-end sm:gap-6 md:gap-8 md:px-8">
            {/* Movie Poster */}
            <div className="shrink-0">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`Movie poster for ${movie.title}`}
                className="h-auto w-32 rounded-lg border-4 border-neutral-700 shadow-2xl transition-transform hover:scale-105 sm:w-36 md:w-64"
              />
            </div>

            {/* Movie Info */}
            <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
              <h1 className="mb-1 font-metal text-2xl drop-shadow-lg sm:mb-2 sm:text-3xl md:text-6xl">
                {movie.title}
              </h1>
              {movie.tagline && (
                <p className="mb-2 text-sm text-gray-300 italic drop-shadow-md sm:text-base md:mb-4 md:text-lg">
                  "{movie.tagline}"
                </p>
              )}
              <div className="mb-2 flex flex-wrap items-center justify-center gap-2 sm:mb-4 sm:justify-start sm:gap-3">
                <span className="rounded-full bg-neutral-900/80 px-3 py-1 text-sm font-bold backdrop-blur-sm sm:px-4 sm:text-base md:text-lg">
                  {movie.release_date.split("-")[0]}
                </span>
                {movie.runtime && (
                  <span className="rounded-full bg-neutral-900/80 px-3 py-1 text-xs backdrop-blur-sm sm:px-4 sm:text-sm">
                    {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                  </span>
                )}
                {movie.vote_average > 0 && (
                  <span className="flex items-center gap-1 rounded-full bg-yellow-600/90 px-3 py-1 text-xs font-bold backdrop-blur-sm sm:px-4 sm:text-sm">
                    ⭐ {movie.vote_average.toFixed(1)}
                  </span>
                )}
              </div>
              <div className="mb-2 flex flex-wrap justify-center gap-1.5 sm:mb-4 sm:justify-start sm:gap-2">
                {movie.genres.length ? (
                  movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="rounded-full border border-neutral-600 bg-neutral-800/80 px-2 py-0.5 text-xs backdrop-blur-sm transition-colors hover:bg-neutral-700 sm:px-3 sm:py-1 sm:text-sm"
                    >
                      {genre.name}
                    </span>
                  ))
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overview and Actions Section */}
      <section className="mb-12 flex flex-col items-center px-4 text-center">
        <div className="mb-6 max-w-4xl rounded-lg bg-neutral-900/50 p-6 shadow-lg">
          <h2 className="mb-3 text-xl font-bold text-gray-300">Overview</h2>
          <p className="leading-relaxed text-gray-200">{movie.overview}</p>
        </div>

        {presentInWatchlist ? (
          <button
            className="cursor-pointer rounded-lg bg-red-600 px-8 py-3 font-semibold shadow-lg shadow-red-900/50 transition-all hover:scale-105 hover:bg-red-700 hover:shadow-red-900/70"
            type="button"
            onClick={handleRemoveButton}
          >
            Remove from Watchlist
          </button>
        ) : (
          <button
            className="cursor-pointer rounded-lg bg-blue-600 px-8 py-3 font-semibold shadow-lg shadow-blue-900/50 transition-all hover:scale-105 hover:bg-blue-700 hover:shadow-blue-900/70"
            type="button"
            onClick={handleAddButton}
          >
            Add to Watchlist
          </button>
        )}

        {error ? (
          <p className="mt-4 rounded-lg bg-red-900/50 px-4 py-2 text-red-300">
            {error}
          </p>
        ) : (
          <></>
        )}
      </section>

      {/* Director Section */}
      {director && (
        <section className="mb-8 flex w-full flex-col items-center px-4">
          <h2 className="mb-4 text-2xl font-bold">Director</h2>
          <div className="flex flex-col items-center">
            <img
              src={
                director.profile_path
                  ? `https://image.tmdb.org/t/p/w185${director.profile_path}`
                  : "https://placehold.co/185x278?text=No+Image"
              }
              alt={director.name}
              className="mb-2 h-40 w-40 rounded-full border-2 border-neutral-700 object-cover shadow-md"
            />
            <span className="text-center text-lg font-semibold">
              {director.name}
            </span>
          </div>
        </section>
      )}

      <section className="mb-16 flex w-full flex-col items-center px-4">
        <h2 className="mb-4 text-2xl font-bold">Cast</h2>
        <div className="relative w-full">
          {/* Scroll indicator - left fade */}
          <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-16 bg-linear-to-r from-neutral-800 to-transparent"></div>

          {/* Scroll indicator - right fade */}
          <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-16 bg-linear-to-l from-neutral-800 to-transparent"></div>

          <div className="scrollbar-thin scrollbar-track-neutral-800 scrollbar-thumb-neutral-600 hover:scrollbar-thumb-neutral-500 overflow-x-auto rounded-lg border-2 border-neutral-700 bg-neutral-900/50 shadow-lg">
            <div
              className="flex gap-6 px-4 py-6"
              style={{ minWidth: "max-content" }}
            >
              {cast?.map((person) => (
                <div
                  key={person.cast_id}
                  className="flex min-w-[140px] flex-col items-center transition-transform hover:scale-105"
                >
                  <img
                    src={
                      person.profile_path
                        ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                        : "https://placehold.co/185x278?text=No+Image"
                    }
                    alt={person.name}
                    className="mb-2 h-32 w-32 rounded-full border-2 border-neutral-700 object-cover shadow-md"
                  />
                  <span className="text-center text-sm font-semibold">
                    {person.name}
                  </span>
                  <span className="text-center text-xs text-gray-400">
                    {person.character}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll hint text */}
          <p className="mt-2 text-center text-xs text-gray-500">
            ← Scroll to see more cast members →
          </p>
        </div>
      </section>
    </main>
  );
};

export default MovieDetailsPage;
