import { IpcMainInvokeEvent, ipcMain } from "electron";
import Store from "electron-store";

const appConfig = new Store<AppConfigProps>();

const base = "config";

ipcMain.handle(`${base}-load`, async (event: IpcMainInvokeEvent) => {
  const appConfigData = appConfig.store;
  return appConfigData || {};
});

ipcMain.handle(`${base}-save`, async (event: IpcMainInvokeEvent, data) => {
  Object.keys(data).forEach((key) => {
    appConfig.set(key, data[key]);
  });
});
