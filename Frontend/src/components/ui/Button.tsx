import React from "react";

type ButtonProps = {
  label: string;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ label, className, ...props }) => {
  return (
    <button
      className={`px-4 py-2 rounded-lg text-white font-semibold disabled:opacity-50 ${className}`}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
