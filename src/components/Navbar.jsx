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
      <header className="relative z-50 bg-neutral-900 px-4 py-3 font-montserrat text-neutral-100 shadow-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {user ? (
            <div className="flex items-center gap-4">
              <Link to={"/user/settings"}>
                {profile?.avatar_filename ? (
                  <img
                    src={profile?.avatar_filename}
                    className="h-14 w-14 rounded-full border-2 border-neutral-500 transition-transform hover:scale-105"
                    alt="User avatar"
                  />
                ) : (
                  <img
                    src="./avatars/ToastFace.png"
                    className="h-14 w-14 rounded-full border-2 border-neutral-500 transition-transform hover:scale-105"
                    alt="User avatar"
                  />
                )}
              </Link>
              <div className="text-sm">
                <p className="text-neutral-200">Welcome,</p>
                <p className="font-metal text-lg font-medium">
                  {profile ? profile.username : user.email}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-xl font-bold text-neutral-900">Welcome!</div>
          )}

          {/* Mobile Nav Button */}
          <button
            className="cursor-pointer text-2xl transition-colors hover:text-neutral-300 lg:hidden"
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
                    `transition-colors hover:text-neutral-300 ${
                      isActive ? "text-blue-400" : ""
                    }`
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `transition-colors hover:text-neutral-300 ${
                      isActive ? "text-blue-400" : ""
                    }`
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    `transition-colors hover:text-neutral-300 ${
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
                    `transition-colors hover:text-neutral-300 ${
                      isActive ? "text-blue-400" : ""
                    }`
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/user/watchlist"
                  className={({ isActive }) =>
                    `transition-colors hover:text-neutral-300 ${
                      isActive ? "text-blue-400" : ""
                    }`
                  }
                >
                  Watchlist
                </NavLink>
                <NavLink
                  to="/movies/search"
                  className={({ isActive }) =>
                    `transition-colors hover:text-neutral-300 ${
                      isActive ? "text-blue-400" : ""
                    }`
                  }
                >
                  Search
                </NavLink>
                <button
                  onClick={() => signUserOut()}
                  className="cursor-pointer rounded-lg bg-neutral-800 px-4 py-2 transition-all hover:scale-105 hover:bg-neutral-700"
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
          className="fixed inset-0 z-40 bg-black opacity-50"
          aria-hidden="true"
          onClick={() => setMobileNavOpen(false)}
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`fixed top-0 right-0 z-50 h-full w-64 transform bg-neutral-800 p-6 font-montserrat transition-transform duration-200 ease-in-out ${
          mobileNavOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={() => setMobileNavOpen(false)}
          className="absolute top-4 right-4 cursor-pointer text-2xl text-white transition-colors hover:text-neutral-200"
          aria-label="Close menu"
        >
          <HiOutlineX />
        </button>

        <nav className="mt-12">
          {!user ? (
            <ul className="flex flex-col gap-6">
              <NavLink
                to="/"
                onClick={() => setMobileNavOpen(false)}
                className={({ isActive }) =>
                  `text-neutral-100 transition-colors hover:text-neutral-300 ${
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
                  `text-neutral-100 transition-colors hover:text-neutral-300 ${
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
                  `text-neutral-100 transition-colors hover:text-neutral-300 ${
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
                  `text-neutral-100 transition-colors hover:text-neutral-300 ${
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
                  `text-neutral-100 transition-colors hover:text-neutral-300 ${
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
                  `text-neutral-100 transition-colors hover:text-neutral-300 ${
                    isActive ? "text-blue-400" : ""
                  }`
                }
              >
                Search
              </NavLink>
              <button
                onClick={() => signUserOut()}
                className="cursor-pointer rounded-lg bg-neutral-600 px-4 py-2 text-left text-white transition-colors hover:bg-neutral-500"
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
