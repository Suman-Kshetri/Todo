import React, { useState } from "react";
import ToggleButton from "./ui/ToggleButton";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { logoutUserAPI } from "../features/auth/authAPI";
import { toggleTheme } from "../features/theme/themeSlice";
import { clearUser } from "../features/auth/authSlice";

const Navbar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );
  const theme = useSelector((state: RootState) => state.theme.theme);

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      await logoutUserAPI();
      dispatch(clearUser());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 h-16 backdrop-blur-md bg-[var(--navbar-bg)] border-b border-[var(--border-color)] text-[var(--text-color)] transition-colors duration-300"
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Logo */}
      <div className="text-xl font-bold tracking-tight text-[var(--accent-color)]">
        <NavLink to="/" className="hover:opacity-80 transition-opacity">
          Netly
        </NavLink>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {isAuthenticated ? (
          <>
            <span className="hidden sm:flex items-center gap-2 text-sm text-[var(--muted-text-color)]">
              <span
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold text-white"
                style={{ background: "var(--accent-color)" }}
              >
                {user?.username?.[0]?.toUpperCase()}
              </span>
              <span className="font-medium text-[var(--text-color)]">
                {user?.username}
              </span>
            </span>

            <div className="w-px h-5 bg-[var(--border-color)]" />

            <button
              aria-label="Logout"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className={`
                px-3 py-1.5 rounded-lg text-sm font-medium border
                border-[var(--border-color)]
                text-[var(--muted-text-color)]
                hover:border-[var(--error-color)] hover:text-[var(--error-color)] hover:bg-[var(--error-color)]/10
                transition-all duration-150 cursor-pointer
                ${isLoggingOut ? "opacity-40 cursor-not-allowed" : ""}
              `}
            >
              {isLoggingOut ? "Signing out…" : "Sign out"}
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `text-sm font-medium px-3 py-1.5 rounded-lg transition-all duration-150 ${
                  isActive
                    ? "bg-[var(--accent-color)] text-white"
                    : "text-[var(--muted-text-color)] hover:text-[var(--text-color)]"
                }`
              }
            >
              Sign In
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                `text-sm font-medium px-3 py-1.5 rounded-lg border transition-all duration-150 ${
                  isActive
                    ? "bg-[var(--accent-color)] border-[var(--accent-color)] text-white"
                    : "border-[var(--border-color)] text-[var(--text-color)] hover:border-[var(--accent-color)] hover:text-[var(--accent-color)]"
                }`
              }
            >
              Sign Up
            </NavLink>
          </>
        )}

        <ToggleButton theme={theme} onToggle={handleToggleTheme} />
      </div>
    </nav>
  );
};

export default Navbar;
