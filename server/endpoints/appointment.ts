import { IpcMainInvokeEvent, ipcMain } from "electron";
import axios from "axios";

const base = "appointment";

ipcMain.handle(`${base}-add`, async (_event: IpcMainInvokeEvent, data) => {
  const result = await axios.post(
    `${import.meta.env.VITE_API_URL}appointment/create`,
    data.data,
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    }
  );
  return result.data;
});

ipcMain.handle(`${base}-update`, async (_event: IpcMainInvokeEvent, data) => {
  const { appointment_id, ...restData } = data.data;

  const result = await axios.put(
    `${import.meta.env.VITE_API_URL}appointment/update/${appointment_id}`,
    restData,
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
    `${import.meta.env.VITE_API_URL}appointment/delete/${
      data.data.appointment_id
    }`,
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    }
  );

  return result.data;
});

ipcMain.handle(
  `${base}-get-from-user`,
  async (_event: IpcMainInvokeEvent, data) => {
    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}appointment/get-from-user`,
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
  `${base}-get-from-patient`,
  async (_event: IpcMainInvokeEvent, data) => {
    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}appointment/get-from-patient/${
        data.patient_id
      }`,
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }
    );
    return result.data;
  }
);
