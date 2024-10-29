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

ipcMain.handle(`${base}-update`, async (event, data) => {
  const { appointment_id, ...restData } = data.data;

  const result = await axios.put(
    `${process.env.API_URL}appointment/update/${appointment_id}`,
    restData,
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    }
  );

  return result.data;
});

ipcMain.handle(`${base}-delete`, async (event, data) => {
  const result = await axios.delete(
    `${process.env.API_URL}appointment/delete/${data.data.appointment_id}`,
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
