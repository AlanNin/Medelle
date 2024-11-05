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
import Store from "electron-store";

const base = "export";
const appConfig = new Store<AppConfigProps>();

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
    const tempDirPath = path.join(app.getPath("temp"), "pdf-exports");
    const tempFilePath = path.join(tempDirPath, "temporal-template.html");

    fs.mkdirSync(tempDirPath, { recursive: true });
    fs.writeFileSync(tempFilePath, data.template);

    let win: BrowserWindow | null = null;
    let tempPath: string = "";

    try {
      win = new BrowserWindow({
        width: 595,
        height: 842,
        show: false,
        webPreferences: { nodeIntegration: true },
      });

      tempPath = path.join(tempDirPath, `temp-${Date.now()}.html`);
      await fs.promises.copyFile(tempFilePath, tempPath);
      await win.loadFile(tempPath);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const pdfOptions: PrintToPDFOptions = {
        printBackground: true,
        ...data?.config,
      };

      const pdfBuffer = await win.webContents.printToPDF(pdfOptions);

      const lastPath =
        appConfig.get("lastSavePath") || app.getPath("documents");
      const { canceled, filePath } = await dialog.showSaveDialog({
        defaultPath: path.join(lastPath, "Prescription - Patient Care.pdf"),
        filters: [{ name: "PDF", extensions: ["pdf"] }],
        properties: ["createDirectory"],
      });

      if (canceled || !filePath) {
        return { success: false, canceled: true };
      }

      appConfig.set("lastSavePath", path.dirname(filePath));
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
