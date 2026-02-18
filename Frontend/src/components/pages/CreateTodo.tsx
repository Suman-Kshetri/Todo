import { useState } from "react";
import { toast } from "sonner";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { createTodo } from "../../utils/api";

type Props = {
  onClose: () => void;
  onTodoCreated: () => void;
};

const CreateTodo: React.FC<Props> = ({ onClose, onTodoCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("low");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    setLoading(true);
    try {
      await createTodo({ title, description, priority });
      toast.success("Todo created successfully");
      onTodoCreated();
      onClose();
    } catch {
      toast.error("Failed to create todo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
    >
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
            Create New Todo
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
        <form onSubmit={handleSubmit} className="p-6 space-y-1">
          <Input
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            required
          />

          <Input
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add some details (optional)"
          />

          <div className="mb-4">
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

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-2">
            <Button
              label="Cancel"
              type="button"
              onClick={onClose}
              className="bg-transparent border border-[var(--border-color)] text-[var(--muted-text-color)] hover:text-[var(--text-color)] hover:bg-[var(--input-bg)] shadow-none"
              disabled={loading}
            />
            <Button
              label={loading ? "Creating…" : "Create Todo"}
              type="submit"
              disabled={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTodo;
