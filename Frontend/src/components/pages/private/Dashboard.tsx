
// 1.<Dashboard />
// This is  main landing page after login.
// A welcome message (Welcome, {username})
// Overview (e.g. “You have 3 tasks left today”)
// Quick access buttons to:
// Create new task
// Go to Todo list
// View profile
import React, { useEffect } from "react";

const Dashboard: React.FC = () => {
  useEffect(() => {
    const hasReloaded = sessionStorage.getItem("dashboardReloaded");

    if (!hasReloaded) {
      sessionStorage.setItem("dashboardReloaded", "true");
      window.location.reload();
    }
  }, []);

  return <div>Welcome to the Dashboard!</div>;
};

export default Dashboard;

