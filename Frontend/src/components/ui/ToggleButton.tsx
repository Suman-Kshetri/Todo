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
      className={`
        w-10 h-10
        rounded-full
        cursor-pointer
        flex items-center justify-center
        shadow-lg
        transition-all duration-300 ease-in-out
        ring-1 ring-border-color
        hover:scale-105 hover:ring-2
        bg-gray-100 text-gray-800
        dark:bg-[#1f1b2e] dark:text-gray-900
        dark:hover:bg-[#2a2545]
      `}
    >
      {theme === "light" ? (
        // Moon icon for switching to dark
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-indigo-600 dark:text-indigo-300"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      ) : (
        // Sun icon for switching to light
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-yellow-400 dark:text-yellow-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      )}
    </button>
  );
};

export default ToggleButton;
