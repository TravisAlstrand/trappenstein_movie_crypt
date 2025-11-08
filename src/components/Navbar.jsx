import { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useUserProfile } from "../context/UserProfileContext";
import { handleSignOut } from "../utils/supabaseFunctions";

import { HiOutlineMenu } from "react-icons/hi";
import { HiOutlineX } from "react-icons/hi";

const Navbar = () => {
  const { user } = useUser();
  const { profile } = useUserProfile();
  const navigate = useNavigate();

  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const toggleMenu = () => {
    setMobileNavOpen(!mobileNavOpen);
  };

  const signUserOut = async () => {
    const { error } = await handleSignOut();
    if (!error) {
      navigate("/", { replace: true });
    }
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
      <header className="relative z-50 border-b border-neutral-700 bg-linear-to-r from-neutral-900 via-neutral-800 to-neutral-900 px-4 py-3 font-montserrat text-neutral-100 shadow-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {user ? (
            <>
              {/* Left side - User Info */}
              <div className="flex items-center gap-4">
                <Link to={"/user/settings"} className="group">
                  {profile?.avatar_filename ? (
                    <img
                      src={profile?.avatar_filename}
                      className="h-12 w-12 rounded-full border-2 border-blue-500/50 shadow-lg transition-all group-hover:scale-110 group-hover:border-blue-400 md:h-14 md:w-14"
                      alt="User avatar"
                    />
                  ) : (
                    <img
                      src="./avatars/ToastFace.png"
                      className="h-12 w-12 rounded-full border-2 border-blue-500/50 shadow-lg transition-all group-hover:scale-110 group-hover:border-blue-400 md:h-14 md:w-14"
                      alt="User avatar"
                    />
                  )}
                </Link>
                <div className="hidden text-sm sm:block">
                  <p className="text-xs text-gray-400">Welcome back,</p>
                  <p className="font-metal text-base font-medium text-blue-300 md:text-lg">
                    {profile ? profile.username : user.email}
                  </p>
                </div>
              </div>

              {/* Center - Brand Logo */}
              <Link
                to="/user/home"
                className="group absolute left-1/2 -translate-x-1/2"
              >
                <h2 className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text font-metal text-lg font-bold text-transparent transition-all group-hover:from-blue-300 group-hover:to-purple-300 sm:text-xl xl:text-2xl">
                  Trappenstein's Crypt
                </h2>
              </Link>
            </>
          ) : (
            <Link to="/" className="group flex items-center gap-2">
              <h2 className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text font-metal text-xl font-bold text-transparent transition-all group-hover:from-blue-300 group-hover:to-purple-300 md:text-2xl">
                Trappenstein's Crypt
              </h2>
            </Link>
          )}

          {/* Mobile Nav Button */}
          <button
            className="cursor-pointer rounded-lg bg-neutral-700/50 p-2 text-2xl transition-all hover:bg-neutral-600/50 hover:text-blue-300 lg:hidden"
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
              <ul className="flex items-center gap-6">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `font-medium transition-all hover:text-blue-300 ${
                      isActive ? "text-blue-400" : ""
                    }`
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `font-medium transition-all hover:text-blue-300 ${
                      isActive ? "text-blue-400" : ""
                    }`
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    `rounded-lg bg-linear-to-r from-blue-600 to-purple-600 px-6 py-2 font-semibold shadow-lg shadow-blue-900/30 transition-all hover:scale-105 hover:from-blue-700 hover:to-purple-700 hover:shadow-blue-900/50 ${
                      isActive ? "ring-2 ring-blue-400" : ""
                    }`
                  }
                >
                  Sign Up
                </NavLink>
              </ul>
            ) : (
              <ul className="flex items-center gap-6">
                <NavLink
                  to="/user/home"
                  className={({ isActive }) =>
                    `font-medium transition-all hover:text-blue-300 ${
                      isActive ? "text-blue-400" : ""
                    }`
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/user/watchlist"
                  className={({ isActive }) =>
                    `font-medium transition-all hover:text-blue-300 ${
                      isActive ? "text-blue-400" : ""
                    }`
                  }
                >
                  Watchlist
                </NavLink>
                <NavLink
                  to="/movies/search"
                  className={({ isActive }) =>
                    `font-medium transition-all hover:text-blue-300 ${
                      isActive ? "text-blue-400" : ""
                    }`
                  }
                >
                  Search
                </NavLink>
                <button
                  onClick={() => signUserOut()}
                  className="cursor-pointer rounded-lg border border-neutral-600 bg-neutral-800/50 px-5 py-2 font-medium backdrop-blur-sm transition-all hover:scale-105 hover:border-red-500 hover:bg-red-900/30 hover:text-red-300"
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
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
          aria-hidden="true"
          onClick={() => setMobileNavOpen(false)}
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`fixed top-0 right-0 z-50 h-full w-72 transform border-l border-neutral-700 bg-linear-to-b from-neutral-900 to-neutral-800 p-6 font-montserrat shadow-2xl transition-transform duration-300 ease-in-out ${
          mobileNavOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={() => setMobileNavOpen(false)}
          className="absolute top-4 right-4 cursor-pointer rounded-lg bg-neutral-700/50 p-2 text-2xl text-white transition-all hover:bg-neutral-600/50 hover:text-red-400"
          aria-label="Close menu"
        >
          <HiOutlineX />
        </button>

        <nav className="mt-16">
          {!user ? (
            <ul className="flex flex-col gap-4">
              <NavLink
                to="/"
                onClick={() => setMobileNavOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-3 font-medium transition-all hover:bg-neutral-700/50 hover:text-blue-300 ${
                    isActive
                      ? "bg-neutral-700/50 text-blue-400"
                      : "text-neutral-100"
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/login"
                onClick={() => setMobileNavOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-3 font-medium transition-all hover:bg-neutral-700/50 hover:text-blue-300 ${
                    isActive
                      ? "bg-neutral-700/50 text-blue-400"
                      : "text-neutral-100"
                  }`
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                onClick={() => setMobileNavOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg bg-linear-to-r from-blue-600 to-purple-600 px-4 py-3 text-center font-semibold shadow-lg shadow-blue-900/30 transition-all hover:from-blue-700 hover:to-purple-700 ${
                    isActive ? "ring-2 ring-blue-400" : ""
                  }`
                }
              >
                Sign Up
              </NavLink>
            </ul>
          ) : (
            <ul className="flex flex-col gap-4">
              <NavLink
                to="/user/home"
                onClick={() => setMobileNavOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-3 font-medium transition-all hover:bg-neutral-700/50 hover:text-blue-300 ${
                    isActive
                      ? "bg-neutral-700/50 text-blue-400"
                      : "text-neutral-100"
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/user/watchlist"
                onClick={() => setMobileNavOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-3 font-medium transition-all hover:bg-neutral-700/50 hover:text-blue-300 ${
                    isActive
                      ? "bg-neutral-700/50 text-blue-400"
                      : "text-neutral-100"
                  }`
                }
              >
                Watchlist
              </NavLink>
              <NavLink
                to="/movies/search"
                onClick={() => setMobileNavOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-3 font-medium transition-all hover:bg-neutral-700/50 hover:text-blue-300 ${
                    isActive
                      ? "bg-neutral-700/50 text-blue-400"
                      : "text-neutral-100"
                  }`
                }
              >
                Search
              </NavLink>
              <button
                onClick={() => signUserOut()}
                className="cursor-pointer rounded-lg border border-neutral-600 bg-neutral-800/50 px-4 py-3 text-left font-medium text-white transition-all hover:border-red-500 hover:bg-red-900/30 hover:text-red-300"
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
