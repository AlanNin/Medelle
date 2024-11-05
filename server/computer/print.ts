import { ipcMain, BrowserWindow, IpcMainInvokeEvent, app } from "electron";
import fs from "fs";
import path from "path";
import {
  PrintNotSilentProps,
  PrintSilentProps,
  PrintersListProps,
} from "@/types/print";

const base = "print";

ipcMain.handle(
  `${base}-load-printers`,
  async (_event: IpcMainInvokeEvent): Promise<PrintersListProps> => {
    return new Promise((resolve) => {
      // Create a new BrowserWindow
      const win = new BrowserWindow({
        show: false,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
        },
      });

      // Load a blank page in the BrowserWindow to get the printers list
      win.loadURL("about:blank");

      // Listen for the did-finish-load event and resolve with the printers list
      win.webContents.on("did-finish-load", async () => {
        try {
          // Get the printers list from the BrowserWindow
          const printerList = await win.webContents.getPrintersAsync();
          resolve(printerList); // Resolve with the printers list
        } catch (error) {
          console.error("Error getting printers:", error);
          resolve([]); // Resolve with an empty array in case of error
        } finally {
          win.close(); // Ensure the window is closed
        }
      });
    });
  }
);

ipcMain.handle(
  `${base}-silent`,
  async (_event: IpcMainInvokeEvent, data: PrintSilentProps) => {
    if (!data.template || !data.printer) {
      return { success: false, error: "No template or printer provided" };
    }

    const tempDirPath = path.join(app.getPath("temp"), "silent-prints");
    const tempFilePath = path.join(tempDirPath, "temporal-template.html");

    fs.mkdirSync(tempDirPath, { recursive: true });

    fs.writeFileSync(tempFilePath, data.template);

    const win = new BrowserWindow({
      show: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    });

    win.loadFile(tempFilePath);

    return new Promise((resolve) => {
      win.webContents.on("did-finish-load", () => {
        win.webContents.print(
          {
            silent: true,
            printBackground: true,
            deviceName: data.printer,
            ...data.config,
          },
          async (success, errorType) => {
            try {
              fs.unlinkSync(tempFilePath);
            } catch (err) {
              console.warn("Error cleaning up temporary file:", err);
            }

            if (success) {
              resolve({ success: true });
            } else {
              resolve({ success: false, error: errorType || "Print failed" });
            }
          }
        );
      });

      win.on("closed", () => {
        win.destroy();
      });
    });
  }
);

ipcMain.handle(
  `${base}-not-silent`,
  async (_event: IpcMainInvokeEvent, data: PrintNotSilentProps) => {
    if (!data.template) {
      return { success: false, error: "No template" };
    }

    const tempDirPath = path.join(app.getPath("temp"), "not-silent-prints");
    fs.mkdirSync(tempDirPath, { recursive: true });
    const tempFilePath = path.join(tempDirPath, "temporal-template.html");

    fs.writeFileSync(tempFilePath, data.template);

    const win = new BrowserWindow({
      show: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    });

    win.loadFile(tempFilePath);

    return new Promise((resolve) => {
      win.webContents.on("did-finish-load", () => {
        win.webContents.print(
          { silent: false, printBackground: true, ...data.config },
          async (success, errorType) => {
            try {
              fs.unlinkSync(tempFilePath);
            } catch (err) {
              console.warn("Error cleaning up temporary file:", err);
            }

            if (success) {
              resolve({ success: true });
            } else {
              resolve({ success: false, error: errorType || "Print failed" });
            }
          }
        );
      });

      win.on("closed", () => {
        win.destroy();
      });
    });
  }
);
