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
  className="p-2 rounded-3xl bg-white  dark:bg-gray-700 dark:bg-opacity-20 shadow-md hover:brightness-100 transition cursor-pointer flex items-center justify-center"
>
  {theme === "light" ? (
    // Moon icon with partial fill & blue stroke
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-blue-100"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="url(#moonGradient)"
        d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"
      />
      
    </svg>
  ) : (
    // Sun icon bright yellow
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-yellow-400"
      fill="yellow"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v1m0 16v1m8.66-9h-1M4.34 12h-1m15.36 5.66l-.7-.7M6.34 6.34l-.7-.7m12.02 12.02l-.7-.7M6.34 17.66l-.7-.7M12 7a5 5 0 100 10 5 5 0 000-10z"
      />
    </svg>
  )}
</button>

  );
};

export default ToggleButton;
