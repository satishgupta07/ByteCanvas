import React from "react";

/* ── Variant and size maps ──────────────────────────────────────────────────── */
const VARIANTS = {
  primary:   "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm",
  secondary: "bg-slate-100  text-slate-800 hover:bg-slate-200",
  outline:   "border border-slate-300 text-slate-700 bg-white hover:bg-slate-50",
  ghost:     "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
  danger:    "bg-red-500    text-white hover:bg-red-600    shadow-sm",
  success:   "bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm",
};

const SIZES = {
  sm: "px-3   py-1.5 text-xs",
  md: "px-4   py-2.5 text-sm",
  lg: "px-6   py-3   text-base",
};

/**
 * Unified button component with `variant` and `size` props.
 * Supports `children` or the legacy `btnText` prop for backward compatibility.
 */
export default function Button({
  children,
  btnText,           /* legacy prop — prefer children */
  type      = "button",
  variant   = "primary",
  size      = "md",
  className = "",
  disabled  = false,
  ...props
}) {
  const label = children ?? btnText;

  return (
    <button
      type={type}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-2
        font-medium rounded-lg
        transition-all duration-200 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${VARIANTS[variant] ?? VARIANTS.primary}
        ${SIZES[size]      ?? SIZES.md}
        ${className}
      `}
      {...props}
    >
      {label}
    </button>
  );
}
