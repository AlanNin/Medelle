import { ipcMain } from "electron";
import axios from "axios";

const base = "consultation";

ipcMain.handle(`${base}-get-from-user`, async (event, data) => {
  const result = await axios.get(
    `${process.env.API_URL}consultation/get-from-user`,
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
    `${process.env.API_URL}consultation/create`,
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
  const { consultation_id, ...restData } = data.data;

  const result = await axios.put(
    `${process.env.API_URL}consultation/update/${consultation_id}`,
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
    `${process.env.API_URL}consultation/delete/${data.data.consultation_id}`,
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    }
  );

  return result.data;
});
