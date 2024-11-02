import { IpcMainInvokeEvent, ipcMain } from "electron";
import fs from "fs";
import path from "path";

const base = "converter";

ipcMain.handle(`${base}-image-64`, async (event: IpcMainInvokeEvent) => {
  const image = fs.readFileSync(
    path.join(process.cwd(), "public", "RxLogo.png")
  );
  return `data:image/png;base64,${image.toString("base64")}`;
});
