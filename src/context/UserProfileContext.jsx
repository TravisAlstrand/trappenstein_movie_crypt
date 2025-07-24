import { createContext, useContext } from "react";

export const UserProfileContext = createContext({
  profile: null,
  setProfile: () => {},
  refreshProfile: async () => {},
});

export const useUserProfile = () => useContext(UserProfileContext);
