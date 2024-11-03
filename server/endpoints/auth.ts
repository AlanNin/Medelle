import { IpcMainInvokeEvent, ipcMain } from "electron";
import axios from "axios";

const base = "auth";

ipcMain.handle(`${base}-sign-up`, async (_event: IpcMainInvokeEvent, data) => {
  const success = { message: "Data saved", data: data };
  return success;
});

ipcMain.handle(`${base}-sign-in`, async (_event: IpcMainInvokeEvent, data) => {
  try {
    const result = await axios.post(`${process.env.API_URL}auth/sign-in`, data);
    return result.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const status = error.response.status;

      if (status >= 400 && status < 500) {
        return {
          errorType: "user",
          message:
            error.response.data.message === "Supscription inactive"
              ? "Usuario no autorizado, tu suscripción ha expirado"
              : "Correo electrónico o contraseña inválidos" ||
                "Correo electrónico o contraseña inválidos",
        };
      }
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
      `${process.env.API_URL}auth/verify-session`,
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }
    );
    return result.data;
  }
);
