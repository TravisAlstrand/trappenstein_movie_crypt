const UserSettingsPage = () => {
  return (
    <main>
      <h1>User Settings</h1>
      <p>Manage your user settings here.</p>
      <form>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" />
        <label htmlFor="wantsEmails">Receive Email Updates</label>
        <input type="checkbox" id="wantsEmails" name="wantsEmails" />
      </form>
    </main>
  );
};

export default UserSettingsPage;
