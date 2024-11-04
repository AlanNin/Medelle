import { IpcMainInvokeEvent, ipcMain } from "electron";
import axios from "axios";

const base = "user";

ipcMain.handle(`${base}-update`, async (_event: IpcMainInvokeEvent, data) => {
  const result = await axios.put(
    `${import.meta.env.VITE_API_URL}user/update`,
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
  const result = await axios.delete(
    `${import.meta.env.VITE_API_URL}user/delete`,
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    }
  );

  return result.data;
});

ipcMain.handle(
  `${base}-delete-field`,
  async (_event: IpcMainInvokeEvent, data) => {
    const result = await axios.put(
      `${import.meta.env.VITE_API_URL}user/delete-field`,
      data.data,
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }
    );

    return result.data;
  }
);
