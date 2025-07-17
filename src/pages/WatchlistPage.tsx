import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import type { User } from "@supabase/supabase-js";

type WatchlistPageProps = {
  user: User;
};

type WatchlistMovie = {
  id: number;
  movie_title: string;
  poster_url: string;
  watched: boolean;
  user_id: string;
  created_at: string;
};

export default function WatchlistPage({ user }: WatchlistPageProps) {
  const [movies, setMovies] = useState<WatchlistMovie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWatchlist = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("watchlists")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching watchlist:", error.message);
      } else {
        setMovies(data);
      }
      setLoading(false);
    };

    if (user?.id) {
      fetchWatchlist();
    }
  }, [user]);

  const toggleWatched = async (movie: WatchlistMovie) => {
    const { id, watched } = movie;
    const { error } = await supabase
      .from("watchlists")
      .update({ watched: !watched })
      .eq("id", id);

    if (error) {
      console.error("Error updating watched status:", error.message);
    } else {
      // Update state without refetching
      setMovies((prev) =>
        prev.map((m) => (m.id === id ? { ...m, watched: !watched } : m))
      );
    }
  };

  const handleRemove = async (movieId: number) => {
    const { error } = await supabase
      .from("watchlists")
      .delete()
      .eq("id", movieId);

    if (error) {
      console.error("Error removing movie:", error.message);
    } else {
      // Optimistically update the UI
      setMovies((prev) => prev.filter((m) => m.id !== movieId));
    }
  };

  if (loading) return <p>Loading watchlist...</p>;
  if (movies.length === 0) return <p>You haven't added any movies yet.</p>;

  return (
    <div>
      <h2>My Watchlist</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, 150px)",
          gap: "1rem",
        }}
      >
        {movies.map((movie) => (
          <div key={movie.id}>
            {movie.poster_url && (
              <img
                src={movie.poster_url}
                alt={movie.movie_title}
                style={{ width: "100%", borderRadius: "8px" }}
              />
            )}
            <p>{movie.movie_title}</p>
            <button onClick={() => toggleWatched(movie)}>
              {movie.watched
                ? "✓ Watched (Click to Unwatch)"
                : "Mark as Watched"}
            </button>
            <button
              onClick={() => handleRemove(movie.id)}
              style={{ color: "red" }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
