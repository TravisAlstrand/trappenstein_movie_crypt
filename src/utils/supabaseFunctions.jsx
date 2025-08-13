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
    }
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
  await supabase.auth.signOut();
};

export const handleAddMovieToWatchlist = async (movieData) => {
  console.log(movieData);
  return await supabase
    .from("watchlists")
    .insert(movieData)
    .select("*")
    .single();
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
