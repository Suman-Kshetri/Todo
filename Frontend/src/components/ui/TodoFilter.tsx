import React from "react";

type Props = {
  sort: string;
  value: string;
  onSortChange: (sort: string) => void;
  onValueChange: (value: string) => void;
};

const selectClass = `
  px-3 py-2 rounded-lg text-sm
  border border-[var(--border-color)]
  bg-[var(--input-bg)]
  text-[var(--text-color)]
  focus:outline-none focus:ring-2 focus:ring-[var(--button-bg)] focus:ring-opacity-40
  cursor-pointer
  transition-all duration-150
`;

const TodoFilter: React.FC<Props> = ({
  sort,
  value,
  onSortChange,
  onValueChange,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-3 p-4 rounded-xl border border-[var(--border-color)] bg-[var(--form-bg)] mb-4">
      <span className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-text-color)]">
        Filter
      </span>

      <div className="flex items-center gap-2">
        <label className="text-xs text-[var(--muted-text-color)] font-medium">
          Sort by
        </label>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className={selectClass}
        >
          <option value="">All</option>
          <option value="status">Status</option>
          <option value="priority">Priority</option>
          <option value="createdAt">Created At</option>
        </select>
      </div>

      {sort === "status" && (
        <div className="flex items-center gap-2">
          <label className="text-xs text-[var(--muted-text-color)] font-medium">
            Status
          </label>
          <select
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
            className={selectClass}
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </div>
      )}

      {sort === "priority" && (
        <div className="flex items-center gap-2">
          <label className="text-xs text-[var(--muted-text-color)] font-medium">
            Priority
          </label>
          <select
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
            className={selectClass}
          >
            <option value="">All</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default TodoFilter;
