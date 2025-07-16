import React from "react";
import ToggleButton from "./ui/ToggleButton";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUserAPI } from "../features/auth/authAPI";
import { clearUser } from "../features/auth/authSlice";

type NavbarProps = {
  theme: "light" | "dark";
  onToggle: () => void;
};

const activeClass = "border-b-2 border-indigo-600 font-semibold";

const Navbar: React.FC<NavbarProps> = ({ theme, onToggle }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const handleLogout = async () => {
    try {
      await logoutUserAPI();
      dispatch(clearUser());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      // Optionally, show toast or alert here
    }
  };
  return (
    <nav
      className={`
    fixed top-[2px] left-0 right-0 z-50
    flex items-center justify-between px-6 py-3 backdrop-blur-md
    ${
      theme === "light"
        ? "bg-white/70 text-[var(--text-color)] shadow-md"
        : "bg-[var(--secondary-color)] text-[var(--text-color)] shadow-lg"
    }
  `}
    >
      {/* App name */}
      <div className="text-2xl font-bold">
        <NavLink to="/">Netly</NavLink>
      </div>
      <div className="flex items-center gap-6">
        {/* Right side actions */}
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

        {/* Theme toggle button */}
        <ToggleButton theme={theme} onToggle={onToggle} />
      </div>
    </nav>
  );
};

export default Navbar;
