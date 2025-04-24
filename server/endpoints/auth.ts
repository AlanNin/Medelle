import { IpcMainInvokeEvent, ipcMain } from "electron";
import axios from "axios";

const base = "auth";

ipcMain.handle(`${base}-sign-in`, async (_event: IpcMainInvokeEvent, data) => {
  try {
    const result = await axios.post(
      `${import.meta.env.VITE_API_URL}auth/sign-in`,
      data
    );
    return result.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const message = error.response.data.message;

      if (message.includes("Invalid email or password")) {
        return {
          errorType: "invalid-credentials",
          message: "Correo electrónico o contraseña inválidos",
        };
      }

      if (message.includes("Subscription inactive")) {
        return {
          errorType: "subscription-inactive",
          message: "Suscripción inactiva",
          data: error.response.data,
        };
      }

      if (message.includes("Email not verified")) {
        return {
          errorType: "email-not-verified",
          message: "Email no verificado",
          data: error.response.data,
        };
      }

      return {
        errorType: "server",
        message: "Error interno del servidor. Inténtelo más tarde.",
      };
    }

    return {
      errorType: "server",
      message: "Error interno del servidor. Inténtelo más tarde.",
    };
  }
});

ipcMain.handle(
  `${base}-verify-session`,
  async (_event: IpcMainInvokeEvent, data) => {
    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}auth/verify-session`,
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }
    );
    return result.data;
  }
);

ipcMain.handle(
  `${base}-resend-verification`,
  async (_event: IpcMainInvokeEvent, data) => {
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_API_URL}auth/resend-email-verification`,
        data
      );
      return result.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return {
          errorType: "server",
          message: "Error interno del servidor. Inténtelo más tarde.",
        };
      }

      return {
        errorType: "server",
        message: "Error interno del servidor. Inténtelo más tarde.",
      };
    }
  }
);
