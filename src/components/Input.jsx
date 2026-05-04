import React, { useId } from "react";

/**
 * Accessible input field with label, error state, and focus ring.
 * Uses forwardRef so react-hook-form can attach refs.
 */
const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", error, ...props },
  ref
) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label
          className="block text-sm font-medium text-slate-700 mb-1.5"
          htmlFor={id}
        >
          {label}
        </label>
      )}

      <input
        type={type}
        id={id}
        ref={ref}
        className={`
          w-full px-4 py-2.5 text-sm
          bg-white text-slate-900
          border rounded-lg outline-none
          placeholder:text-slate-400
          transition-all duration-200
          ${
            error
              ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
              : "border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          }
          ${className}
        `}
        {...props}
      />

      {/* Inline validation message */}
      {error && (
        <p className="mt-1.5 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
});

export default Input;
