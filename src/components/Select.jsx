import React, { useId } from "react";

/**
 * Styled select dropdown with label support.
 * Uses forwardRef for react-hook-form compatibility.
 */
function Select({ options, label, className = "", ...props }, ref) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-slate-700 mb-1.5"
        >
          {label}
        </label>
      )}

      <select
        id={id}
        ref={ref}
        className={`
          w-full px-4 py-2.5 text-sm
          bg-white text-slate-900
          border border-slate-300 rounded-lg outline-none
          cursor-pointer
          transition-all duration-200
          focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100
          ${className}
        `}
        {...props}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
