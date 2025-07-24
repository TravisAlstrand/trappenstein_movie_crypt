import { useState, useEffect } from "react";
import { useUser } from "./UserContext";
import { UserProfileContext } from "./UserProfileContext";
import { getProfileById } from "../utils/supabaseFunctions";

export function UserProfileProvider({ children }) {
  const { user } = useUser();
  const [profile, setProfile] = useState(null);

  const fetchProfile = async () => {
    if (user) {
      const { profile: prof } = await getProfileById(user.id);
      setProfile(prof);
    } else {
      setProfile(null);
    }
  };

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <UserProfileContext.Provider
      value={{ profile, setProfile, refreshProfile: fetchProfile }}
    >
      {children}
    </UserProfileContext.Provider>
  );
}
