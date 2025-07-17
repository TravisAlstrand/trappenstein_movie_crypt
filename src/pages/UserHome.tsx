import { User } from "@supabase/supabase-js";

type UserHomeProps = {
  user: User;
};

const UserHome = ({ user }: UserHomeProps) => {
  return <h1>Welcome, {user.email}!</h1>;
};

export default UserHome;
