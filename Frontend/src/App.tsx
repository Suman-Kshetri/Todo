import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import { setUser } from "./features/auth/authSlice";
import Loading from "./components/ui/Loading";

const App = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);
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
        console.error("Failed to load current user:", err);
      }finally{
        setTimeout(() => setLoading(false), 1000);
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
                <LoginPage />
            }
          />
          <Route
            path="/signup"
            element={
                <SignupPage />
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
