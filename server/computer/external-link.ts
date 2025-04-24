import { ipcMain, shell, IpcMainInvokeEvent } from "electron";

const base = "external-link";

ipcMain.handle(
  `${base}-open`,
  async (_event: IpcMainInvokeEvent, link: string) => {
    try {
      await shell.openExternal(link);
    } catch (error) {
      console.error(`Failed to open link: ${link}`, error);
    }
  }
);
