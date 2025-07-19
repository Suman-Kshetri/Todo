import React from "react";
import ToggleButton from "./ui/ToggleButton";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { logoutUserAPI } from "../features/auth/authAPI";
import { clearUser } from "../features/auth/authSlice";
import { toggleTheme } from "../features/theme/themeSlice";

const activeClass =
  "border-b-2 border-[var(--accent-color)] font-semibold text-[var(--accent-color)]";

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
      className={`
      fixed top-0 left-0 right-0 z-50
      flex items-center justify-between px-6 py-3
      backdrop-blur-lg
      bg-[var(--navbar-bg-light)] dark:bg-[var(--navbar-bg-dark)]
      text-[var(--text-color)]
      shadow-sm
      transition-colors duration-300
    `}
    >
      <div className="text-2xl font-bold text-[var(--accent-color)]">
        <NavLink to="/">Netly</NavLink>
      </div>
      <div className="flex items-center gap-6">
        {isAuthenticated ? (
          <>
            {user?.username ? (
              <span className="text-[var(--text-color)]">
                Welcome, {user.username}
              </span>
            ) : (
              <span className="italic text-[var(--muted-text-color)]">
                Loading user...
              </span>
            )}

            <button
              onClick={handleLogout}
              className="px-4 py-1 rounded bg-[var(--error-color)] hover:bg-[#dc3545] text-white font-semibold transition-colors duration-200 cursor-pointer"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `font-medium hover:border-b-2 hover:border-[var(--accent-color)] hover:text-[var(--accent-color)] transition-colors duration-200 ${
                  isActive ? activeClass : "text-[var(--text-color)]"
                }`
              }
            >
              Sign In
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                `font-medium hover:border-b-2 hover:border-[var(--accent-color)] hover:text-[var(--accent-color)] transition-colors duration-200 ${
                  isActive ? activeClass : "text-[var(--text-color)]"
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
