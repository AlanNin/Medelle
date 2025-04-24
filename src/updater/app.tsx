import AppLogo from "@/assets/icons/AppLogo.png";
import { UpdateProps } from "@/types/update";
import { Frown, Loader2 } from "lucide-react";
import { useState } from "react";

export default function UpdaterApp() {
  const [status, setStatus] = useState<UpdateProps>({
    status: "checking",
  });

  window.ipcRenderer.on("update-message", (_, data) => {
    setStatus(data);
  });

  const renderUpdateStatus = () => {
    switch (status.status) {
      case "checking":
        return (
          <div className="flex flex-col items-center">
            <h1 className="text-base text-muted-foreground">
              Verificando actualizaciones
              <span className="typing-dots"></span>
            </h1>
          </div>
        );

      case "available":
        return (
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-base text-muted-foreground">
              ¡Nueva actualización disponible!
            </h1>
            <p className="text-sm text-muted-foreground italic">
              Descargando versión {status.message ?? "?.?.?"}
            </p>
          </div>
        );

      //   case "not-available":
      //     return (
      //       <div className="flex flex-col items-center gap-4">
      //         <h1 className="text-base text-muted-foreground">
      //           No hay actualizaciones disponibles
      //         </h1>
      //       </div>
      //     );

      case "error":
        return (
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-base text-muted-foreground">
              Ocurrió un error al verificar las actualizaciones
            </h1>
            <p className="text-sm text-muted-foreground italic">
              Terminando aplicación...
            </p>
          </div>
        );

      case "downloaded":
        return (
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-base text-muted-foreground">
              ¡Actualización descargada con éxito!
            </h1>
            <p className="text-sm text-muted-foreground italic">
              Instalando nueva versión...
            </p>
          </div>
        );

      default:
        return (
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-base text-muted-foreground">
              Estado desconocido
            </h1>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-8">
      <div className="flex items-center gap-4">
        <img
          src={AppLogo}
          className="w-10 h-10 dark:invert object-contain"
          alt="Logo"
        />
        <h1 className="text-4xl font-medium">Medelle</h1>
      </div>
      <div className="flex flex-col items-center gap-6">
        {renderUpdateStatus()}

        {status.status === "error" ? (
          <Frown className="w-6 h-6 text-muted-foreground" strokeWidth={1.2} />
        ) : (
          <Loader2
            className="animate-spin w-6 h-6 text-muted-foreground"
            strokeWidth={1.2}
          />
        )}
      </div>
    </div>
  );
}
