import {
  ipcMain,
  BrowserWindow,
  PrintToPDFOptions,
  app,
  dialog,
  IpcMainInvokeEvent,
} from "electron";
import path from "path";
import fs from "fs";
import { PdfDataProps, PdfResultProps } from "@/types/pdf";
import { fileURLToPath } from "url";
import { dirname } from "path";
import Store from "electron-store";

// get the current file path and directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const appConfig = new Store<AppConfigProps>();
const base = "export";

// function to safely clean temporary files
const safeCleanup = async (filePath: string): Promise<void> => {
  if (fs.existsSync(filePath)) {
    try {
      await fs.promises.unlink(filePath);
    } catch (error) {
      console.warn("error during cleanup:", error);
    }
  }
};

// main function to handle PDF export
ipcMain.handle(
  `${base}-pdf`,
  async (
    _event: IpcMainInvokeEvent,
    data: PdfDataProps
  ): Promise<PdfResultProps> => {
    const tempDirPath = path.join(__dirname, "temp");
    const tempFilePath = path.join(tempDirPath, "temporal-template.html");

    // create the temp directory if it doesn't exist
    fs.mkdirSync(tempDirPath, { recursive: true });
    fs.writeFileSync(tempFilePath, data.template);

    let win: BrowserWindow | null = null;
    let tempPath: string = "";

    try {
      // create a hidden window
      win = new BrowserWindow({
        width: 595, // a4 size
        height: 842,
        show: false,
        webPreferences: { nodeIntegration: true },
      });

      // ensure the temporary folder exists
      const tempDir = path.join(app.getPath("temp"), "pdf-exports");
      await fs.promises.mkdir(tempDir, { recursive: true });

      // create a unique named temporary HTML file
      tempPath = path.join(tempDir, `temp-${Date.now()}.html`);
      await fs.promises.copyFile(tempFilePath, tempPath);

      // load the HTML file and wait for it to finish
      await win.loadFile(tempPath);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // wait for content to load

      // set print options
      const pdfOptions: PrintToPDFOptions = {
        printBackground: true,
        ...data?.config,
      };

      // generate PDF
      const pdfBuffer = await win.webContents.printToPDF(pdfOptions);

      // get last path used
      const lastPath =
        appConfig.get("lastSavePath") || app.getPath("documents");

      // show dialog to save file
      const { canceled, filePath } = await dialog.showSaveDialog({
        defaultPath: path.join(lastPath, "Prescription - Patient Care.pdf"),
        filters: [{ name: "PDF", extensions: ["pdf"] }],
        properties: ["createDirectory"],
      });

      if (canceled || !filePath) {
        return { success: false, canceled: true };
      }

      if (!canceled && filePath) {
        appConfig.set("lastSavePath", path.dirname(filePath));
      }

      // save the PDF in the selected location
      await fs.promises.writeFile(filePath, pdfBuffer);
      return { success: true, path: filePath };
    } catch (error) {
      console.error("error generating PDF:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "unknown error",
      };
    } finally {
      fs.unlinkSync(tempFilePath); // always delete the temporary HTML file
      await safeCleanup(tempPath); // cleanup temporary HTML file if it exists
      if (win) win.destroy(); // destroy the window if it exists
    }
  }
);
