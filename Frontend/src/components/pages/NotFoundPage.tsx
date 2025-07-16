import React from "react";
import { Link } from "react-router-dom";

interface NotFoundPageProps {
  homeRedirectPath?: string;
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({ homeRedirectPath = "/login" }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
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
