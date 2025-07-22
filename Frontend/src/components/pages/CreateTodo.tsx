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
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="p-6 rounded shadow max-w-md w-full"
        style={{
          backgroundColor: "var(--form-bg)",
          boxShadow: `0 4px 12px var(--shadow-color)`,
        }}
      >
        <h2 className="text-xl font-semibold mb-4 text-[var(--text-color)]">
          Create New Todo
        </h2>

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

        <div className="flex justify-end space-x-4 mt-4">
          <Button
            label="Cancel"
            type="button"
            onClick={onClose}
            className="bg-[var(--muted-text-color)] hover:brightness-110 text-white"
            disabled={loading}
          />
          <Button
            label={loading ? "Creating..." : "Create"}
            type="submit"
            disabled={loading}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateTodo;
