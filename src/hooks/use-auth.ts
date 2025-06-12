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
import IsOfflineChecker from "@/lib/offline-checker";

type SessionResponse = {
  data?: {
    user: UserProps;
    token?: string;
    subscription_data?: {
      links: {
        href: string;
        rel: string;
      }[];
    };
  };
  errorType?:
    | "server"
    | "subscription-inactive"
    | "invalid-credentials"
    | "email-not-verified";
  message?: string;
};

function useAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate({ from: "/" });
  const { currentUser } = useSelector((state: RootState) => state.user);

  const checkCurrentSession = async () => {
    const session_token = localStorage.getItem("session_token");
    if (!session_token) {
      if (currentUser) {
        dispatch(logout());
      }
      return null;
    }

    if (IsOfflineChecker()) {
      return null;
    }

    try {
      const response: SessionResponse = await window.ipcRenderer.invoke(
        "auth-verify-session",
        {
          token: session_token,
        }
      );

      if (response.data?.token) {
        localStorage.setItem("session_token", response.data?.token);
      }

      if (response.data?.user) {
        dispatch(userUpdated(response.data?.user));
      }

      return response.data?.user;
    } catch (error) {
      dispatch(logout());
      localStorage.removeItem("session_token");
      navigate({ to: "/" });
      toast.success("Sesión Terminada");
      return null;
    }
  };

  const { data: sessionUser, refetch } = useQuery({
    queryKey: ["session"],
    queryFn: checkCurrentSession,
    enabled: true,
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
    const onStorage = (e: StorageEvent) => {
      if (e.key === "session_token" && e.newValue === null) {
        dispatch(logout());
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [dispatch]);

  async function openSubscription(subscription_link: string) {
    await window.ipcRenderer.invoke("external-link-open", subscription_link);
  }

  async function resendEmailVerification({ email }: { email: string }) {
    toast.promise(
      window.ipcRenderer.invoke("auth-resend-verification", { email }),
      {
        id: "email-not-verified",
        description: "",
        loading: "Reenviando correo de verificación...",
        success: "Correo de verificación reenviado",
        error: "Ocurrió un error al reenviar correo de verificación",
      }
    );
  }

  const handleSignUp = async () => {
    await window.ipcRenderer.invoke(
      "external-link-open",
      `${process.env.VITE_PUBLIC_SITE_URL}/sign-up`
    );
  };

  const handleRecoverPassword = async () => {
    await window.ipcRenderer.invoke(
      "external-link-open",
      `${process.env.VITE_PUBLIC_SITE_URL}/recover-password`
    );
  };

  const handleLogin = async (
    email: string,
    password: string,
    e: React.FormEvent,
    rememberMe: boolean
  ) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        toast.error("Por favor, rellena todos los campos requeridos");
        return;
      }

      toast.loading("Iniciando sesión...", {
        duration: Infinity,
        id: "logging-in",
      });

      if (rememberMe) {
        localStorage.setItem("lastEmail", email);
      } else {
        localStorage.removeItem("lastEmail");
      }

      const response: SessionResponse = await window.ipcRenderer.invoke(
        "auth-sign-in",
        {
          email,
          password,
        }
      );

      if (response.errorType) {
        if (response.errorType === "subscription-inactive") {
          const subscription_link = response.data?.subscription_data?.links?.find(
            (link) => link.rel === "approve"
          )?.href;

          if (!subscription_link) {
            throw new Error("Ocurrió un error al iniciar sesión");
          }

          toast.dismiss("logging-in");
          toast.error(response.message, {
            description: "Por favor, active su suscripción para continuar",
            action: {
              label: "Activar",
              onClick: () => {
                if (subscription_link) {
                  openSubscription(subscription_link);
                }
              },
            },
            actionButtonStyle: {
              padding: 16,
            },
          });
          return;
        }

        if (response.errorType === "email-not-verified") {
          toast.dismiss("logging-in");
          toast.error("Correo electrónico no verificado", {
            id: "email-not-verified",
            description:
              "Por favor, verifique su correo electrónico para continuar",
            action: {
              label: "Reenviar",
              onClick: async () => {
                await resendEmailVerification({ email });
              },
            },
            actionButtonStyle: {
              padding: 16,
            },
          });
          return;
        }

        throw new Error(response.message);
      }

      if (!response.data?.token || !response.data?.user) {
        throw new Error("Correo electrónico o contraseña inválidos");
      }

      localStorage.setItem("session_token", response.data?.token);
      dispatch(loginSuccess(response.data?.user));
      await refetch();

      toast.dismiss("logging-in");
      navigate({ to: "/agenda" });
      toast.success("Sesión Iniciada");
    } catch (error) {
      toast.dismiss("logging-in");
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Ha ocurrido un error inesperado");
      }
    }
  };

  const handleLogout = () => {
    try {
      dispatch(logout());
      localStorage.removeItem("session_token");
      navigate({ to: "/" });
      toast.success("Sesión Terminada");
    } catch (error) {
      toast.error("Ocurrió un error al cerrar sesión");
    }
  };

  const handlePersistentSession = () => {
    const session_exists =
      !!localStorage.getItem("session_token") && !!currentUser;

    if (session_exists) {
      navigate({ to: "/agenda" });
      toast(`¡Hola, ${currentUser?.name}! Bienvenido de nuevo 😊`);
    }
  };

  return {
    handleSignUp,
    handleLogin,
    handleLogout,
    handleRecoverPassword,
    session_exists: !!localStorage.getItem("session_token") && !!currentUser,
    handlePersistentSession,
  };
}

export default useAuth;
