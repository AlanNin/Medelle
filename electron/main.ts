import { app, BrowserWindow } from "electron";
import { autoUpdater } from "electron-updater";
import { fileURLToPath } from "node:url";
import path from "node:path";
import dotenv from "dotenv";
import "../server";
import { UpdateProps } from "@/types/update";

autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";
dotenv.config({ path: envFile });

const __dirname = path.dirname(fileURLToPath(import.meta.url));

process.env.APP_ROOT = path.join(__dirname, "..");

export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

let win: BrowserWindow | undefined;
let updatePopupWin: BrowserWindow | undefined;

function createWindow() {
  win = new BrowserWindow({
    title: "Médelle",
    icon: path.join(__dirname, "../build/icon.png"),
    frame: true,
    show: false,
    resizable: true,
    fullscreenable: true,
    autoHideMenuBar: true,
    width: 1040,
    height: 807,
    minWidth: 1040,
    minHeight: 807,
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}

function createUpdatePopup() {
  updatePopupWin = new BrowserWindow({
    title: "Médelle - Actualización",
    icon: path.join(__dirname, "../build/icon.png"),
    width: 400,
    height: 250,
    show: false,
    frame: false,
    resizable: false,
    fullscreenable: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (VITE_DEV_SERVER_URL) {
    updatePopupWin.loadURL(`${VITE_DEV_SERVER_URL}/updater.html`);
  } else {
    updatePopupWin.loadFile(path.join(RENDERER_DIST, "updater.html"));
  }

  updatePopupWin.once("ready-to-show", () => {
    updatePopupWin?.show();
    autoUpdater.checkForUpdates();
    updateMainWindow({
      status: "checking",
      message: `${app.getVersion()}`,
    });
  });

  updatePopupWin.on("closed", () => {
    updatePopupWin = undefined;
    if (!win?.isVisible()) {
      app.quit();
    }
  });
}

function updateMainWindow(data: UpdateProps) {
  updatePopupWin?.webContents.send("update-message", data);
}

app.whenReady().then(() => {
  createWindow();

  if (process.env.NODE_ENV === "development") {
    win?.maximize();
    win?.show();
    return;
  }

  createUpdatePopup();
});

autoUpdater.on("update-available", (info) => {
  updateMainWindow({
    status: "available",
    message: `${info.version}`,
  });
  autoUpdater.downloadUpdate();
});

autoUpdater.on("update-not-available", () => {
  // updateMainWindow({
  //   status: "not-available",
  // });
  // setTimeout(() => {
  //   updatePopupWin?.close();
  //   win?.maximize();
  //   win?.show();
  // }, 1500);
  updatePopupWin?.close();
  win?.maximize();
  win?.show();
});

autoUpdater.on("error", (err) => {
  updateMainWindow({
    status: "error",
    message: `Error: ${err.message}`,
  });
  setTimeout(() => {
    app.quit();
    win = undefined;
    updatePopupWin = undefined;
  }, 2000);
});

autoUpdater.on("update-downloaded", () => {
  updateMainWindow({
    status: "downloaded",
  });
  setTimeout(() => {
    autoUpdater.quitAndInstall();
  }, 1500);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = undefined;
    updatePopupWin = undefined;
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
