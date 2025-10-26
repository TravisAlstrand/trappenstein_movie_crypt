import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import MovieCard from "../../components/MovieCard/MovieCard";
import "./SearchPage.css";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("query") || "";
  const currentPage = Number(searchParams.get("page")) || 1;

  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  const fetchData = (searchValue, page) => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchValue}&include_adult=false&language=en-US&page=${page}&api_key=${apiKey}`
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
    <main className="search-page">
      {/* SEARCH BAR */}
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="search"
          id="search"
          name="search"
          placeholder="Search movies..."
        />
        <button type="submit" className="search-btn">
          🔍
        </button>
      </form>

      {error && <p className="error-text">{error}</p>}

      {/* MOVIE RESULTS */}
      <section className="results-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </section>

      {/* PAGINATION */}
      {movies.length > 0 && (
        <div className="pagination">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={handleDecrementPage}
          >
            &lt;
          </button>
          <span>Page {currentPage}</span>
          <button type="button" onClick={handleIncrementPage}>
            &gt;
          </button>
        </div>
      )}
    </main>
  );
};

export default SearchPage;
