import { useState } from "react";
import { Link } from "react-router-dom";
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

    // SIGN IN USER
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
    <main className="flex min-h-screen items-center justify-center bg-neutral-800 px-4 font-montserrat">
      <div className="w-full max-w-md">
        <h1 className="mb-8 text-center text-3xl font-bold text-white">
          Welcome Back!
        </h1>
        <form
          onSubmit={handleSubmit}
          className="rounded-lg bg-neutral-800 p-8 shadow-lg"
        >
          <div className="mb-6">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-300"
            >
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="w-full rounded-lg bg-neutral-700 px-4 py-2 text-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-300"
            >
              Password:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              className="w-full rounded-lg bg-neutral-700 px-4 py-2 text-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Login
          </button>
          {error && (
            <p className="mt-4 text-center text-sm text-red-400">{error}</p>
          )}
          {success && (
            <p className="mt-4 text-center text-sm text-green-400">{success}</p>
          )}
        </form>
        <p className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:text-blue-300">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
