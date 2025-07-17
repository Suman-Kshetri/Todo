// src/components/Navbar.tsx
import React from "react";
import ToggleButton from "./ui/ToggleButton";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { logoutUserAPI } from "../features/auth/authAPI";
import { clearUser } from "../features/auth/authSlice";
import { toggleTheme } from "../features/theme/themeSlice";

const activeClass = "border-b-2 border-indigo-600 font-semibold";

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
    ${
      theme === "light"
        ? "bg-white/30 text-[var(--text-color)] shadow-sm"
        : "bg-[var(--secondary-color)]/30 text-[var(--text-color)] shadow-sm"
    }
  `}
    >
      <div className="text-2xl font-bold">
        <NavLink to="/">Netly</NavLink>
      </div>
      <div className="flex items-center gap-6">
        {isAuthenticated ? (
          <>
            <span>Welcome, {user?.username}</span>
            <button
              onClick={handleLogout}
              className="font-medium hover:border-b-2 hover:border-indigo-400 cursor-pointer bg-transparent border-none p-0"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `font-medium hover:border-b-2 hover:border-indigo-400 ${
                  isActive ? activeClass : ""
                }`
              }
            >
              Sign In
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                `font-medium hover:border-b-2 hover:border-indigo-400 ${
                  isActive ? activeClass : ""
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
