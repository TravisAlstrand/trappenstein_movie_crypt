import { useState, useEffect } from "react";
import { UserContext } from "./userContext";
import { getCurrentSession, onAuthStateChange } from "./supabaseFunctions";

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCurrentSession().then(setUser);

    const subscription = onAuthStateChange(setUser);

    return () => subscription.unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
