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
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home",     slug: "/",          active: true          },
    { name: "Login",    slug: "/login",      active: !authStatus   },
    { name: "Sign up",  slug: "/signup",     active: !authStatus   },
    { name: "My Posts", slug: "/all-posts",  active: authStatus    },
    { name: "Write",    slug: "/add-post",   active: authStatus    },
  ];

  return (
    <header
      className={`sticky top-0 z-40 bg-white border-b border-slate-100 transition-shadow duration-300 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <Container>
        <nav className="flex items-center h-16 gap-2">
          {/* Brand */}
          <Link to="/" className="mr-6 flex-shrink-0">
            <Logo />
          </Link>

          {/* Navigation items */}
          <div className="flex items-center ml-auto gap-1">
            {navItems.map((item) =>
              item.active ? (
                <NavButton
                  key={item.name}
                  item={item}
                  isActive={location.pathname === item.slug}
                  navigate={navigate}
                />
              ) : null
            )}

            {authStatus && <LogoutBtn />}
          </div>
        </nav>
      </Container>
    </header>
  );
}

/* ── Individual nav button ─────────────────────────────────────────────────── */
function NavButton({ item, isActive, navigate }) {
  /* "Write" gets a filled CTA style */
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

export default Header;
