import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const Profile = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div
      className="max-h-screen flex items-center justify-center bg-[var(--bg-color)] text-[var(--text-color)]  my-20"
    >
      <div className="max-w-md w-full bg-[var(--form-bg)] shadow-lg rounded-2xl p-8 border border-[var(--border-color)] overflow-auto">
        <h2 className="flex items-center justify-center text-3xl font-extrabold text-center mb-8 tracking-wide text-[var(--text-color)] gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="40px"
            viewBox="0 -960 960 960"
            width="40px"
            fill="#e3e3e3"
          >
            <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" />
          </svg>
          Profile
        </h2>

        {user ? (
          <div className="space-y-8">
            <div className="flex items-center space-x-6">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt="Avatar"
                  className="w-28 h-28 rounded-full object-cover border-4 border-[var(--accent-color)] shadow-md"
                />
              ) : (
                <div className="w-28 h-28 rounded-full bg-[var(--secondary-color)] flex items-center justify-center text-[var(--muted-text-color)] font-semibold text-xl select-none">
                  No Avatar
                </div>
              )}
              <div className="flex flex-col justify-center">
                <p className="text-xl font-semibold">{user.fullname || "Full Name"}</p>
                <p className="text-sm text-[var(--muted-text-color)]">@{user.username}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-[var(--muted-text-color)] uppercase mb-1">
                  Email
                </p>
                <p className="text-base break-words">{user.email}</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-[var(--muted-text-color)] italic">Loading user data...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
