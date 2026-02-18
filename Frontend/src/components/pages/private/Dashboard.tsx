import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Link } from "react-router-dom";
import { fetchTodos } from "../../../utils/api";

const Dashboard: React.FC = () => {
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );
  const username = user?.username;

  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const todos = await fetchTodos();
        setCount(todos.length);
      } catch (err) {
        console.error("Failed to fetch todos", err);
        setCount(0);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated && username) {
      getTodos();
    } else if (isAuthenticated) {
      setLoading(false);
    }
  }, [username, isAuthenticated]);

  if (loading && isAuthenticated) {
    return (
      <div className="flex items-center gap-3 py-12 text-[var(--muted-text-color)]">
        <div className="w-5 h-5 rounded-full border-2 border-transparent border-t-[var(--accent-color)] animate-spin" />
        <span className="text-sm">Loading dashboard…</span>
      </div>
    );
  }

  if (isAuthenticated && !user) {
    return (
      <div className="rounded-xl border border-[var(--error-color)]/30 bg-[var(--error-color)]/5 px-5 py-4 text-sm text-[var(--error-color)]">
        Error loading user data. Please try refreshing the page.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto text-[var(--text-color)]">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-[var(--text-color)]">
          Welcome back, {username || "User"} 👋
        </h1>
        <p className="text-sm text-[var(--muted-text-color)] mt-1">
          Here's a snapshot of your workspace.
        </p>
      </div>

      {/* Stat card */}
      <div
        className="rounded-2xl border p-6 mb-6 flex items-center gap-6"
        style={{
          backgroundColor: "var(--form-bg)",
          borderColor: "var(--border-color)",
        }}
      >
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-bold flex-shrink-0"
          style={{
            background: "var(--accent-color-hover)",
            color: "var(--accent-color)",
          }}
        >
          {count !== null ? count : "—"}
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-text-color)] mb-0.5">
            Total Todos
          </p>
          <p className="text-sm text-[var(--text-color)]">
            {count === 1
              ? "You have 1 todo created."
              : `You have ${count !== null ? count : "…"} todos created.`}
          </p>
        </div>
      </div>

      {/* Quick links */}
      <div
        className="rounded-2xl border p-6"
        style={{
          backgroundColor: "var(--form-bg)",
          borderColor: "var(--border-color)",
        }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-text-color)] mb-4">
          Quick Actions
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/home/todos"
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-medium text-white transition-all duration-150 hover:brightness-110 active:scale-[0.97]"
            style={{ backgroundColor: "var(--button-bg)" }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
            </svg>
            Go to Todos
          </Link>
          <Link
            to="/home/profile"
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-150 active:scale-[0.97] border"
            style={{
              backgroundColor: "var(--input-bg)",
              borderColor: "var(--border-color)",
              color: "var(--text-color)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = "var(--accent-color)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = "var(--border-color)")
            }
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
