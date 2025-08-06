import { useState, useEffect } from "react";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

const SearchPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState("");

  const fetchData = (searchValue, page) => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchValue}&include_adult=false&language=en-US&page=${page}&api_key=${apiKey}`
    )
      .then((res) => res.json())
      .then((res) => {
        const sorted = res.results.sort((a, b) => b.popularity - a.popularity);
        console.log(sorted);
        setMovies(sorted);
      })
      .catch((err) => console.error(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    // RESET PAGE TO 1
    setCurrentPage(1);

    const searchValue = e.target.search.value.trim().toLowerCase();

    // IF THE USER SUBMITS AN EMPTY STRING...
    if (searchValue == "") {
      e.target.search.value = "";
      setError("Please provide a search value");
      return;
    }

    const encodedSearch = encodeURIComponent(searchValue);
    setSearchQuery(encodedSearch);
  };

  const handleIncrementPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleDecrementPage = () => {
    if (currentPage == 1) return;
    setCurrentPage(currentPage - 1);
  };

  // RUN ANY TIME THE USER SUBMITS A SEARCH
  // OR REQUESTS ANOTHER PAGE OF RESULTS
  useEffect(() => {
    fetchData(searchQuery, currentPage);
  }, [searchQuery, currentPage]);

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">Search Movies</label>
        <input
          type="search"
          id="search"
          name="search"
          placeholder="Friday the 13th"
        />
        <button type="submit">Search</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <section>
        {/* MOVIES */}
        {movies.length ? (
          movies.map((movie) => <p key={movie.id}>{movie.title}</p>)
        ) : (
          <></>
        )}
        {/* PAGINATION */}
        {movies.length ? (
          <div>
            {/* DISABLE PREVIOUS BUTTON IF ON FIRST PAGE */}
            {currentPage === 1 ? (
              <button type="button" disabled>
                &lt;
              </button>
            ) : (
              <button type="button" onClick={handleDecrementPage}>
                &lt;
              </button>
            )}
            <button type="button" onClick={handleIncrementPage}>
              &gt;
            </button>
          </div>
        ) : (
          <></>
        )}
      </section>
    </main>
  );
};

export default SearchPage;
