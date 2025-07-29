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
import PublicRoute from "./components/PublicRoutes";

const App = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const user = useSelector((state: RootState) => state.auth.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!theme) {
      dispatch(setTheme("light"));
    }
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme, dispatch]);

  useEffect(() => {
    const loadApp = async () => {
      try {
        console.log("Attempting to get current user...");
        const response = await getCurrentUser();
        const userData = response.data.data || response.data.user;
        console.log("getCurrentUser response:", response.data);
        
        if (userData) {
          dispatch(setUser(userData));
        } else {
          console.warn("No user data in response");
          dispatch(clearUser());
        }
      } catch (err: any) {
        console.error("Error loading user:", err);
        
        // Handle different error types
        if (err.response?.status === 401) {
          console.log("User not authenticated (401)");
        } else if (err.response?.status === 404) {
          console.error("Profile endpoint not found (404)");
        } else {
          console.error("Unexpected error:", err.message);
        }
        
        dispatch(clearUser());
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