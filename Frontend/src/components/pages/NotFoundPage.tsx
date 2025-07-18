import React from "react";
import { Link } from "react-router-dom";

interface NotFoundPageProps {
  homeRedirectPath?: string;
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({ homeRedirectPath = "/login" }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
      <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v4a1 1 0 0 0 1 1h3m0-5v10m3-9v8a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1zm7-1v4a1 1 0 0 0 1 1h3m0-5v10"/></svg>
      <h1 className="text-5xl font-bold mb-4"> Page Not Found</h1>
      <p className="mb-6">The page you are looking for does not exist.</p>
      <Link
        to={homeRedirectPath}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
