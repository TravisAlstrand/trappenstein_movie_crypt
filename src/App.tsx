import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import type { User } from "@supabase/supabase-js";

// COMPONENT IMPORTS
import Navbar from "./components/Navbar";
import AuthForm from "./components/AuthForm";

// PAGE IMPORTS
import LandingPage from "./pages/LandingPage";
import UserHome from "./pages/UserHome";
import SearchPage from "./pages/SearchPage";
import WatchlistPage from "./pages/WatchlistPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import ReviewRequestsPage from "./pages/ReviewRequestsPage";

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check current session on load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  if (!user) {
    return <AuthForm onAuthSuccess={() => console.log("Logged in!")} />;
  }

  return (
    <>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<LandingPage user={user} />} />
        <Route path="/login" element={<AuthForm onAuthSuccess={() => {}} />} />
        <Route path="/home" element={<UserHome user={user} />} />
        <Route path="/search" element={<SearchPage user={user} />} />
        <Route path="/watchlist" element={<WatchlistPage user={user} />} />
        <Route path="/movie/:id" element={<MovieDetailsPage user={user} />} />
        <Route path="/requests" element={<ReviewRequestsPage user={user} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
