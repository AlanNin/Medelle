import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import useAuth from "@/hooks/use-auth";
import { toast } from "sonner";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export function AccountSettingsDeleteComponent({ isOpen, setIsOpen }: Props) {
  const { handleLogout } = useAuth();

  const handleDeleteAccount = async () => {
    toast.promise(
      (async () => {
        const result = await window.ipcRenderer.invoke("user-delete", {
          token: localStorage.getItem("session_token"),
        });
        if (result) {
          setIsOpen(false);
          handleLogout();
        }
      })(),
      {
        loading: "Eliminando cuenta...",
        success: "Cuenta eliminada",
        error: "Ocurrió un error al eliminar cuenta",
      }
    );
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Estás seguro de eliminar tu cuenta?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Esto eliminará permanentemente tu
            cuenta y todos tus datos.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteAccount}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
