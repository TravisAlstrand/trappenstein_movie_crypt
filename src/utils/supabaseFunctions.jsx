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

// Sign out
export const signOut = async () => {
  await supabase.auth.signOut();
};
