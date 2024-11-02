"use client";
import { useDispatch, useSelector } from "react-redux";
import {
  loginSuccess,
  logout,
  userUpdated,
} from "@/providers/react-redux/slices/user";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import { RootState } from "@/providers/react-redux/store";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { UserProps } from "@/types/user";

type SessionResponse = {
  data: {
    user: UserProps;
    token?: string;
  };
};

function useAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate({ from: "/" });
  const { currentUser } = useSelector((state: RootState) => state.user);

  const checkCurrentSession = async () => {
    const session_token = localStorage.getItem("session_token");
    if (!session_token) return null;

    try {
      const response: SessionResponse = await window.ipcRenderer.invoke(
        "auth-verify-session",
        {
          token: session_token,
        }
      );

      if (response.data.token) {
        localStorage.setItem("session_token", response.data.token);
      }

      if (response.data.user) {
        dispatch(userUpdated(response.data.user));
      }

      return response.data.user;
    } catch (error) {
      localStorage.removeItem("session_token");
      return null;
    }
  };

  const { data: sessionUser, refetch } = useQuery({
    queryKey: ["session"],
    queryFn: checkCurrentSession,
    enabled: !!localStorage.getItem("session_token"),
    refetchOnWindowFocus: true,
    refetchInterval: 5 * 60 * 1000,
    retry: 1,
  });

  useEffect(() => {
    if (sessionUser) {
      dispatch(loginSuccess(sessionUser));
    } else {
      dispatch(logout());
    }
  }, [sessionUser, dispatch]);

  useEffect(() => {
    const handleFocus = () => {
      refetch();
    };

    window.addEventListener("focus", handleFocus);
    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [refetch]);

  const handleLogin = async (
    email: string,
    password: string,
    e: React.FormEvent
  ) => {
    e.preventDefault();
    try {
      const response: SessionResponse = await window.ipcRenderer.invoke(
        "auth-sign-in",
        {
          email,
          password,
        }
      );

      if (!response.data.token || !response.data.user) {
        toast.error("Error al iniciar sesión");
        return;
      }

      localStorage.setItem("session_token", response.data.token);
      dispatch(loginSuccess(response.data.user));
      await refetch();

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

  const handlePersistentSession = () => {
    const session_exists =
      !!localStorage.getItem("session_token") && !!currentUser;

    if (session_exists) {
      toast(`¡Hola, ${currentUser?.name}! Bienvenido de nuevo 😊`);
      navigate({ to: "/agenda" });
    }
  };

  return {
    handleLogin,
    handleLogout,
    session_exists: !!localStorage.getItem("session_token") && !!currentUser,
    handlePersistentSession,
  };
}

export default useAuth;
