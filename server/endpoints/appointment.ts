import { ipcMain } from "electron";
import axios from "axios";

const base = "appointment";

ipcMain.handle(`${base}-add`, async (event, data) => {
  const result = await axios.post(
    `${process.env.API_URL}appointment/create`,
    data.data,
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    }
  );
  return result.data;
});

ipcMain.handle(`${base}-get-from-user`, async (event, data) => {
  const result = await axios.get(
    `${process.env.API_URL}appointment/get-from-user`,
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    }
  );
  return result.data;
});
