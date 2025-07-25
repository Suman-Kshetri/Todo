import { useEffect, useState } from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import { setTheme } from "./features/theme/themeSlice";
import HomeLayout from "./components/HomeLayout";
import LoginPage from "./components/pages/LoginPage";
import SignupPage from "./components/pages/SignupPage";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFoundPage from "./components/pages/NotFoundPage";
import { Toaster } from "sonner";
import { getCurrentUser } from "./features/auth/authAPI";
import { clearUser, setUser } from "./features/auth/authSlice";
import Loading from "./components/ui/Loading";
import axios from "axios";
import PublicRoute from "./components/PublicRoutes";

const App = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const user = useSelector((state: RootState) => state.auth.user); // 👈 Get user from auth state
  const [loading, setLoading] = useState(true); // track loading state

  useEffect(() => {
    // Apply theme on mount
    if (!theme) {
      dispatch(setTheme("light"));
    }
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme, dispatch]);

  useEffect(() => {
    const loadApp = async () => {
      try {
        const response = await getCurrentUser();
        dispatch(setUser(response.data.data));
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          // User not authenticated
          dispatch(clearUser());
        }
      } finally {
        setLoading(false);
      }
    };
    loadApp();
  }, [dispatch]);

  if (loading) return <Loading />;

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
          <Route path="/login" element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
            
            } />
          <Route path="/signup" element={
            <PublicRoute>
              <SignupPage />
            </PublicRoute>
            
            } />

          {/* ✅ Conditionally redirect / based on auth state */}
          <Route
            path="/"
            element={<Navigate to={user ? "/home" : "/login"} replace />}
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
