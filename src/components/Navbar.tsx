import { Link } from "react-router-dom";
import type { User } from "@supabase/supabase-js";

type NavbarProps = {
  user: User;
};

export default function Navbar({ user }: NavbarProps) {
  if (!user) return null;

  return (
    <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <Link to="/home">Home</Link> |{""}
      <Link to="/search">Search</Link> |{""}
      <Link to="/watchlist">Watchlist</Link> |{" "}
      <Link to="/requests">Requests</Link>
    </nav>
  );
}
