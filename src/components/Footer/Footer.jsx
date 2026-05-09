import React from "react";
import Logo from "../Logo";

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-3 text-center sm:text-left">
          <Logo />
          <p className="text-xs sm:text-sm text-slate-400">
            &copy; {new Date().getFullYear()} ByteCanvas. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
