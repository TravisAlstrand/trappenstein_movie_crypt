import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [wantsEmails, setWantsEmails] = useState(false);
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Check for already existing username in profiles table
    const { data: existingUsers, error: usernameError } = await supabase
      .from("profiles")
      .select("id")
      .eq("username", username)
      .maybeSingle();

    if (usernameError) {
      setError("Error checking username.");
      return;
    }

    if (existingUsers) {
      setError("Username is already taken.");
      return;
    }

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      {
        email,
        password,
      }
    );

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    const newUser = signUpData.user;

    if (newUser) {
      const { error: insertError } = await supabase.from("profiles").insert({
        id: newUser.id,
        email,
        username,
        wants_emails: wantsEmails,
      });

      if (insertError) {
        setError("Failed to create profile.");
        return;
      }

      // success! let them know to check their email
      // setMessage("Check your email to confirm your account.");
    }
  };

  return (
    <div>
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {!isLogin && (
          <>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label>
              <input
                type="checkbox"
                checked={wantsEmails}
                onChange={(e) => setWantsEmails(e.target.checked)}
              />
              Receive emails
            </label>
          </>
        )}
        <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Need an account?" : "Already have an account?"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
