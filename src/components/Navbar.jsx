import { NavLink } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useUserProfile } from "../context/UserProfileContext";
import { handleSignOut } from "../utils/supabaseFunctions";

const Navbar = () => {
  const { user } = useUser();
  const { profile } = useUserProfile();

  return (
    <header>
      {user ? (
        <div>
          <img src={profile?.avatar_filename} className="header-avatar-img" />
          <span>Welcome, {profile ? profile.username : user.email}</span>
        </div>
      ) : (
        <></>
      )}
      <nav>
        {!user ? (
          <ul>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
          </ul>
        ) : (
          <ul>
            <NavLink to="/user/home">Home</NavLink>
            <NavLink to="/watchlist">Watchlist</NavLink>
            <NavLink to="/movies/search">Search</NavLink>
            <button onClick={() => handleSignOut()}>Sign Out</button>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
