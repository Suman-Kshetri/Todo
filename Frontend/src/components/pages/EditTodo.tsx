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

  if (loading)
    return (
      <div className="flex items-center gap-2 text-sm text-[var(--muted-text-color)] p-6">
        <div className="w-4 h-4 rounded-full border-2 border-transparent border-t-[var(--accent-color)] animate-spin" />
        Loading todo…
      </div>
    );

  return (
    <div
      className="w-full max-w-md rounded-2xl border shadow-2xl overflow-hidden"
      style={{
        backgroundColor: "var(--form-bg)",
        borderColor: "var(--border-color)",
        boxShadow: "0 24px 64px var(--shadow-color)",
      }}
    >
      {/* Header */}
      <div
        className="px-6 py-4 border-b flex items-center justify-between"
        style={{ borderColor: "var(--border-color)" }}
      >
        <h2 className="text-base font-semibold text-[var(--text-color)]">
          Edit Todo
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-[var(--muted-text-color)] hover:text-[var(--text-color)] hover:bg-[var(--input-bg)] transition-all"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M1 1l12 12M13 1L1 13"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Body */}
      <form onSubmit={handleSave} className="p-6 space-y-1">
        <Input
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <Input
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-[var(--muted-text-color)] mb-1.5">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) =>
                setPriority(e.target.value as "low" | "medium" | "high")
              }
              className="w-full px-4 py-2.5 rounded-lg border text-sm bg-[var(--input-bg)] border-[var(--border-color)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--button-bg)] focus:ring-opacity-40 transition-all cursor-pointer"
            >
              <option value="low">🟢 Low</option>
              <option value="medium">🟡 Medium</option>
              <option value="high">🔴 High</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-[var(--muted-text-color)] mb-1.5">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as Todo["status"])}
              className="w-full px-4 py-2.5 rounded-lg border text-sm bg-[var(--input-bg)] border-[var(--border-color)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--button-bg)] focus:ring-opacity-40 transition-all cursor-pointer"
            >
              <option value="incomplete">Incomplete</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {error && (
          <p className="text-xs text-[var(--error-color)] flex items-center gap-1 mb-2">
            <span>⚠</span> {error}
          </p>
        )}

        <div className="flex justify-end gap-3 pt-2">
          <Button
            label="Cancel"
            type="button"
            onClick={onClose}
            className="bg-transparent border border-[var(--border-color)] text-[var(--muted-text-color)] hover:text-[var(--text-color)] hover:bg-[var(--input-bg)] shadow-none"
            disabled={saving}
          />
          <Button
            label={saving ? "Saving…" : "Save Changes"}
            type="submit"
            disabled={saving}
          />
        </div>
      </form>
    </div>
  );
};

export default EditTodo;
