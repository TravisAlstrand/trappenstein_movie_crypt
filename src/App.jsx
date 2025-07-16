import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

import Navbar from "./components/Navbar";
import AuthForm from "./components/AuthForm";
import MovieSearch from "./components/MovieSearch";
import Watchlist from "./components/Watchlist";
// import LandingPage from "./components/LandingPage";
// import Home from "./components/Home";
// import MovieDetails from "./components/MovieDetails";
// import ReviewRequests from "./components/ReviewRequests";

function App() {
  const [user, setUser] = useState(null);

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

  // const handleLogout = async () => {
  //   await supabase.auth.signOut();
  // };

  if (!user) {
    return <AuthForm onAuthSuccess={() => console.log("Logged in!")} />;
  }

  return (
    <>
      <Navbar user={user} />
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage user={user} />} />
        <Route path="/login" element={<AuthForm onAuthSuccess={() => {}} />} />

        {/* Protected */}
        {user && (
          <>
            <Route path="/home" element={<Home user={user} />} />
            <Route path="/search" element={<MovieSearch user={user} />} />
            <Route path="/watchlist" element={<Watchlist user={user} />} />
            <Route path="/movie/:id" element={<MovieDetails user={user} />} />
            <Route path="/requests" element={<ReviewRequests user={user} />} />
          </>
        )}

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
