import { useState } from "react";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

const SearchPage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const searchValue = e.target.search.value.trim().toLowerCase();

    // IF THE USER SUBMITS AN EMPTY STRING...
    if (searchValue == "") {
      e.target.search.value = "";
      setError("Please provide a search value");
      return;
    }

    const encodedSearch = encodeURIComponent(searchValue);

    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodedSearch}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`
    )
      .then((res) => res.json())
      .then((res) => {
        const sorted = res.results.sort((a, b) => b.popularity - a.popularity);
        console.log(sorted);
        setMovies(sorted);
      })
      .catch((err) => console.error(err));
  };

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
        {movies.length ? (
          movies.map((movie) => <p key={movie.id}>{movie.title}</p>)
        ) : (
          <></>
        )}
      </section>
    </main>
  );
};

export default SearchPage;
