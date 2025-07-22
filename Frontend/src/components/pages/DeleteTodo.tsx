import Button from "../ui/Button";

type Props = {
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
};

const DeleteTodo: React.FC<Props> = ({ onConfirm, onCancel, loading = false }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div
        className="p-6 rounded shadow max-w-sm w-full"
        style={{
          backgroundColor: "var(--form-bg)",
          boxShadow: "0 4px 12px var(--shadow-color)",
        }}
      >
        <h3 className="text-lg font-semibold text-[var(--text-color)] mb-4">Confirm Delete</h3>
        <p className="mb-6 text-[var(--text-color)]">
          Are you sure you want to delete this todo?
        </p>

        <div className="flex justify-end space-x-4">
          <Button
            label="Cancel"
            onClick={onCancel}
            className="bg-[var(--muted-text-color)] hover:brightness-110 text-white cursor-pointer"
            disabled={loading}
          />
          <Button
            label={loading ? "Deleting..." : "Delete"}
            onClick={onConfirm}
            className="bg-[var(--error-color)] hover:brightness-110 text-white cursor-pointer"
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteTodo;
