"use client";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, logout } from "@/providers/react-redux/slices/user";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

// custom hook for authentication
function useAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate({ from: "/" });
  const { currentUser } = useSelector((state: any) => state.user);
  const session_token_ls = localStorage.getItem("session_token");
  const session_exists = session_token_ls && currentUser;

  const handlePersistentSession = () => {
    if (!session_exists) {
      return;
    }
    navigate({ to: "/agenda" });
  };

  const handleLogin = async (
    email: string,
    password: string,
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const response = await window.ipcRenderer.invoke("auth-sign-in", {
        email,
        password,
      });

      if (!response.data.token || !response.data.user) {
        toast.error("Error al iniciar sesión");
        return;
      }

      localStorage.setItem("session_token", response.data.token);
      dispatch(loginSuccess(response.data.user));
      navigate({ to: "/agenda" });
      toast.success("Sesión Iniciada");
    } catch (error) {
      toast.error("Correo electrónico o contraseña inválidos");
    }
  };

  const handleLogout = () => {
    try {
      dispatch(logout());
      localStorage.removeItem("session_token");
      navigate({ to: "/" });
      toast.success("Sesión Terminada");
    } catch (error) {
      toast.error("Error al cerrar sesión");
    }
  };

  return {
    handleLogin,
    handleLogout,
    session_exists,
    handlePersistentSession,
  };
}

export default useAuth;
