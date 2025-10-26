import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useUserProfile } from "../context/UserProfileContext";
import { handleSignOut } from "../utils/supabaseFunctions";

import { HiOutlineMenu } from "react-icons/hi";
import { HiOutlineX } from "react-icons/hi";

const Navbar = () => {
  const { user } = useUser();
  const { profile } = useUserProfile();

  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const toggleMenu = () => {
    setMobileNavOpen(!mobileNavOpen);
  };

  // FOR TESTING
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && mobileNavOpen) {
        setMobileNavOpen(false);
      }
    };

    window.addEventListener("keyup", handleEscape);
    return () => window.removeEventListener("keyup", handleEscape);
  }, [mobileNavOpen]);

  return (
    <>
      <header role="banner">
        {user ? (
          <div className="header-welcome">
            <img src={profile?.avatar_filename} className="header-avatar-img" />
            <div>
              <p>Welcome, </p>
              <p className="welcome-name">
                {profile ? profile.username : user.email}
              </p>
            </div>
          </div>
        ) : (
          <></>
        )}
        {/* MOBILE NAV BUTTON */}
        <button
          className="mobile-nav-btn"
          onClick={toggleMenu}
          aria-expanded={mobileNavOpen}
          aria-controls="mobile-menu"
          aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
        >
          {mobileNavOpen ? (
            <HiOutlineX aria-hidden="true" className="nav-btn-icon" />
          ) : (
            <HiOutlineMenu aria-hidden="true" className="nav-btn-icon" />
          )}
        </button>

        {/* DESKTOP NAV */}
        <nav
          className="desktop-nav"
          role="navigation"
          aria-label="Main navigation"
        >
          {!user ? (
            <ul className="desktop-nav-ul">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/signup">Sign Up</NavLink>
            </ul>
          ) : (
            <ul className="desktop-nav-ul">
              <NavLink to="/user/home">Home</NavLink>
              <NavLink to="/user/watchlist">Watchlist</NavLink>
              <NavLink to="/movies/search">Search</NavLink>
              <button onClick={() => handleSignOut()}>Sign Out</button>
            </ul>
          )}
        </nav>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <div
        className={`mobile-menu-overlay ${
          mobileNavOpen ? "not-hidden-flex" : "hidden"
        }`}
        aria-hidden="true"
        onClick={() => setMobileNavOpen(false)}
      />

      {/* MOBILE MENU PANEL */}
      <div
        className={`mobile-menu-panel ${mobileNavOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <nav role="navigation" aria-label="Mobile navigation">
          {!user ? (
            <ul className="mobile-nav-ul">
              <NavLink to="/" onClick={() => setMobileNavOpen(false)}>
                Home
              </NavLink>
              <NavLink to="/login" onClick={() => setMobileNavOpen(false)}>
                Login
              </NavLink>
              <NavLink to="/signup" onClick={() => setMobileNavOpen(false)}>
                Sign Up
              </NavLink>
            </ul>
          ) : (
            <ul className="mobile-nav-ul">
              <NavLink to="/user/home" onClick={() => setMobileNavOpen(false)}>
                Home
              </NavLink>
              <NavLink
                to="/user/watchlist"
                onClick={() => setMobileNavOpen(false)}
              >
                Watchlist
              </NavLink>
              <NavLink
                to="/movies/search"
                onClick={() => setMobileNavOpen(false)}
              >
                Search
              </NavLink>
              <button onClick={() => handleSignOut()}>Sign Out</button>
            </ul>
          )}
        </nav>
      </div>
    </>
  );
};

export default Navbar;
