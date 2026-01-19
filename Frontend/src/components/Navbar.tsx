import React, { useState } from "react";
import ToggleButton from "./ui/ToggleButton";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { logoutUserAPI } from "../features/auth/authAPI";
import { toggleTheme } from "../features/theme/themeSlice";
import { clearUser } from "../features/auth/authSlice";

const activeClass =
  "border-b-2 border-[var(--accent-color)] text-[var(--accent-color)] font-semibold";

const Navbar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
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
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 backdrop-blur-md bg-[var(--navbar-bg)] text-[var(--text-color)] shadow-sm transition-colors duration-300"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="text-2xl font-bold text-[var(--accent-color)]">
        <NavLink to="/">Netly</NavLink>
      </div>

      <div className="flex items-center gap-6">
        {isAuthenticated ? (
          <>
            <span className="text-[var(--text-color)]" aria-live="polite">
              Welcome, <span className="font-semibold">{user?.username}</span>
            </span>

            <button
              aria-label="Logout"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className={`px-4 py-1 rounded bg-gray-600 cursor-pointer hover:bg-red-500 text-white font-semibold transition-colors duration-200 ${
                isLoggingOut ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `font-medium px-2 py-1 transition-colors duration-200 ${
                  isActive ? activeClass : "text-[var(--text-color)] hover:text-[var(--accent-color)]"
                }`
              }
            >
              Sign In
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                `font-medium px-2 py-1 transition-colors duration-200 ${
                  isActive ? activeClass : "text-[var(--text-color)] hover:text-[var(--accent-color)]"
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
