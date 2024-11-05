import { IpcMainInvokeEvent, ipcMain } from "electron";

const base = "converter";

ipcMain.handle(
  `${base}-image-64`,
  async (_event: IpcMainInvokeEvent, image_url: string) => {
    try {
      const response = await fetch(image_url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const arrayBuffer = await response.arrayBuffer();

      const buffer = Buffer.from(arrayBuffer);

      return `data:image/png;base64,${buffer.toString("base64")}`;
    } catch (error) {
      console.error(`Ocurrió un error al obtener la imagen: ${error}`);
      // Maneja el error según lo necesites
      throw new Error("Ocurrió un error al convertir la imagen a base64");
    }
  }
);
