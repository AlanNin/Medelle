import { ipcMain, BrowserWindow, IpcMainInvokeEvent } from "electron";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import {
  PrintNotSilentProps,
  PrintSilentProps,
  PrintersListProps,
} from "@/types/print";

const base = "print";

// get the current file path
const __filename = fileURLToPath(import.meta.url);

// get the directory path of the current file
const __dirname = dirname(__filename);

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
    // validate inputs
    if (!data.template || !data.printer)
      return { success: false, error: "No template or printer provided" };

    // get the current file path
    const tempDirPath = path.join(__dirname, "temp");

    // get the file path for the temporary HTML file
    const tempFilePath = path.join(tempDirPath, "temporal-template.html");

    // create the temp directory if it doesn't exist
    if (!fs.existsSync(tempDirPath)) {
      fs.mkdirSync(tempDirPath, { recursive: true });
    }

    // write the template to the temporary HTML file
    fs.writeFileSync(tempFilePath, data.template);

    // create a new BrowserWindow
    const win = new BrowserWindow({
      show: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    });

    // if the browserWindow is not created, return
    if (!win) return;

    // load the temporary HTML file in the browserWindow
    win.loadURL(tempFilePath);

    // listen for the did-finish-load event and print the template
    win.webContents.on("did-finish-load", async () => {
      // print the template with the silent option set to true (just print, no dialog) and printBackground set to true
      win.webContents.print(
        {
          silent: true,
          printBackground: true,
          deviceName: data?.printer,
          ...data?.config,
        },
        (success, errorType) => {
          // error handling
          if (success) {
            return { success: false, error: errorType };
          }

          // delete the temporary HTML file
          fs.unlinkSync(tempFilePath);

          // resolve with the success message
          return { success: true };
        }
      );
    });
  }
);

ipcMain.handle(
  `${base}-not-silent`,
  async (_event: IpcMainInvokeEvent, data: PrintNotSilentProps) => {
    // validate inputs
    if (!data.template) return { success: false, error: "No template" };

    // get the current file path
    const tempDirPath = path.join(__dirname, "temp");

    // get the file path for the temporary HTML file
    const tempFilePath = path.join(tempDirPath, "temporal-template.html");

    // create the temp directory if it doesn't exist
    if (!fs.existsSync(tempDirPath)) {
      fs.mkdirSync(tempDirPath, { recursive: true });
    }

    // write the template to the temporary HTML file
    fs.writeFileSync(tempFilePath, data.template);

    // create a new BrowserWindow
    const win = new BrowserWindow({
      show: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    });

    // if the browserWindow is not created, return
    if (!win) return;

    // load the temporary HTML file in the browserWindow
    win.loadURL(tempFilePath);

    // listen for the did-finish-load event and print the template
    win.webContents.on("did-finish-load", async () => {
      // print the template with the silent option set to false (open a dialog with options) and printBackground set to true
      win.webContents.print(
        { silent: false, printBackground: true, ...data?.config },
        (success, errorType) => {
          // error handling
          if (success) {
            return { success: false, error: errorType };
          }

          // delete the temporary HTML file
          fs.unlinkSync(tempFilePath);

          // resolve with the success message
          return { success: true };
        }
      );
    });
  }
);
