import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";

// Components
import Navbar from "./components/Navbar/Navbar";

// Pages
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

import UserHome from "./pages/UserHome";
import UserSettingsPage from "./pages/UserSettingsPage/UserSettingsPage";
import WatchlistPage from "./pages/WatchlistPage";
import SearchPage from "./pages/SearchPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";

import NotFound from "./pages/NotFound";

function App() {
  const { user } = useContext(UserContext);

  return (
    <>
      <Navbar />
      <Routes>
        {/* VARIABLE HOME PAGE */}
        {user ? (
          <Route path="/" element={<Navigate to="/user/home" replace />} />
        ) : (
          <Route path="/" element={<LandingPage />} />
        )}

        {/* PUBLIC ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* AUTHENTICATED ROUTES */}
        <Route path="/user/home" element={<UserHome />} />
        <Route path="/user/settings" element={<UserSettingsPage />} />
        <Route path="/user/watchlist" element={<WatchlistPage />} />
        <Route path="/movies/search" element={<SearchPage />} />
        <Route path="/movies/:id/details" element={<MovieDetailsPage />} />

        {/* CATCH-ALL FOR NOT FOUND */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
