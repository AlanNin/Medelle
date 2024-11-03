import { IpcMainInvokeEvent, ipcMain } from "electron";
import Store from "electron-store";

const appConfig = new Store<AppConfigProps>();

const base = "config";

ipcMain.handle(`${base}-load`, async (_event: IpcMainInvokeEvent) => {
  const appConfigData = appConfig.store;
  return appConfigData || {};
});

ipcMain.handle(`${base}-save`, async (_event: IpcMainInvokeEvent, data) => {
  Object.keys(data).forEach((key) => {
    appConfig.set(key, data[key]);
  });
});
