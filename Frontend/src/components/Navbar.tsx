import React from "react";
import ToggleButton from "./ui/ToggleButton";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { logoutUserAPI } from "../features/auth/authAPI";
import { clearUser } from "../features/auth/authSlice";
import { toggleTheme } from "../features/theme/themeSlice";

const activeClass =
  "border-b-2 border-[var(--accent-color)] text-[var(--accent-color)] font-semibold";

const Navbar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const theme = useSelector((state: RootState) => state.theme.theme);

  const handleLogout = async () => {
    try {
      await logoutUserAPI();
      dispatch(clearUser());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 backdrop-blur-md bg-[var(--navbar-bg)] text-[var(--text-color)] shadow-sm transition-colors duration-300"
    >
      {/* Brand */}
      <div className="text-2xl font-bold text-[var(--accent-color)]">
        <NavLink to="/">Netly</NavLink>
      </div>

      {/* Navigation Links & Auth */}
      <div className="flex items-center gap-6">
        {isAuthenticated ? (
          <>
            <span className="text-[var(--text-color)]">
              Welcome, <span className="font-semibold">{user?.username}</span>
            </span>

            <button
              onClick={handleLogout}
              className="px-4 py-1 rounded bg-[var(--error-color)] cursor-pointer hover:bg-[var(--error-color-hover)] text-white font-semibold transition-colors duration-200"
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
