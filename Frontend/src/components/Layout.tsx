import React from "react";
import Navbar from "./Navbar";

const Layout = ({ theme, onToggle, children }: { theme: "light" | "dark", onToggle: () => void, children: React.ReactNode }) => {
  return (
    <div>
      <Navbar theme={theme} onToggle={onToggle} />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
