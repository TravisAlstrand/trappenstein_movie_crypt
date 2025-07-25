import { supabase } from "../supabaseClient";

// Get current session
export const getCurrentSession = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session?.user ?? null;
};

// Listen for auth state changes
export const onAuthStateChange = (callback) => {
  const { data: listener } = supabase.auth.onAuthStateChange(
    (_event, session) => {
      callback(session?.user ?? null);
    }
  );
  return listener.subscription;
};

// Sign up user with email and password
export const signUpUser = async (email, password) => {
  return await supabase.auth.signUp({ email, password });
};

// Sign in user with email and password
export const signInUser = async (email, password) => {
  return await supabase.auth.signInWithPassword({ email, password });
};

export const getProfileById = async (userId) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single(); // Use .single() to get one row directly
  return { profile: data, error };
};

export const createProfile = async (profileData) => {
  return supabase.from("profiles").insert(profileData).select("*").single();
  // Return the created profile
};

export const updateProfile = async (id, updates) => {
  return await supabase.from("profiles").update(updates).eq("id", id);
};

// Sign out
export const handleSignOut = async () => {
  await supabase.auth.signOut();
};
