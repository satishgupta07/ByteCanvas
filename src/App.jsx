import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";
import Loader from "./components/Loader";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  /* Resolve auth state before rendering any route */
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        /* Dispatch the raw appwrite user directly so userData.$id is always accessible */
        if (userData) dispatch(login(userData));
        else dispatch(logout());
      })
      .catch((err) => console.error("Auth check failed:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader fullScreen />;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
