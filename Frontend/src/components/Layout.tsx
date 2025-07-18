// src/components/Layout.tsx
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isHomeRoute = location.pathname.startsWith("/home");
  const theme = useSelector((state: RootState) => state.theme.theme);

  const classStyle = ({ isActive }: { isActive: boolean }) =>
    `block px-4 py-2 rounded hover:bg-indigo-500 transition ${
      isActive ? "bg-indigo-600 text-white" : "text-[var(--text-color)]"
    }`;

  return (
    <div
      className={`${
        theme === "light" ? "bg-white text-black" : "bg-[#121212] text-white"
      } min-h-screen`}
    >
      <Navbar />
      <div className="flex pt-[70px] min-h-[calc(100vh-70px)]">
        {isHomeRoute && (
          <aside className="w-40 min-h-full bg-[var(--form-bg)] border-r border-[var(--border-color)] px-4 py-6 space-y-2 text-sm">
            <NavLink to="/home" end className={classStyle}>
              Dashboard
            </NavLink>
            <NavLink to="/home/todos" className={classStyle}>
              My Todos
            </NavLink>
            <NavLink to="/home/profile" className={classStyle}>
              Profile
            </NavLink>
            <NavLink to="/home/settings" className={classStyle}>
              Settings
            </NavLink>
          </aside>
        )}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
