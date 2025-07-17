// src/App.tsx
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import { setTheme } from "./features/theme/themeSlice";
import HomeLayout from "./components/HomeLayout";
import LoginPage from "./components/pages/LoginPage";
import SignupPage from "./components/pages/SignupPage";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import NotFoundPage from "./components/pages/NotFoundPage";
import { Toaster } from "sonner";
import { getCurrentUser } from "./features/auth/authAPI";
import { setUser } from "./features/auth/authSlice";

const App = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);

  useEffect(() => {
    // initializing theme from localStorage or default to light
    if (!theme) {
      dispatch(setTheme("light"));
    }
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme, dispatch]);

  useEffect(() => {
    //restoring user auth state on app start
    const fetchUser = async () => {
      try {
        const response = await getCurrentUser();
        dispatch(setUser(response.data.data));
      } catch {
        // Not logged in or session expired
      }
    };
    fetchUser();
  }, [dispatch]);

  return (
    <>
      <Toaster richColors position="top-right" />
      <Router>
        <Routes>
          <Route
            path="/home/*"
            element={
              <ProtectedRoute>
                <HomeLayout />
              </ProtectedRoute>
            }
          />

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

          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
