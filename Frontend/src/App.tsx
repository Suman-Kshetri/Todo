import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import { initTheme, toggleTheme } from "./utils/themechange";
import Layout from "./components/Layout";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import SignupPage from "./components/pages/SignupPage";
import { Toaster } from "sonner";

const App = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const initialTheme = initTheme();
    setTheme(initialTheme);
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
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path = "/signup" element= {<SignupPage/>}/>
        </Routes>
      </Layout>
    </Router>
    </>
  );
};

export default App;
