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
    setSearchParams({ query: searchQuery, page: currentPage + 1 });
  };

  const handleDecrementPage = () => {
    if (currentPage > 1) {
      setSearchParams({ query: searchQuery, page: currentPage - 1 });
    }
  };

  useEffect(() => {
    if (searchQuery) {
      fetchData(encodeURIComponent(searchQuery), currentPage);
    }
  }, [searchQuery, currentPage]);

  return (
    <main className="flex h-full flex-col items-center bg-neutral-800 px-4 py-8 font-montserrat">
      {/* SEARCH BAR */}
      <form className="mb-8 flex w-full justify-center" onSubmit={handleSubmit}>
        <input
          className="mr-4 w-64 rounded-full bg-neutral-100 p-2 pl-4"
          type="search"
          id="search"
          name="search"
          placeholder="Search movies..."
        />
        <button
          className="h-auto w-12 rounded-2xl border-2 bg-neutral-700"
          type="submit"
        >
          🔍
        </button>
      </form>

      {error && <p className="text-red-400">{error}</p>}

      {/* MOVIE RESULTS */}
      <section className="grid w-full grid-cols-2 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </section>

      {/* PAGINATION */}
      {movies.length > 0 && (
        <section className="text-white">
          <button
            className="cursor-pointer hover:text-neutral-200"
            type="button"
            disabled={currentPage === 1}
            onClick={handleDecrementPage}
          >
            &lt;
          </button>
          <span className="mx-4">Page {currentPage}</span>
          <button
            className="cursor-pointer hover:text-neutral-200"
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
