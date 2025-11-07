import { supabase } from "../supabaseClient";

export const getCurrentSession = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session?.user ?? null;
};

// LISTEN FOR AUTH STATE CHANGES
export const onAuthStateChange = (callback) => {
  const { data: listener } = supabase.auth.onAuthStateChange(
    (_event, session) => {
      callback(session?.user ?? null);
    },
  );
  return listener.subscription;
};

// SIGN UP USER WITH EMAIL AND PASSWORD
export const signUpUser = async (email, password) => {
  return await supabase.auth.signUp({ email, password });
};

// SIGN IN USER WITH EMAIL AND PASSWORD
export const signInUser = async (email, password) => {
  return await supabase.auth.signInWithPassword({ email, password });
};

export const getProfileById = async (userId) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single(); // .single() TO GET ONE ROW
  return { profile: data, error };
};

export const createProfile = async (profileData) => {
  return supabase.from("profiles").insert(profileData).select("*").single();
};

export const updateProfile = async (id, updates) => {
  return await supabase.from("profiles").update(updates).eq("id", id);
};

export const handleSignOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const handleAddMovieToWatchlist = async (movieData) => {
  return await supabase
    .from("watchlists")
    .insert(movieData)
    .select("*")
    .single();
};

export const handleRemoveMovieFromWatchlist = async (userId, movieId) => {
  try {
    // DELETE THE SPECIFIC ROW MATCHING BOTH USER_ID AND MOVIE_ID
    const { data, error } = await supabase
      .from("watchlists")
      .delete()
      .eq("user_id", userId)
      .eq("movie_id", movieId)
      .select(); // SELECT IS OPTIONAL, WILL RETURN DELETED ROW

    if (error) throw error;

    // CHECK IF ANYTHING WAS ACTUALLY DELETED
    if (data && data.length > 0) {
      return data;
    } else {
      console.log("No matching watchlist entry found");
      return null;
    }
  } catch (error) {
    console.error("Error removing movie from watchlist:", error);
    throw error;
  }
};

export const getUserWatchlist = async (userId) => {
  return await supabase
    .from("watchlists")
    .select("movie_id, movie_title, release_date, poster_url, watched")
    .eq("user_id", userId)
    .order("created_at", {
      ascending: false,
    });
};

export const checkIfMovieIsInWatchlist = async (userId, movieId) => {
  try {
    const { data, error } = await supabase
      .from("watchlists")
      .select("movie_id, movie_title, release_date, poster_url, watched")
      .eq("user_id", userId)
      .eq("movie_id", movieId)
      .single();
    if (error) {
      // CHECK IF ERROR IS BECAUSE NO ROW WAS FOUND
      if (error.code === "PGRST116") {
        return null;
      }
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error checking watchlist: ", error);
    throw error;
  }
};
