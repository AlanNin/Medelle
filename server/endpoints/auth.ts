import { IpcMainInvokeEvent, ipcMain } from "electron";
import axios from "axios";

const base = "auth";

ipcMain.handle(`${base}-sign-up`, async (event: IpcMainInvokeEvent, data) => {
  const success = { message: "Data saved", data: data };
  return success;
});

ipcMain.handle(`${base}-sign-in`, async (event: IpcMainInvokeEvent, data) => {
  const result = await axios.post(`${process.env.API_URL}auth/sign-in`, data);
  return result.data;
});

ipcMain.handle(
  `${base}-verify-session`,
  async (event: IpcMainInvokeEvent, data) => {
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
