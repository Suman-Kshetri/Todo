import { useEffect, useState } from "react";
import { toast } from "sonner";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { fetchSingleTodo, updateTodo, Todo } from "../../utils/api";

type Props = {
  id: string;
  onClose: () => void;
  onUpdated: () => void;
};

const EditTodo: React.FC<Props> = ({ id, onClose, onUpdated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("low");
  const [status, setStatus] = useState<Todo["status"]>("incomplete");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTodo() {
      try {
        setLoading(true);
        const todo = await fetchSingleTodo(id);
        setTitle(todo.title);
        setDescription(todo.description || "");
        setPriority(todo.priority);
        setStatus(todo.status);
      } catch {
        setError("Failed to load todo");
        toast.error("Failed to load todo");
      } finally {
        setLoading(false);
      }
    }
    loadTodo();
  }, [id]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      await updateTodo(id, { title, description, priority, status });
      toast.success("Todo updated successfully");
      onUpdated();
      onClose();
    } catch {
      setError("Failed to update todo");
      toast.error("Failed to update todo");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-[var(--muted-text-color)]">Loading todo details...</p>;

  return (
    <form
      onSubmit={handleSave}
      className="max-w-md mx-auto p-6 rounded shadow mt-6"
      style={{
        backgroundColor: "var(--form-bg)",
        boxShadow: `0 4px 12px var(--shadow-color)`,
      }}
    >
      <h2 className="text-xl font-semibold mb-4 text-[var(--text-color)]">Edit Todo</h2>

      <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />

      <Input
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label className="block mb-4 text-[var(--text-color)] font-medium">
        Priority
        <select
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value as "low" | "medium" | "high")
          }
          className="w-full mt-1 p-2 rounded border"
          style={{
            backgroundColor: "var(--input-bg)",
            borderColor: "var(--border-color)",
            color: "var(--text-color)",
          }}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>

      <label className="block mb-4 text-[var(--text-color)] font-medium">
        Status
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as Todo["status"])}
          className="w-full mt-1 p-2 rounded border"
          style={{
            backgroundColor: "var(--input-bg)",
            borderColor: "var(--border-color)",
            color: "var(--text-color)",
          }}
        >
          <option value="incomplete">Incomplete</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </label>

      {error && <p className="text-[var(--error-color)] mb-2">{error}</p>}

      <div className="flex justify-end space-x-4 mt-4">
        <Button
          label="Cancel"
          type="button"
          onClick={onClose}
          className="bg-[var(--muted-text-color)] hover:brightness-110 text-white"
          disabled={saving}
        />
        <Button
          label={saving ? "Saving..." : "Save"}
          type="submit"
          disabled={saving}
        />
      </div>
    </form>
  );
};

export default EditTodo;
