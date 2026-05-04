import React from "react";

/**
 * Reusable loading spinner.
 * Pass `fullScreen` for an overlay that blocks the entire viewport.
 */
function Loader({ fullScreen = false, message = "Loading..." }) {
  const wrapperClass = fullScreen
    ? "fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center"
    : "flex items-center justify-center py-20";

  return (
    <div className={wrapperClass} role="status" aria-label={message}>
      <div className="flex flex-col items-center gap-3">
        {/* Spinning ring */}
        <div className="w-10 h-10 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />
        <p className="text-sm text-slate-500 font-medium">{message}</p>
      </div>
    </div>
  );
}

export default Loader;
