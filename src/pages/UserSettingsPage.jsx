import { useState } from "react";

import { useUserProfile } from "../context/UserProfileContext";
import { updateProfile } from "../utils/supabaseFunctions";
import { avatarOptions } from "../utils/avatars";

const UserSettingsPage = () => {
  const { profile, refreshProfile } = useUserProfile();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(
    profile ? profile.avatar_filename : null,
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

  if (!profile) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-neutral-800">
        <p className="text-white">Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-800 px-4 py-8 font-montserrat">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-2 text-center font-metal text-4xl text-white">
          Account Settings
        </h1>
        <p className="mb-8 text-center text-gray-400">
          Manage your user settings here.
        </p>
        <form
          onSubmit={handleSubmit}
          className="rounded-lg bg-neutral-900 p-8 shadow-lg"
        >
          <div className="mb-6">
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-medium text-gray-300"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              defaultValue={profile.username}
              className="w-full rounded-lg bg-neutral-700 px-4 py-2 text-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div className="mb-6 flex items-center gap-3">
            <input
              type="checkbox"
              id="wantsEmails"
              name="wantsEmails"
              defaultChecked={profile.wants_emails}
              className="h-5 w-5 rounded bg-neutral-700 text-blue-600 focus:ring-2 focus:ring-blue-600"
            />
            <label htmlFor="wantsEmails" className="text-sm text-gray-300">
              Receive Email Updates
            </label>
          </div>

          <div className="mb-6">
            <label className="mb-4 block text-sm font-medium text-gray-300">
              Choose an Avatar:
            </label>
            <div className="grid grid-cols-4 gap-4">
              {avatarOptions.map((option) => (
                <div
                  key={option.filename}
                  className="flex flex-col items-center gap-2"
                >
                  <img
                    src={option.filename}
                    alt={`Animated image of spoof character ${option.name}`}
                    onClick={() => setSelectedAvatar(option.filename)}
                    className={`h-16 w-16 cursor-pointer rounded-full transition-transform hover:scale-105 ${
                      selectedAvatar === option.filename
                        ? "ring-4 ring-blue-600"
                        : "ring-2 ring-gray-600"
                    }`}
                  />
                  <span className="text-center text-xs text-gray-400">
                    {option.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white shadow-md shadow-neutral-950 transition-all hover:scale-105 hover:bg-blue-700"
          >
            Update Profile
          </button>
          {error && (
            <p className="mt-4 text-center text-sm text-red-400">{error}</p>
          )}
          {success && (
            <p className="mt-4 text-center text-sm text-green-400">{success}</p>
          )}
        </form>
      </div>
    </main>
  );
};

export default UserSettingsPage;
