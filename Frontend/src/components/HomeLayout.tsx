// src/components/HomeLayout.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./pages/private/Dashboard";
import TodoList from "./pages/private/TodoList";
import Profile from "./pages/private/Profile";
import Settings from "./pages/private/Settings";
import NotFoundPage from "./pages/NotFoundPage";

const HomeLayout: React.FC = () => (
  <Layout>
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
