import React from "react";
import { Link } from "react-router-dom";

interface NotFoundPageProps {
  homeRedirectPath?: string;
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({
  homeRedirectPath = "/login",
}) => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center p-6"
      style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}
    >
      {/* Big 404 */}
      <p
        className="text-[120px] font-bold leading-none mb-2 select-none"
        style={{
          color: "var(--border-color)",
          letterSpacing: "-4px",
        }}
      >
        404
      </p>

      {/* Icon */}
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
        style={{
          backgroundColor: "var(--form-bg)",
          border: "1px solid var(--border-color)",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--accent-color)"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <circle cx="12" cy="16" r="0.5" fill="var(--accent-color)" />
        </svg>
      </div>

      <h1 className="text-2xl font-bold mb-2 text-[var(--text-color)] tracking-tight">
        Page not found
      </h1>
      <p className="text-sm text-[var(--muted-text-color)] mb-8 max-w-xs leading-relaxed">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <Link
        to={homeRedirectPath}
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium text-white transition-all duration-150 active:scale-95 hover:brightness-110"
        style={{ backgroundColor: "var(--button-bg)" }}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        Go back home
      </Link>
    </div>
  );
};

export default NotFoundPage;
