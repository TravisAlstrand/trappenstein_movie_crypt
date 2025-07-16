import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bhqgdgeodsyzoxofhdkw.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJocWdkZ2VvZHN5em94b2ZoZGt3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1NTM0MTksImV4cCI6MjA2ODEyOTQxOX0.VDL7wfKETlLL4h8_pLCPCdGFA2ySUzvC5bJKufobsY8";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
