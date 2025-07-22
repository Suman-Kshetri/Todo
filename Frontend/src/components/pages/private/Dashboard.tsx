import React, { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Link } from "react-router-dom";
import { fetchTodos } from "../../../utils/api";
import { Todo } from "../../../types";

const Dashboard: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [count, setCount] = useState<number>();
  const [todo, setTodo] = useState<Todo[]>();
  useEffect(() => { 
  const datafetch = async () => {
    const fetchData = await fetchTodos();
    setTodo(fetchData);  
    setCount((fetchData).length);
  }
  datafetch();
}, []);

  return (
    <div className="max-w-3xl mx-auto p-6 text-[var(--text-color)]">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div
        className="rounded-xl shadow-md p-6 bg-[var(--card-bg)] border border-[var(--border-color)]"
      >
        <p className="text-xl font-medium mb-2">Welcome, {user?.username || "User"} 👋</p>
        <p className="mb-6 text-[var(--muted-text-color)]">
          You have <span className="font-semibold text-[var(--accent-color)]">{count} Todo created</span>
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
