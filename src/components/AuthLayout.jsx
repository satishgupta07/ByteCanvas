import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

/**
 * Route guard wrapper.
 * When `authentication` is true  → only authenticated users can access.
 * When `authentication` is false → only guests can access (e.g. login/signup pages).
 */
export default function AuthLayout({ children, authentication = true }) {
  const navigate    = useNavigate();
  const authStatus  = useSelector((state) => state.auth.status);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setChecking(false);
  }, [authStatus, navigate, authentication]);

  return checking ? <Loader /> : <>{children}</>;
}
