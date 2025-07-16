import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

interface LayoutProps {
  theme: "light" | "dark";
  onToggle: () => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ theme, onToggle, children }) => {
  const location = useLocation();
  const isHomeRoute = location.pathname.startsWith("/home");

  const navItemStyle = ({ isActive }: { isActive: boolean }) =>
    `block px-4 py-2 rounded hover:bg-indigo-500 transition ${
      isActive ? "bg-indigo-600 text-white" : "text-[var(--text-color)]"
    }`;

  return (
    <div className={`${theme === "light" ? "bg-white text-black" : "bg-[#121212] text-white"} min-h-screen`}>
      {/* Top Navbar */}
      <Navbar theme={theme} onToggle={onToggle} />

      <div className="flex pt-[70px] min-h-[calc(100vh-70px)]">
        {/* Sidebar: only show if on /home routes */}
        {isHomeRoute && (
          <aside className="w-48 min-h-full bg-[var(--form-bg)] border-r border-[var(--border-color)] px-4 py-6 space-y-2">
            <NavLink to="/home" className={navItemStyle}>Dashboard</NavLink>
            <NavLink to="/home/todos" className={navItemStyle}>My Todos</NavLink>
            <NavLink to="/home/profile" className={navItemStyle}>Profile</NavLink>
            <NavLink to="/home/settings" className={navItemStyle}>Settings</NavLink>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
