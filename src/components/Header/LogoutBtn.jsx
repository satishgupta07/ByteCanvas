import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

function LogoutBtn({ fullWidth = false }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout().then(() => {
      dispatch(logout());
      navigate("/login");
    });
  };

  return (
    <button
      onClick={handleLogout}
      className={`${fullWidth ? "w-full" : "ml-2"} px-4 py-2 text-sm font-medium text-slate-600
                 border border-slate-300 rounded-lg bg-white
                 hover:bg-slate-50 hover:text-slate-900
                 transition-colors duration-200`}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
