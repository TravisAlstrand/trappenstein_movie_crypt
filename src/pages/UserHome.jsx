import { Link } from "react-router-dom";

const UserHome = () => {
  return (
    <>
      <h1>UserHome</h1>
      <Link to="/user-settings">User Settings</Link>
    </>
  );
};

export default UserHome;
