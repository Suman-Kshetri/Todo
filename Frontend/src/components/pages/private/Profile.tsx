import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const Profile = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="max-w-xl mx-auto text-[var(--text-color)]">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-[var(--text-color)]">
          Profile
        </h1>
        <p className="text-sm text-[var(--muted-text-color)] mt-1">
          Your account information.
        </p>
      </div>

      <div
        className="rounded-2xl border overflow-hidden"
        style={{
          backgroundColor: "var(--form-bg)",
          borderColor: "var(--border-color)",
        }}
      >
        {/* Banner + Avatar */}
        <div
          className="h-24 w-full"
          style={{
            background:
              "linear-gradient(135deg, var(--accent-color), var(--button-bg))",
            opacity: 0.6,
          }}
        />

        <div className="px-6 pb-6">
          {/* Avatar */}
          <div className="-mt-10 mb-4">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt="Avatar"
                className="w-20 h-20 rounded-2xl object-cover border-4 shadow-md"
                style={{ borderColor: "var(--form-bg)" }}
              />
            ) : (
              <div
                className="w-20 h-20 rounded-2xl border-4 flex items-center justify-center text-2xl font-bold shadow-md"
                style={{
                  borderColor: "var(--form-bg)",
                  backgroundColor: "var(--input-bg)",
                  color: "var(--accent-color)",
                }}
              >
                {user?.username?.[0]?.toUpperCase() ?? "?"}
              </div>
            )}
          </div>

          {user ? (
            <>
              <h2 className="text-lg font-bold text-[var(--text-color)] leading-tight">
                {user.fullname || "Full Name"}
              </h2>
              <p className="text-sm text-[var(--muted-text-color)] mb-6">
                @{user.username}
              </p>

              {/* Info rows */}
              <div
                className="rounded-xl border divide-y"
                style={{ borderColor: "var(--border-color)" }}
              >
                {[
                  { label: "Full Name", value: user.fullname || "—" },
                  { label: "Username", value: `@${user.username}` },
                  { label: "Email", value: user.email },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between px-4 py-3"
                  >
                    <span className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-text-color)]">
                      {label}
                    </span>
                    <span className="text-sm text-[var(--text-color)] font-medium">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-sm text-[var(--muted-text-color)] italic">
              Loading user data…
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
