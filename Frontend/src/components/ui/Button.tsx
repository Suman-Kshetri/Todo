import React from "react";

type ButtonProps = {
  label: string;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>; // Include all native button props

const Button: React.FC<ButtonProps> = ({ label, className, ...props }) => {
  return (
    <button
      className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${className}`}
      {...props} // Spread all other props like onClick, disabled, type etc.
    >
      {label}
    </button>
  );
};

export default Button;