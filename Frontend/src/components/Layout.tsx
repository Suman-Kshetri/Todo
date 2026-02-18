import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface LayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { to: "/home", label: "Dashboard" },
  { to: "/home/todos", label: "My Todos" },
  { to: "/home/profile", label: "Profile" },
  { to: "/home/settings", label: "Settings" },
];

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const classStyle = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-150 ${
      isActive
        ? "bg-[var(--accent-color)] text-white shadow-sm"
        : "text-[var(--text-color)] hover:bg-[var(--accent-color-hover)] hover:text-white"
    }`;

  return (
    <div
      className="bg-[var(--bg-color)] text-[var(--text-color)] min-h-screen flex flex-col"
      data-theme={theme}
    >
      <Navbar />

      {/* Dropdown Menu */}
      <div ref={dropdownRef} className="fixed top-[72px] left-5 z-50">
        <button
          type="button"
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-150 active:scale-95"
          style={{
            backgroundColor: "var(--button-bg)",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "var(--button-hover)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "var(--button-bg)")
          }
          id="dropdownDividerButton"
          aria-expanded={dropdownOpen}
          aria-haspopup="true"
        >
          Menu
          <svg
            className={`w-3 h-3 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>

        {dropdownOpen && (
          <div
            className="absolute top-full left-0 mt-2 w-48 rounded-xl shadow-lg border overflow-hidden"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="dropdownDividerButton"
            tabIndex={-1}
            style={{
              backgroundColor: "var(--form-bg)",
              borderColor: "var(--border-color)",
              boxShadow: "0 8px 24px var(--shadow-color)",
            }}
          >
            <ul className="py-1.5 text-sm" role="none">
              {navItems.map(({ to, label }) => (
                <li key={to} role="none" className="px-1.5">
                  <NavLink
                    to={to}
                    end={to === "/home"}
                    className={({ isActive }) => classStyle({ isActive })}
                    onClick={() => setDropdownOpen(false)}
                    role="menuitem"
                    tabIndex={-1}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="flex flex-col items-start pt-[120px] px-6 pb-8 max-w-6xl mx-auto w-full">
        <main className="w-full">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
