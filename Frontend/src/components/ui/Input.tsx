import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type InputProps = {
  label: string;
  type?: string;
  error?: string;
  showPasswordToggle?: boolean;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = ({
  label,
  type = "text",
  error,
  className = "",
  showPasswordToggle = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === "password" && showPasswordToggle
      ? showPassword
        ? "text"
        : "password"
      : type;

  return (
    <div className="mb-4 relative">
      <label className="block text-sm font-medium text-[var(--text-color)] mb-1">
        {label}
      </label>

      <input
        type={inputType}
        {...props}
        className={`w-full px-4 py-2 bg-[var(--input-bg)] text-[var(--text-color)] border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--button-bg)] ${className} ${
          error ? "border-[var(--error-color)]" : ""
        }`}
      />

      {type === "password" && showPasswordToggle && (
        <button
          type="button"
          className="absolute right-3 top-[38px] text-[var(--muted-text-color)] cursor-pointer"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
        </button>
      )}

      {error && typeof error === "string" && (
        <p className="text-sm text-[var(--error-color)] mt-1">{error}</p>
      )}
    </div>
  );
};

export default Input;
