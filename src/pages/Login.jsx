import { useState } from "react";
import { signInUser } from "../utils/supabaseFunctions";

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
