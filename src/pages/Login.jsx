import { useState } from "react";
import {
  signInUser,
  getProfileById,
  createProfile,
} from "../utils/supabaseFunctions";

const Login = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const email = e.target.email.value;
    const password = e.target.password.value;

    // Sign in user
    const { data, error: signInError } = await signInUser(email, password);
    if (signInError) {
      setError(signInError.message);
      return;
    }

    const user = data?.user;
    if (!user) {
      setError("No user found.");
      return;
    }

    // Check if profile exists
    const { profile } = await getProfileById(user.id);
    if (!profile) {
      // Create profile if it doesn't exist using email prefix as default username
      const { error: profileError } = await createProfile({
        username: email.split("@")[0],
        email: user.email,
      });
      if (profileError) {
        setError(profileError.message);
        return;
      }
    }

    setSuccess("Login successful!");
    e.target.reset();
  };

  return (
    <main>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" id="email" required />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" id="password" required />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </main>
  );
};

export default Login;
