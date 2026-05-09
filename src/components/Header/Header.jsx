import React, { useState, useEffect } from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate   = useNavigate();
  const location   = useLocation();

  /* Elevate header with a shadow once the user scrolls */
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Close the mobile menu whenever the route changes */
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  const navItems = [
    { name: "Home",     slug: "/",          active: true          },
    { name: "Login",    slug: "/login",      active: !authStatus   },
    { name: "Sign up",  slug: "/signup",     active: !authStatus   },
    { name: "My Posts", slug: "/all-posts",  active: authStatus    },
    { name: "Write",    slug: "/add-post",   active: authStatus    },
  ].filter((i) => i.active);

  return (
    <header
      className={`sticky top-0 z-40 bg-white border-b border-slate-100 transition-shadow duration-300 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <Container>
        <nav className="flex items-center h-16 gap-2">
          {/* Brand */}
          <Link to="/" className="mr-auto md:mr-6 flex-shrink-0">
            <Logo />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center ml-auto gap-1">
            {navItems.map((item) => (
              <NavButton
                key={item.name}
                item={item}
                isActive={location.pathname === item.slug}
                navigate={navigate}
              />
            ))}
            {authStatus && <LogoutBtn />}
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg
                       text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              {menuOpen ? (
                <>
                  <line x1="18" y1="6"  x2="6"  y2="18" />
                  <line x1="6"  y1="6"  x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6"  x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile menu panel */}
        {menuOpen && (
          <div className="md:hidden pb-4 pt-2 border-t border-slate-100 -mx-4 sm:-mx-6 px-4 sm:px-6">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <MobileNavButton
                  key={item.name}
                  item={item}
                  isActive={location.pathname === item.slug}
                  navigate={navigate}
                />
              ))}
              {authStatus && (
                <div className="pt-2 mt-1 border-t border-slate-100">
                  <LogoutBtn fullWidth />
                </div>
              )}
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}

/* ── Desktop nav button ────────────────────────────────────────────────────── */
function NavButton({ item, isActive, navigate }) {
  if (item.slug === "/add-post") {
    return (
      <button
        onClick={() => navigate(item.slug)}
        className="ml-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg
                   hover:bg-indigo-700 transition-colors duration-200"
      >
        {item.name}
      </button>
    );
  }

  return (
    <button
      onClick={() => navigate(item.slug)}
      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
        isActive
          ? "text-indigo-600 bg-indigo-50"
          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
      }`}
    >
      {item.name}
    </button>
  );
}

/* ── Mobile nav button (full-width rows) ───────────────────────────────────── */
function MobileNavButton({ item, isActive, navigate }) {
  if (item.slug === "/add-post") {
    return (
      <button
        onClick={() => navigate(item.slug)}
        className="w-full px-4 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-lg
                   hover:bg-indigo-700 transition-colors duration-200"
      >
        {item.name}
      </button>
    );
  }

  return (
    <button
      onClick={() => navigate(item.slug)}
      className={`w-full text-left px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
        isActive
          ? "text-indigo-600 bg-indigo-50"
          : "text-slate-700 hover:bg-slate-50"
      }`}
    >
      {item.name}
    </button>
  );
}

export default Header;
