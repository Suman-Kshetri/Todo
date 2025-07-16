import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { initTheme, toggleTheme } from "./utils/themechange";
import Layout from "./components/Layout";
import HomeLayout from "./components/HomeLayout";
import LoginPage from "./components/pages/LoginPage";
import SignupPage from "./components/pages/SignupPage";
import { Toaster } from "sonner";
import ProtectedRoute from "./components/ProtectedRoute";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./features/auth/authAPI";
import { setUser } from "./features/auth/authSlice";
import PublicRoute from "./components/PublicRoute";
import { Navigate } from "react-router-dom";
import NotFoundPage from "./components/pages/NotFoundPage";

const App = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const dispatch = useDispatch();

  useEffect(() => {
    const initialTheme = initTheme();
    setTheme(initialTheme);

    const fetchUser = async () => {
      try {
        const response = await getCurrentUser();
        const user = response.data.data;
        dispatch(setUser(user)); // restore auth state
      } catch (error) {
        console.log("User not logged in or session expired.");
      }
    };

    fetchUser();
  }, []);

  const handleToggle = () => {
    const newTheme = toggleTheme();
    setTheme(newTheme);
  };

  return (
    <>
      <Toaster richColors position="top-right" />
      <Router>
        <Layout theme={theme} onToggle={handleToggle}>
          <Routes>
            <Route
              path="/home/*" // Note the '*' here to enable nested routes!
              element={
                <ProtectedRoute>
                  <HomeLayout theme={theme} onToggle={handleToggle} />
                </ProtectedRoute>
              }
            />

            {/* public routes */}
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <SignupPage />
                </PublicRoute>
              }
            />

            {/* Redirect root to /login */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* catch all 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
};

export default App;
