import { ipcMain } from "electron";
import axios from "axios";

const base = "auth";

ipcMain.handle(`${base}-sign-up`, async (event, data) => {
  const success = { message: "Data saved", data: data };
  return success;
});

ipcMain.handle(`${base}-sign-in`, async (event, data) => {
  const result = await axios.post(`${process.env.API_URL}auth/sign-in`, data);
  return result.data;
});
