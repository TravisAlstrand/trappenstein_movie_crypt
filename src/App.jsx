import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";

// Components
import Navbar from "./components/Navbar";

// Pages
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

import UserHome from "./pages/UserHome";
import UserSettingsPage from "./pages/UserSettingsPage";

import NotFound from "./pages/NotFound";

function App() {
  const { user } = useContext(UserContext);

  return (
    <>
      <Navbar />
      <Routes>
        {/* Variable Home Page */}
        {user ? (
          <Route path="/" element={<Navigate to="/user-home" replace />} />
        ) : (
          <Route path="/" element={<LandingPage />} />
        )}

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Authenticated Routes */}
        <Route path="/user-home" element={<UserHome />} />
        <Route path="/user-settings" element={<UserSettingsPage />} />

        {/* Catch-all for Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
