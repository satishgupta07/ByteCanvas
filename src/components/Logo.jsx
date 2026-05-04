import React from "react";

/**
 * Text-based brand mark — no broken image dependency.
 * Uses the indigo + slate two-tone treatment that matches the design system.
 */
function Logo({ className = "" }) {
  return (
    <span
      className={`font-bold text-xl tracking-tight select-none ${className}`}
    >
      <span className="text-indigo-600">Byte</span>
      <span className="text-slate-800">Canvas</span>
    </span>
  );
}

export default Logo;
