import React from "react";
import { Link } from "react-router-dom";

interface NotFoundPageProps {
  homeRedirectPath?: string;
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({ homeRedirectPath = "/login" }) => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center p-4"
      style={{ backgroundColor: "var(--background-color)", color: "var(--text-color)" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="150"
        height="150"
        viewBox="0 0 24 24"
        className="mb-6 text-[var(--accent-color)]"
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 7v4a1 1 0 0 0 1 1h3m0-5v10m3-9v8a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1zm7-1v4a1 1 0 0 0 1 1h3m0-5v10"
        />
      </svg>
      <h1 className="text-5xl font-bold mb-4">Page Not Found</h1>
      <p className="mb-6 text-[var(--muted-text-color)]">
        The page you are looking for does not exist.
      </p>
      <Link
        to={homeRedirectPath}
        className="px-6 py-2 rounded font-medium transition-colors"
        style={{
          backgroundColor: "var(--accent-color)",
          color: "var(--background-color)",
        }}
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
