import { IpcMainInvokeEvent, ipcMain } from "electron";
import axios from "axios";

const base = "user";

ipcMain.handle(`${base}-update`, async (_event: IpcMainInvokeEvent, data) => {
  const result = await axios.put(
    `${process.env.API_URL}user/update`,
    data.data,
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    }
  );

  return result.data;
});

ipcMain.handle(`${base}-delete`, async (_event: IpcMainInvokeEvent, data) => {
  const result = await axios.delete(`${process.env.API_URL}user/delete`, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });

  return result.data;
});
