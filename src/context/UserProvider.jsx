import { useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import {
  getCurrentSession,
  onAuthStateChange,
  getProfileById,
  createProfile,
} from "../utils/supabaseFunctions";

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCurrentSession().then(setUser);

    const subscription = onAuthStateChange(setUser);

    return () => subscription.unsubscribe();
  }, []);

  // CHECK IF USER PROFILE EXISTS AND CREATE IF NOT
  // RUNS WHENEVER USER CHANGES, TO HELP WITH EMAIL CONFIRMATION AUTO LOGINS
  useEffect(() => {
    const createProfileIfNeeded = async () => {
      if (user) {
        try {
          const { error } = await getProfileById(user.id);
          if (error && error.code === "PGRST116") {
            // No rows returned
            const { error: createError } = await createProfile({
              id: user.id, // Explicitly set the ID
              username: user.email.split("@")[0],
              email: user.email,
              wants_emails: false,
            });
            if (createError) {
              console.error("Error creating profile:", createError);
            }
          } else if (error) {
            console.error("Profile fetch error:", error);
          }
        } catch (err) {
          console.error("Unexpected error:", err);
        }
      }
    };
    createProfileIfNeeded();
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
