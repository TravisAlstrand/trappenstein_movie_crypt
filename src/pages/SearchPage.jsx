import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import MovieCard from "../components/MovieCard";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("query") || "";
  const currentPage = Number(searchParams.get("page")) || 1;

  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  const fetchData = (searchValue, page) => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchValue}&include_adult=false&language=en-US&page=${page}&api_key=${apiKey}`,
    )
      .then((res) => res.json())
      .then((res) => {
        const sorted = res.results.sort((a, b) => b.popularity - a.popularity);
        setMovies(sorted);
      })
      .catch((err) => console.error(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const searchValue = e.target.search.value.trim();
    if (searchValue === "") {
      setError("Please provide a search value");
      return;
    }

    setSearchParams({ query: searchValue, page: "1" });
  };

  const handleIncrementPage = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setSearchParams({ query: searchQuery, page: String(currentPage + 1) });
  };

  const handleDecrementPage = () => {
    if (currentPage > 1) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setSearchParams({ query: searchQuery, page: String(currentPage - 1) });
    }
  };

  useEffect(() => {
    if (searchQuery) {
      fetchData(searchQuery, currentPage);
    }
  }, [searchQuery, currentPage]);

  return (
    <main className="mx-auto flex h-full min-h-screen max-w-7xl flex-col items-center bg-linear-to-b from-neutral-900 via-neutral-800 to-neutral-900 px-4 py-12 font-montserrat">
      {/* Header Section */}
      <div className="mb-8 text-center">
        <h1 className="mb-3 bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text font-metal text-5xl text-transparent drop-shadow-lg md:text-6xl">
          Movie Search
        </h1>
        <p className="text-lg text-gray-400">
          Discover your next horror masterpiece
        </p>
      </div>

      {/* SEARCH BAR */}
      <form
        className="mb-12 flex w-full max-w-2xl justify-center gap-3"
        onSubmit={handleSubmit}
      >
        <input
          className="flex-1 rounded-lg border-2 border-neutral-700 bg-neutral-800/50 px-6 py-3 text-white placeholder-gray-500 shadow-lg backdrop-blur-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
          type="search"
          id="search"
          name="search"
          placeholder="Search for movies..."
          defaultValue={searchQuery}
        />
        <button
          className="cursor-pointer rounded-lg bg-linear-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-900/30 transition-all hover:scale-105 hover:from-blue-700 hover:to-purple-700 hover:shadow-blue-900/50"
          type="submit"
        >
          Search
        </button>
      </form>

      {error && (
        <p className="mb-6 rounded-lg bg-red-900/50 px-6 py-3 text-red-300">
          {error}
        </p>
      )}

      {/* Search Query Display */}
      {searchQuery && (
        <div className="mb-8 text-center">
          <p className="text-gray-400">
            Results for:{" "}
            <span className="font-semibold text-blue-300">"{searchQuery}"</span>
          </p>
        </div>
      )}

      {/* MOVIE RESULTS */}
      {movies.length > 0 ? (
        <section className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </section>
      ) : searchQuery ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="mb-2 text-2xl text-gray-400">No results found</p>
          <p className="text-gray-500">Try a different search term</p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="mb-2 text-2xl text-gray-400">Start your search</p>
          <p className="text-gray-500">Enter a movie title above to begin</p>
        </div>
      )}

      {/* PAGINATION */}
      {movies.length > 0 && (
        <section className="mt-12 flex items-center gap-4 text-white">
          <button
            className="cursor-pointer rounded-lg border-2 border-neutral-600 bg-neutral-800/50 px-4 py-2 font-medium backdrop-blur-sm transition-all hover:scale-105 hover:border-blue-500 hover:bg-blue-900/30 hover:text-blue-300 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 disabled:hover:border-neutral-600 disabled:hover:bg-neutral-800/50 disabled:hover:text-white"
            type="button"
            disabled={currentPage === 1}
            onClick={handleDecrementPage}
          >
            Previous
          </button>
          <span className="rounded-lg bg-neutral-800/50 px-6 py-2 font-medium text-blue-300 shadow-lg">
            Page {currentPage}
          </span>
          <button
            className="cursor-pointer rounded-lg border-2 border-neutral-600 bg-neutral-800/50 px-4 py-2 font-medium backdrop-blur-sm transition-all hover:scale-105 hover:border-blue-500 hover:bg-blue-900/30 hover:text-blue-300"
            type="button"
            onClick={handleIncrementPage}
          >
            Next
          </button>
        </section>
      )}
    </main>
  );
};

export default SearchPage;
