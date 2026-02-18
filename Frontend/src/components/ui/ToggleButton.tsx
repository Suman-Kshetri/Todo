import React from "react";

type ToggleButtonProps = {
  theme: "light" | "dark";
  onToggle: () => void;
};

const ToggleButton: React.FC<ToggleButtonProps> = ({ theme, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle theme"
      className="
        w-9 h-9
        rounded-lg
        cursor-pointer
        flex items-center justify-center
        border border-[var(--border-color)]
        bg-[var(--input-bg)]
        hover:border-[var(--accent-color)]
        hover:bg-[var(--accent-color-hover)]
        text-[var(--muted-text-color)]
        hover:text-[var(--text-color)]
        transition-all duration-200 ease-in-out
        active:scale-95
      "
    >
      {theme === "light" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <circle cx="12" cy="12" r="5" />
          <path
            strokeLinecap="round"
            d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
          />
        </svg>
      )}
    </button>
  );
};

export default ToggleButton;
