import axios from "axios";
import { toast } from "sonner";

export default function internetChecker() {
  let isOffline = false;

  setInterval(async () => {
    try {
      await axios.get(`${import.meta.env.VITE_API_URL}health`);

      if (isOffline) {
        toast.dismiss("no-internet");
        isOffline = false;
      }
    } catch (error) {
      if (!isOffline) {
        toast.loading("Por favor, comprueba tu conexión a internet", {
          duration: Infinity,
          id: "no-internet",
        });
        isOffline = true;
      }
    }
  }, 5 * 60 * 1000);
}
