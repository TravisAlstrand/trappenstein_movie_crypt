import { useState } from "react";

import { useUserProfile } from "../context/UserProfileContext";
import { updateProfile } from "../utils/supabaseFunctions";
import { avatarOptions } from "../utils/avatars";

const UserSettingsPage = () => {
  const { profile, refreshProfile } = useUserProfile();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(
    profile ? profile.avatar_filename : null
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { error: updateError } = await updateProfile(profile.id, {
      username: e.target.username.value,
      wants_emails: e.target.wantsEmails.value,
      avatar_filename: selectedAvatar,
    });

    if (updateError) {
      setError(updateError.message);
    } else {
      setSuccess("Profile updated!");
      refreshProfile();
    }
  };

  return (
    <main>
      <h1>User Settings</h1>
      <p>Manage your user settings here.</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          defaultValue={profile.username}
        />
        <label htmlFor="wantsEmails">Receive Email Updates</label>
        <input
          type="checkbox"
          id="wantsEmails"
          name="wantsEmails"
          defaultChecked={profile.wants_emails}
        />
        <label>Choose an Avatar:</label>
        <div>
          {avatarOptions.map((option) => (
            <div key={option.filename}>
              <img
                src={option.filename}
                alt={`Animated image of spoof character ${option.name}`}
                className="avatar-select-img"
                onClick={() => setSelectedAvatar(option.filename)}
              />
              <span>{option.name}</span>
            </div>
          ))}
        </div>
        <button type="submit">Update Profile</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </main>
  );
};

export default UserSettingsPage;
