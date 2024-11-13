import axios from "axios";
import { IpcMainInvokeEvent, ipcMain, shell, app, dialog } from "electron";
import Store from "electron-store";
import path from "path";
import fs from "fs";

const base = "file-explorer";
const appConfig = new Store<AppConfigProps>();

ipcMain.handle(
  `${base}-open-file`,
  async (_event: IpcMainInvokeEvent, path: string) => {
    await shell.openPath(path);
  }
);

ipcMain.handle(
  `${base}-open-folder`,
  async (_event: IpcMainInvokeEvent, path: string) => {
    await shell.showItemInFolder(path);
  }
);

ipcMain.handle(
  `${base}-save-image`,
  async (_event: IpcMainInvokeEvent, url: string) => {
    const lastPath = appConfig.get("lastSavePath") || app.getPath("documents");

    const savePath = await dialog.showSaveDialog({
      defaultPath: path.join(lastPath, "image.jpg"),
      filters: [{ name: "Images", extensions: ["jpg", "jpeg", "png", "gif"] }],
    });

    if (!savePath.canceled && savePath.filePath) {
      try {
        const response = await axios.get(url, {
          responseType: "arraybuffer",
        });

        await fs.promises.writeFile(savePath.filePath, response.data);

        appConfig.set("lastSavePath", path.dirname(savePath.filePath));

        return true;
      } catch (error) {
        console.error("Error downloading or saving the file:", error);
      }
    }
  }
);
