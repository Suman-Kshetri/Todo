import React from "react";

type ButtonProps = {
  label: string;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ label, className = "", ...props }) => {
  return (
    <button
      {...props}
      className={`
        inline-flex items-center justify-center gap-2
        px-4 py-2 rounded-lg text-sm font-medium
        text-white tracking-wide
        bg-[var(--button-bg)]
        hover:bg-[var(--button-hover)]
        active:scale-[0.97]
        disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100
        transition-all duration-150 ease-in-out
        shadow-sm
        ${className}
      `}
    >
      {label}
    </button>
  );
};

export default Button;
