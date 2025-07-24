import { NavLink } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useUserProfile } from "../context/UserProfileContext";
import { handleSignOut } from "../utils/supabaseFunctions";

const Navbar = () => {
  const { user } = useUser();
  const { profile } = useUserProfile();

  return (
    <nav>
      {!user ? (
        <ul>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signup">Sign Up</NavLink>
        </ul>
      ) : (
        <div>
          <span>Welcome, {profile?.username || user.email}</span>
          <ul>
            <NavLink to="/user-home">Home</NavLink>
            <NavLink to="/watchlist">Watchlist</NavLink>
            <NavLink to="/search">Search</NavLink>
            <button onClick={() => handleSignOut()}>Sign Out</button>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
