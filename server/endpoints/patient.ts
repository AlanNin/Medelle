import { ipcMain } from "electron";
import axios from "axios";

const base = "patient";

ipcMain.handle(`${base}-get-from-user`, async (event, data) => {
  const result = await axios.get(
    `${process.env.API_URL}patient/get-from-user`,
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    }
  );
  return result.data;
});

ipcMain.handle(`${base}-add`, async (event, data) => {
  const result = await axios.post(
    `${process.env.API_URL}patient/create`,
    data.data,
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    }
  );
  return result.data;
});
