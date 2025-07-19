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
    px-4 py-2 rounded-lg font-semibold
    text-white
    disabled:opacity-50 disabled:cursor-not-allowed
    bg-[var(--button-bg)]
    hover:bg-[var(--button-hover)]
    transition-colors duration-200
    ${className}
  `}
>
  {label}
</button>

  );
};

export default Button;
