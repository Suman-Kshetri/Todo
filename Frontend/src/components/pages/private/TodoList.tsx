import { useEffect, useState } from "react";
import { toast } from "sonner";
import Button from "../../ui/Button";
import CreateTodo from "../CreateTodo";
import EditTodo from "../EditTodo";
import DeleteTodo from "../DeleteTodo";
import TodoFilter from "../../ui/TodoFilter";
import { fetchTodos, deleteTodo, Todo } from "../../../utils/api";

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
    <div className="p-6 max-w-4xl mx-auto text-[var(--text-color)]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Todos</h1>
        <Button label="Create Todo" onClick={() => setShowCreate(true)} className="cursor-pointer"/>
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
        <p>Loading todos...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : safeTodos.length === 0 ? (
        <p>No todos yet. Start by creating one!</p>
      ) : (
        <ul className="space-y-4 mt-4">
          {safeTodos.map((todo) => (
            <li
              key={todo._id}
              className="p-4 border rounded shadow bg-white dark:bg-gray-800 flex justify-between items-start"
            >
              <div>
                <h3 className="text-lg text-white font-semibold">{todo.title}</h3>
                {todo.description && <p className="text-white">{todo.description}</p>}
                <p className="text-sm text-[var(--muted-text-color)]">
                  Status: {todo.status} | Priority: {todo.priority}
                </p>
              </div>

              <div className="space-x-2 cursor-pointer">
                <Button label="Edit" onClick={() => setEditId(todo._id)} />
                <Button
                  label="Delete"
                  className="bg-red-600 hover:bg-red-700"
                  onClick={() => setDeleteId(todo._id)}
                />
              </div>
            </li>
          ))}
        </ul>
      )}

      {showCreate && (
        <CreateTodo onClose={() => setShowCreate(false)} onTodoCreated={loadTodos} />
      )}

      {editId && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <EditTodo id={editId} onClose={() => setEditId(null)} onUpdated={loadTodos} />
        </div>
      )}

      {deleteId && (
        <DeleteTodo onConfirm={handleDelete} onCancel={() => setDeleteId(null)} loading={deleting} />
      )}
    </div>
  );
};

export default TodoList;
