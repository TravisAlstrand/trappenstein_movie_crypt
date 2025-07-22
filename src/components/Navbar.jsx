import { Link } from "react-router-dom";
import { User } from "@supabase/supabase-js";

export default function Navbar({ user, onSignOut }) {
  if (!user) return null;

  return (
    <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <Link to="/home">Home</Link> | <Link to="/search">Search</Link> |{" "}
      <Link to="/watchlist">Watchlist</Link> |{" "}
      <Link to="/requests">Requests</Link> |{" "}
      <button onClick={onSignOut} style={{ marginLeft: "1rem" }}>
        Sign Out
      </button>
    </nav>
  );
}
