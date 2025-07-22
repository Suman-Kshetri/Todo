import React from "react";

type Props = {
  sort: string;
  value: string;
  onSortChange: (sort: string) => void;
  onValueChange: (value: string) => void;
};

const TodoFilter: React.FC<Props> = ({ sort, value, onSortChange, onValueChange }) => {
  const baseSelectClass = `
    ml-2
    p-1.5
    rounded
    border
    border-[var(--border-color)]
    bg-[var(--input-bg)]
    text-[var(--text-color)]
    focus:outline-none
    focus:ring-2
    focus:ring-[var(--accent-color)]
    transition
    duration-200
  `;

  const baseLabelClass = `block text-[var(--text-color)] font-medium`;

  return (
    <div className="flex flex-row gap-4 p-4 bg-[var(--form-bg)] rounded shadow-md max-w-xs">
      <label className={baseLabelClass}>
        Sort By:
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className={baseSelectClass}
        >
          <option value="">Select</option>
          <option value="status">Status</option>
          <option value="priority">Priority</option>
          <option value="createdAt">Created At</option>
        </select>
      </label>

      {sort === "status" && (
        <label className={baseLabelClass}>
          Status:
          <select
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
            className={baseSelectClass}
          >
            <option value="">Select</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </label>
      )}

      {sort === "priority" && (
        <label className={baseLabelClass}>
          Priority:
          <select
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
            className={baseSelectClass}
          >
            <option value="">Select</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </label>
      )}
    </div>
  );
};

export default TodoFilter;
