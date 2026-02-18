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
      <label className="block text-xs font-semibold uppercase tracking-widest text-[var(--muted-text-color)] mb-1.5">
        {label}
      </label>

      <input
        type={inputType}
        {...props}
        className={`
          w-full px-4 py-2.5
          bg-[var(--input-bg)]
          text-[var(--text-color)]
          text-sm
          border rounded-lg
          border-[var(--border-color)]
          placeholder:text-[var(--muted-text-color)] placeholder:opacity-60
          focus:outline-none focus:ring-2 focus:ring-[var(--button-bg)] focus:ring-opacity-40 focus:border-[var(--button-bg)]
          transition-all duration-150
          ${error ? "border-[var(--error-color)] focus:ring-[var(--error-color)]" : ""}
          ${type === "password" && showPasswordToggle ? "pr-11" : ""}
          ${className}
        `}
      />

      {type === "password" && showPasswordToggle && (
        <button
          type="button"
          className="absolute right-3 top-[34px] text-[var(--muted-text-color)] hover:text-[var(--text-color)] transition-colors cursor-pointer"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
        </button>
      )}

      {error && typeof error === "string" && (
        <p className="text-xs text-[var(--error-color)] mt-1.5 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
};

export default Input;
