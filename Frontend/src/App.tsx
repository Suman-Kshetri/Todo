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
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const currentTheme = theme || "light";
    if (!theme) {
      dispatch(setTheme(currentTheme));
    }
    document.documentElement.setAttribute("data-theme", currentTheme);
  }, [theme, dispatch]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let isMounted = true;

    const checkAuth = async () => {
      try {
        const timeoutPromise = new Promise((_, reject) => {
          timeoutId = setTimeout(() => {
            reject(new Error("Authentication check timeout"));
          }, 5000); 
        });

        const response = await Promise.race([
          getCurrentUser(),
          timeoutPromise
        ]) as any;

        clearTimeout(timeoutId);

        if (!isMounted) return;

        const userData = response?.data?.data || response?.data?.user;
        
        if (userData) {
          console.log("User authenticated successfully");
          dispatch(setUser(userData));
        } else {
          console.log("No user data received");
          dispatch(clearUser());
        }
      } catch (err: any) {
        if (!isMounted) return;

        console.error("Authentication check failed:", err.message);
        
        dispatch(clearUser());
        
        if (err.message === "Authentication check timeout") {
          console.warn("Auth check timed out - proceeding without authentication");
        } else if (err.response?.status === 401) {
          console.log("User not authenticated");
        } else if (err.response?.status === 404) {
          console.error("Auth endpoint not found - check API configuration");
        } else if (err.code === 'ECONNABORTED' || err.code === 'ERR_NETWORK') {
          console.error("Network error - check API URL and connectivity");
        }
      } finally {
        if (isMounted) {
          setAuthChecked(true);
          setLoading(false);
        }
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [dispatch]);

  if (loading || !authChecked) {
    return <Loading />;
  }

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