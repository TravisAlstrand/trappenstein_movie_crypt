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

// Get profile by auth user ID
export const getProfileById = async (id) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();
  return { profile: data, error };
};

// Create a new user profile row
export const createProfile = async ({ username, email, wants_emails }) => {
  return await supabase.from("profiles").insert([
    {
      username,
      email,
      wants_emails,
      is_admin: false,
    },
  ]);
};

// Sign out
export const handleSignOut = async () => {
  await supabase.auth.signOut();
};
