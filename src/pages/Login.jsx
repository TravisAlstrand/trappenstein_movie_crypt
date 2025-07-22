const Login = () => {
  return (
    <main>
      <h1>Login</h1>
      <form>
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" id="email" required />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" id="password" required />
        <button type="submit">Login</button>
      </form>
    </main>
  );
};

export default Login;
