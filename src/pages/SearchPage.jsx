import { useState } from "react";
import { supabase } from "../supabaseClient";
import { User } from "@supabase/supabase-js";

import MovieCard from "../components/MovieCard";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_SEARCH_URL = "https://api.themoviedb.org/3/search/movie";

export default function SearchPage({ user }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    const res = await fetch(
      `${TMDB_SEARCH_URL}?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
        query
      )}`
    );
    const data = await res.json();
    setResults(data.results || []);
  };

  const addToWatchlist = async (movie) => {
    // Getting the properties needed for the database
    const { id, title: movie_title, poster_path } = movie;
    // Ensuring the movie ID is a string
    const movie_id = id.toString();
    // Getting the poster URL
    const poster_url = poster_path
      ? `https://image.tmdb.org/t/p/w500${poster_path}`
      : null;

    const { error } = await supabase.from("watchlists").insert({
      user_id: user.id,
      movie_id,
      movie_title,
      poster_url,
      watched: false,
    });

    if (error) {
      console.error("Error adding to watchlist:", error.message);
      setStatus("⚠️ Already added or failed.");
    } else {
      setStatus(`✅ Added "${movie_title}" to your watchlist!`);
    }

    setTimeout(() => setStatus(""), 3000);
  };

  return (
    <div>
      <h2>Search Movies</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
        />
        <button type="submit">Search</button>
      </form>

      {status && <p>{status}</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, 150px)",
          gap: "1rem",
        }}
      >
        {results.map((movie) => (
          <div key={movie.id}>
            <MovieCard movie={movie} linkToDetails={true}>
              <button onClick={() => addToWatchlist(movie)}>
                Add to Watchlist
              </button>
            </MovieCard>
          </div>
        ))}
      </div>
    </div>
  );
}
