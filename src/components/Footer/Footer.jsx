import React from "react";
import Logo from "../Logo";

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex items-center justify-between">
          <Logo />
          <p className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} ByteCanvas. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
