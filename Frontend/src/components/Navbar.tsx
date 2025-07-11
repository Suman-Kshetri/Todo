import React from "react";
import ToggleButton from "./ui/ToggleButton";
import { NavLink } from "react-router-dom";

type NavbarProps = {
  theme: "light" | "dark";
  onToggle: () => void;
};

const activeClass = "border-b-2 border-indigo-600 font-semibold";

const Navbar: React.FC<NavbarProps> = ({ theme, onToggle }) => {
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

      {/* Right side actions */}
      <div className="flex items-center gap-6">
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

        {/* Theme toggle button */}
        <ToggleButton theme={theme} onToggle={onToggle} />
      </div>
    </nav>
  );
};

export default Navbar;
