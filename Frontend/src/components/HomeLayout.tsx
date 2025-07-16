import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./pages/Dashboard";
import TodoList from "./pages/TodoList";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFoundPage from "./pages/NotFoundPage";

interface HomeLayoutProps {
  theme: "light" | "dark";
  onToggle: () => void;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ theme, onToggle }) => (
  <Layout theme={theme} onToggle={onToggle}>
    <Routes>
      <Route path="" element={<Dashboard />} />
      <Route path="todos" element={<TodoList />} />
      <Route path="profile" element={<Profile />} />
      <Route path="settings" element={<Settings />} />
      <Route path="*" element={<NotFoundPage homeRedirectPath="/home" />} />
    </Routes>
  </Layout>
);

export default HomeLayout;
