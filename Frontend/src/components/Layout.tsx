import React, { useState, useRef, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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

  const currentNavItem = navItems
    .slice()
    .sort((a, b) => b.to.length - a.to.length)
    .find((item) => location.pathname.startsWith(item.to));

  const currentLabel = currentNavItem ? currentNavItem.label : "";

  const classStyle = ({ isActive }: { isActive: boolean }) =>
    `block rounded px-4 py-2 transition-colors duration-200 ${
      isActive
        ? "bg-[var(--accent-color)] text-white"
        : "text-[var(--text-color)] hover:bg-[var(--accent-color-hover)] hover:text-white"
    }`;

  return (
    <div
      className="bg-[var(--bg-color)] text-[var(--text-color)] min-h-screen flex flex-col"
      data-theme={theme}
      style={{ paddingTop: "60px" }}
    >
      <Navbar />

      {/* Fixed Menu button on left with current page label */}
      <div
        ref={dropdownRef}
        className="fixed top-[80px] left-[20px] z-50 flex items-center space-x-3"
        style={{ height: 40 }}
      >
        <button
          type="button"
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="inline-flex items-center rounded-lg cursor-pointer px-5 py-2.5 text-sm font-medium shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 h-full"
          style={{
            backgroundColor: "var(--button-bg)",
            color: "white",
            boxShadow: "0 1px 2px var(--shadow-color)",
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--button-hover)")}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--button-bg)")}
          id="dropdownDividerButton"
          aria-expanded={dropdownOpen}
          aria-haspopup="true"
        >
          Menu
          <svg
            className="w-3 h-3 ml-2"
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

        {/* Current page label */}
        <span className="text-lg font-semibold select-none">{currentLabel}</span>

        {/* Dropdown menu */}
        {dropdownOpen && (
          <div
            className="mt-2 w-44 origin-top-left rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 absolute top-full left-0 transition-colors duration-200"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="dropdownDividerButton"
            tabIndex={-1}
            style={{
              backgroundColor: "var(--form-bg)",
              borderColor: "var(--border-color)",
              color: "var(--text-color)",
            }}
          >
            <ul className="py-2 text-sm" role="none">
              {navItems.map(({ to, label }) => (
                <li key={to} role="none">
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

      {/* Main content */}
      <div className="flex flex-col items-start p-6 space-y-8 max-w-6xl mx-auto w-full">
        <main className="flex-1 w-full p-6 bg-[var(--bg-color)] rounded-lg overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
