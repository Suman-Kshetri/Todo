import Button from "../ui/Button";

type Props = {
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
};

const DeleteTodo: React.FC<Props> = ({
  onConfirm,
  onCancel,
  loading = false,
}) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
    >
      <div
        className="w-full max-w-sm rounded-2xl border shadow-2xl overflow-hidden"
        style={{
          backgroundColor: "var(--form-bg)",
          borderColor: "var(--border-color)",
          boxShadow: "0 24px 64px var(--shadow-color)",
        }}
      >
        {/* Icon */}
        <div className="pt-8 pb-2 flex justify-center">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{
              background: "rgba(var(--error-color-rgb, 239,68,68), 0.1)",
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--error-color)"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14H6L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4h6v2" />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6 text-center">
          <h3 className="text-base font-semibold text-[var(--text-color)] mt-4 mb-2">
            Delete Todo
          </h3>
          <p className="text-sm text-[var(--muted-text-color)] leading-relaxed mb-6">
            Are you sure you want to delete this todo? This action cannot be
            undone.
          </p>

          <div className="flex gap-3">
            <Button
              label="Cancel"
              onClick={onCancel}
              disabled={loading}
              className="flex-1 bg-transparent border border-[var(--border-color)] text-[var(--muted-text-color)] hover:text-[var(--text-color)] hover:bg-[var(--input-bg)] shadow-none"
            />
            <Button
              label={loading ? "Deleting…" : "Delete"}
              onClick={onConfirm}
              disabled={loading}
              className="flex-1 bg-[var(--error-color)] hover:brightness-110 border-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteTodo;
