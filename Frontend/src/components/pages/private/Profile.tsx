
{/* <Profile />
show user profile details:
Username
Full name
Email
Avatar (optional)
Option to update name/avatar/email (optional form) */}

import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const Profile = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg-color)] text-[var(--text-color)] px-4">
      <div className="max-w-md w-full bg-[var(--form-bg)] shadow-xl rounded-xl p-6 space-y-4 border border-[var(--border-color)]">
        <h2 className="text-2xl font-bold text-center">👤 Profile</h2>

        {user ? (
          <div className="space-y-2">
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Full Name:</strong> {user.fullname}</p>
            <p><strong>Email:</strong> {user.email}</p>
            {user.avatar && (
              <div className="flex flex-col items-center">
                <p><strong>Avatar:</strong></p>
                <img
                  src={user.avatar}
                  alt="User Avatar"
                  className="w-24 h-24 rounded-full object-cover"
                />
              </div>
            )}
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
