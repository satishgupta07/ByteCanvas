import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

          {/* Brand + nav links */}
          <div className="flex items-center gap-6 flex-wrap justify-center">
            <Logo />
            <nav className="flex items-center gap-5">
              <Link
                to="/"
                className="text-sm text-slate-500 hover:text-slate-900 transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                to="/all-posts"
                className="text-sm text-slate-500 hover:text-slate-900 transition-colors duration-200"
              >
                Posts
              </Link>
              <Link
                to="/add-post"
                className="text-sm text-slate-500 hover:text-slate-900 transition-colors duration-200"
              >
                Write
              </Link>
            </nav>
          </div>

          {/* Copyright */}
          <p className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} ByteCanvas. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
