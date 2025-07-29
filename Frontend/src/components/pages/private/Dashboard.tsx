import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Link } from "react-router-dom";
import { fetchTodos } from "../../../utils/api";
const Dashboard: React.FC = () => {
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
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
      // User is authenticated but no username - still loading

      setLoading(false);
    }
  }, [username, isAuthenticated]);

  // Show loading only if we're still fetching todos, not if user data is missing

  if (loading && isAuthenticated) {
    return (
      <div className="text-center mt-20 text-lg text-[var(--muted-text-color)]">
        Loading Dashboard...
      </div>
    );
  }

  // Show error if user is authenticated but no user data

  if (isAuthenticated && !user) {
    return (
      <div className="text-center mt-20 text-lg text-[var(--error-color)]">
        Error loading user data. Please try refreshing the page.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 text-[var(--text-color)]">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      <div className="rounded-xl shadow-md p-6 bg-[var(--card-bg)] border border-[var(--border-color)]">
        <p className="text-xl font-medium mb-2">
          Welcome, {username || "User"} 👋
        </p>

        <p className="mb-6 text-[var(--muted-text-color)]">
          You have{" "}
          <span className="font-semibold text-[var(--accent-color)]">
            {count !== null ? count : "..."} Todo{count === 1 ? "" : "s"}{" "}
            created
          </span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/home/todos"
            className="bg-[var(--button-bg)] hover:bg-[var(--button-hover)] text-white font-medium px-4 py-2 rounded transition-all"
          >
            Go to Todo List
          </Link>

          <Link
            to="/home/profile"
            className="bg-[var(--button-bg)] hover:bg-[var(--button-hover)] text-white font-medium px-4 py-2 rounded transition-all"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
