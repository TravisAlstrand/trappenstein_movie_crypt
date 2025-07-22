const SignUp = () => {
  return (
    <main>
      <h1>Sign Up</h1>
      <form>
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" id="email" required />
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" id="username" required />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" id="password" required />
        <label htmlFor="wantsEmailUpdates">Receive Email Updates?</label>
        <input
          type="checkbox"
          name="wantsEmailUpdates"
          id="wantsEmailUpdates"
        />
        <button type="submit">Sign Up</button>
      </form>
    </main>
  );
};

export default SignUp;
