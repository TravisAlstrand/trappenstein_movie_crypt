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

    const searchValue = e.target.search.value.trim().toLowerCase();
    if (searchValue === "") {
      setError("Please provide a search value");
      return;
    }

    setSearchParams({ query: searchValue, page: 1 });
  };

  const handleIncrementPage = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setSearchParams({ query: searchQuery, page: currentPage + 1 });
  };

  const handleDecrementPage = () => {
    if (currentPage > 1) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setSearchParams({ query: searchQuery, page: currentPage - 1 });
    }
  };

  useEffect(() => {
    if (searchQuery) {
      fetchData(encodeURIComponent(searchQuery), currentPage);
    }
  }, [searchQuery, currentPage]);

  return (
    <main className="flex h-full min-h-screen flex-col items-center bg-neutral-800 px-4 py-8 font-montserrat">
      <h1 className="mb-6 font-metal text-5xl text-white md:text-6xl">
        Movie Search
      </h1>
      {/* SEARCH BAR */}
      <form className="mb-8 flex w-full justify-center" onSubmit={handleSubmit}>
        <input
          className="mr-2 w-full rounded-lg bg-neutral-700 px-4 py-2 text-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
          type="search"
          id="search"
          name="search"
          placeholder="Search movies..."
        />
        <button
          className="h-auto w-12 cursor-pointer rounded-lg border-2 border-white bg-neutral-700 transition-all hover:scale-110 hover:bg-neutral-600"
          type="submit"
        >
          🔍
        </button>
      </form>

      {error && <p className="text-red-400">{error}</p>}

      {/* MOVIE RESULTS */}
      <section className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </section>

      {/* PAGINATION */}
      {movies.length > 0 && (
        <section className="text-white">
          <button
            className="w-8 cursor-pointer rounded-lg border-2 border-white bg-neutral-700 transition-all hover:scale-110 hover:bg-neutral-600 hover:text-neutral-200"
            type="button"
            disabled={currentPage === 1}
            onClick={handleDecrementPage}
          >
            &lt;
          </button>
          <span className="mx-4">Page {currentPage}</span>
          <button
            className="w-8 cursor-pointer rounded-lg border-2 border-white bg-neutral-700 transition-all hover:scale-110 hover:bg-neutral-600 hover:text-neutral-200"
            type="button"
            onClick={handleIncrementPage}
          >
            &gt;
          </button>
        </section>
      )}
    </main>
  );
};

export default SearchPage;
