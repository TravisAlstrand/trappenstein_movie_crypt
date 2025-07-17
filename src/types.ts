import type { User as SupabaseAuthUser } from "@supabase/supabase-js";

export type User = SupabaseAuthUser;

export type UserProfile = {
  id: string;
  username: string;
  email: string;
  wants_emails: boolean;
  is_admin: boolean;
  created_at: string;
};

export type WatchlistMovie = {
  id: number;
  movie_title: string;
  poster_url: string;
  watched: boolean;
  user_id: string;
  created_at: string;
};

export type Movie = {
  id: number;
  title: string;
  poster_path?: string;
  overview?: string;
  release_date?: string;
};
