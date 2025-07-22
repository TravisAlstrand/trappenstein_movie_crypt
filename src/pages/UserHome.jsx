import { User } from "@supabase/supabase-js";

const UserHome = ({ user }) => {
  return <h1>Welcome, {user.email}!</h1>;
};

export default UserHome;
