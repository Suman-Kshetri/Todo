import React, { useEffect, useState } from "react";
import axios from "axios";

type Todo = {
  _id: string;
  title: string;
  description?: string;
  status: "completed" | "incomplete" | "pending";
  priority: "low" | "medium" | "high";
  createdAt: string;
};

const SortByTodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterField, setFilterField] = useState<string>(""); // status, priority, createdAt
  const [filterValue, setFilterValue] = useState<string>(""); // selected value like 'completed', 'high' etc

  const fetchTodos = async (sortField?: string, sortValue?: string) => {
    try {
      const params: any = {};
      if (sortField && sortValue) {
        params.sort = sortField;
        params.value = sortValue;
      }

      const response = await axios.get("/api/v1/todos/filter", { params });
      setTodos(response.data.data);
    } catch (error) {
      console.error("Error fetching todos", error);
    }
  };

  useEffect(() => {
    fetchTodos(); // Fetch all on mount
  }, []);

  const handleApply = () => {
    if (filterField && filterValue) {
      fetchTodos(filterField, filterValue);
    }
  };

  const handleClear = () => {
    setFilterField("");
    setFilterValue("");
    fetchTodos();
  };

  // Dynamically update options based on selected field
  const getFilterOptions = () => {
    if (filterField === "status") {
      return ["completed", "incomplete", "pending"];
    }
    if (filterField === "priority") {
      return ["low", "medium", "high"];
    }
    if (filterField === "createdAt") {
      return ["latest", "oldest"];
    }
    return [];
  };

  return (
    <div className="p-4 max-w-3xl mx-auto text-[var(--text-color)]">
      <h2 className="text-xl font-bold mb-4">Sort & Filter Todos</h2>

      <div className="flex gap-4 mb-6">
        {/* First Dropdown */}
        <select
          className="p-2 border rounded"
          value={filterField}
          onChange={(e) => {
            setFilterField(e.target.value);
            setFilterValue(""); // Reset second dropdown
          }}
        >
          <option value="">Select Filter Field</option>
          <option value="status">Status</option>
          <option value="priority">Priority</option>
          <option value="createdAt">Created Date</option>
        </select>

        {/* Second Dropdown (values based on field) */}
        {filterField && (
          <select
            className="p-2 border rounded"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          >
            <option value="">Select {filterField}</option>
            {getFilterOptions().map((opt) => (
              <option key={opt} value={opt}>
                {opt.charAt(0).toUpperCase() + opt.slice(1)}
              </option>
            ))}
          </select>
        )}

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleApply}
          disabled={!filterField || !filterValue}
        >
          Apply
        </button>

        <button
          className="bg-gray-300 px-4 py-2 rounded"
          onClick={handleClear}
          disabled={!filterField && !filterValue}
        >
          Clear Filter
        </button>
      </div>

      {/* Display Todos */}
      <ul className="space-y-4">
        {todos.map((todo) => (
          <li key={todo._id} className="border p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{todo.title}</h3>
            <p>{todo.description}</p>
            <p>Status: {todo.status}</p>
            <p>Priority: {todo.priority}</p>
            <p>
              Created: {new Date(todo.createdAt).toLocaleDateString()}{" "}
              {new Date(todo.createdAt).toLocaleTimeString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SortByTodoList;
