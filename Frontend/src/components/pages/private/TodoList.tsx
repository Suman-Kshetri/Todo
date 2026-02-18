import { useEffect, useState } from "react";
import { toast } from "sonner";
import Button from "../../ui/Button";
import CreateTodo from "../CreateTodo";
import EditTodo from "../EditTodo";
import DeleteTodo from "../DeleteTodo";
import TodoFilter from "../../ui/TodoFilter";
import { fetchTodos, deleteTodo, Todo } from "../../../utils/api";

const priorityStyles: Record<string, { dot: string; badge: string }> = {
  high: { dot: "bg-red-500", badge: "bg-red-500/10 text-red-500" },
  medium: { dot: "bg-yellow-500", badge: "bg-yellow-500/10 text-yellow-500" },
  low: { dot: "bg-green-500", badge: "bg-green-500/10 text-green-500" },
};

const statusStyles: Record<string, string> = {
  completed: "bg-green-500/10 text-green-500",
  pending: "bg-yellow-500/10 text-yellow-500",
  incomplete: "bg-[var(--muted-text-color)]/10 text-[var(--muted-text-color)]",
};

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [sort, setSort] = useState<string>("");
  const [filterValue, setFilterValue] = useState<string>("");

  const loadTodos = async () => {
    setLoading(true);
    setError(null);
    try {
      let data = await fetchTodos();
      if (sort && filterValue) {
        data = data.filter((todo: Todo) => {
          if (sort === "status") return todo.status === filterValue;
          if (sort === "priority") return todo.priority === filterValue;
          return true;
        });
      }
      setTodos(Array.isArray(data) ? data : []);
    } catch {
      setError("Failed to fetch todos. Please try again.");
      toast.error("Failed to fetch todos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, [sort, filterValue]);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await deleteTodo(deleteId);
      toast.success("Todo deleted successfully");
      setDeleteId(null);
      loadTodos();
    } catch {
      toast.error("Failed to delete todo");
    } finally {
      setDeleting(false);
    }
  };

  const safeTodos = todos ?? [];

  return (
    <div className="max-w-4xl mx-auto text-[var(--text-color)]">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-color)] tracking-tight">
            My Todos
          </h1>
          <p className="text-sm text-[var(--muted-text-color)] mt-0.5">
            {safeTodos.length} task{safeTodos.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <Button
          label="+ New Todo"
          onClick={() => setShowCreate(true)}
          className="cursor-pointer"
        />
      </div>

      <TodoFilter
        sort={sort}
        value={filterValue}
        onSortChange={(newSort) => {
          setSort(newSort);
          setFilterValue("");
        }}
        onValueChange={setFilterValue}
      />

      {loading ? (
        <div className="flex items-center gap-3 py-12 justify-center text-[var(--muted-text-color)]">
          <div className="w-5 h-5 rounded-full border-2 border-transparent border-t-[var(--accent-color)] animate-spin" />
          <span className="text-sm">Loading todos…</span>
        </div>
      ) : error ? (
        <div className="rounded-xl border border-[var(--error-color)]/30 bg-[var(--error-color)]/5 px-5 py-4 text-sm text-[var(--error-color)]">
          {error}
        </div>
      ) : safeTodos.length === 0 ? (
        <div className="text-center py-16 text-[var(--muted-text-color)]">
          <div className="text-4xl mb-3 opacity-40">📋</div>
          <p className="text-sm">No todos yet. Create your first one!</p>
        </div>
      ) : (
        <ul className="space-y-3 mt-2">
          {safeTodos.map((todo) => (
            <li
              key={todo._id}
              className="group flex justify-between items-start gap-4 p-4 rounded-xl border transition-all duration-150 hover:border-[var(--accent-color)]/40"
              style={{
                backgroundColor: "var(--form-bg)",
                borderColor: "var(--border-color)",
              }}
            >
              {/* Priority dot */}
              <div className="mt-1.5 flex-shrink-0">
                <span
                  className={`block w-2.5 h-2.5 rounded-full ${
                    priorityStyles[todo.priority]?.dot ?? "bg-gray-400"
                  }`}
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-[var(--text-color)] leading-snug truncate">
                  {todo.title}
                </h3>
                {todo.description && (
                  <p className="text-xs text-[var(--muted-text-color)] mt-1 leading-relaxed line-clamp-2">
                    {todo.description}
                  </p>
                )}
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-medium capitalize ${
                      statusStyles[todo.status] ?? ""
                    }`}
                  >
                    {todo.status}
                  </span>
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-medium capitalize ${
                      priorityStyles[todo.priority]?.badge ?? ""
                    }`}
                  >
                    {todo.priority} priority
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  label="Edit"
                  onClick={() => setEditId(todo._id)}
                  className="cursor-pointer py-1.5 px-3 text-xs"
                />
                <Button
                  label="Delete"
                  className="bg-red-600 hover:bg-red-700 cursor-pointer py-1.5 px-3 text-xs"
                  onClick={() => setDeleteId(todo._id)}
                />
              </div>
            </li>
          ))}
        </ul>
      )}

      {showCreate && (
        <CreateTodo
          onClose={() => setShowCreate(false)}
          onTodoCreated={loadTodos}
        />
      )}

      {editId && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
        >
          <EditTodo
            id={editId}
            onClose={() => setEditId(null)}
            onUpdated={loadTodos}
          />
        </div>
      )}

      {deleteId && (
        <DeleteTodo
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
          loading={deleting}
        />
      )}
    </div>
  );
};

export default TodoList;
