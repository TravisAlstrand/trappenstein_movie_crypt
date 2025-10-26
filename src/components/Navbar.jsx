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
      <header className="bg-gray-900 px-4 py-3 text-gray-100 shadow-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {user ? (
            <div className="flex items-center gap-4">
              <img
                src={profile?.avatar_filename}
                className="h-12 w-12 rounded-full border-2 border-gray-700"
                alt="User avatar"
              />
              <div className="text-sm">
                <p className="text-gray-400">Welcome,</p>
                <p className="font-medium">
                  {profile ? profile.username : user.email}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-xl font-bold">Logo</div>
          )}

          {/* Mobile Nav Button */}
          <button
            className="text-2xl transition-colors hover:text-gray-300 lg:hidden"
            onClick={toggleMenu}
            aria-expanded={mobileNavOpen}
            aria-controls="mobile-menu"
            aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
          >
            {mobileNavOpen ? <HiOutlineX /> : <HiOutlineMenu />}
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:block">
            {!user ? (
              <ul className="flex items-center gap-8">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `transition-colors hover:text-gray-300 ${
                      isActive ? "text-blue-400" : ""
                    }`
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `transition-colors hover:text-gray-300 ${
                      isActive ? "text-blue-400" : ""
                    }`
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    `transition-colors hover:text-gray-300 ${
                      isActive ? "text-blue-400" : ""
                    }`
                  }
                >
                  Sign Up
                </NavLink>
              </ul>
            ) : (
              <ul className="flex items-center gap-8">
                <NavLink
                  to="/user/home"
                  className={({ isActive }) =>
                    `transition-colors hover:text-gray-300 ${
                      isActive ? "text-blue-400" : ""
                    }`
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/user/watchlist"
                  className={({ isActive }) =>
                    `transition-colors hover:text-gray-300 ${
                      isActive ? "text-blue-400" : ""
                    }`
                  }
                >
                  Watchlist
                </NavLink>
                <NavLink
                  to="/movies/search"
                  className={({ isActive }) =>
                    `transition-colors hover:text-gray-300 ${
                      isActive ? "text-blue-400" : ""
                    }`
                  }
                >
                  Search
                </NavLink>
                <button
                  onClick={() => handleSignOut()}
                  className="rounded-lg bg-gray-800 px-4 py-2 transition-colors hover:bg-gray-700"
                >
                  Sign Out
                </button>
              </ul>
            )}
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileNavOpen && (
        <div
          className="bg-opacity-50 fixed inset-0 z-40 bg-black"
          aria-hidden="true"
          onClick={() => setMobileNavOpen(false)}
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`fixed top-0 right-0 z-50 h-full w-64 transform bg-gray-900 p-6 transition-transform duration-200 ease-in-out ${
          mobileNavOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav>
          {!user ? (
            <ul className="flex flex-col gap-6">
              <NavLink
                to="/"
                onClick={() => setMobileNavOpen(false)}
                className={({ isActive }) =>
                  `text-gray-100 transition-colors hover:text-gray-300 ${
                    isActive ? "text-blue-400" : ""
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/login"
                onClick={() => setMobileNavOpen(false)}
                className={({ isActive }) =>
                  `text-gray-100 transition-colors hover:text-gray-300 ${
                    isActive ? "text-blue-400" : ""
                  }`
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                onClick={() => setMobileNavOpen(false)}
                className={({ isActive }) =>
                  `text-gray-100 transition-colors hover:text-gray-300 ${
                    isActive ? "text-blue-400" : ""
                  }`
                }
              >
                Sign Up
              </NavLink>
            </ul>
          ) : (
            <ul className="flex flex-col gap-6">
              <NavLink
                to="/user/home"
                onClick={() => setMobileNavOpen(false)}
                className={({ isActive }) =>
                  `text-gray-100 transition-colors hover:text-gray-300 ${
                    isActive ? "text-blue-400" : ""
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/user/watchlist"
                onClick={() => setMobileNavOpen(false)}
                className={({ isActive }) =>
                  `text-gray-100 transition-colors hover:text-gray-300 ${
                    isActive ? "text-blue-400" : ""
                  }`
                }
              >
                Watchlist
              </NavLink>
              <NavLink
                to="/movies/search"
                onClick={() => setMobileNavOpen(false)}
                className={({ isActive }) =>
                  `text-gray-100 transition-colors hover:text-gray-300 ${
                    isActive ? "text-blue-400" : ""
                  }`
                }
              >
                Search
              </NavLink>
              <button
                onClick={() => handleSignOut()}
                className="rounded-lg bg-gray-800 px-4 py-2 text-left transition-colors hover:bg-gray-700"
              >
                Sign Out
              </button>
            </ul>
          )}
        </nav>
      </div>
    </>
  );
};

export default Navbar;
