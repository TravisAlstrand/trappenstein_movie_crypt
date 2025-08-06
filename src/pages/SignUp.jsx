import { useState } from "react";
import { signUpUser } from "../utils/supabaseFunctions";

const SignUp = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const email = e.target.email.value;
    const password = e.target.password.value;

    // SIGN UP USER
    const { error: signUpError } = await signUpUser(email, password);
    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    setSuccess("Sign up successful! Please check your email to confirm.");
    e.target.reset(); // RESET FORM FIELDS
  };

  return (
    <main>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" id="email" required />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" id="password" required />
        <button type="submit">Sign Up</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </main>
  );
};

export default SignUp;
