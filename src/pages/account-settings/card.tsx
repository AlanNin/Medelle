import { useState } from "react";
import { AvatarFallback, Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RootState } from "@/providers/react-redux/store";
import {
  Mail,
  LogOut,
  Edit,
  Phone,
  MapPin,
  User,
  Users,
  Trash,
  ShieldX,
  UserSearch,
  DollarSign,
  Info,
  Smartphone,
  GraduationCap,
} from "lucide-react";
import { useSelector } from "react-redux";
import formatDate from "@/lib/format-date";
import AccountSettingsUpdateComponent from "./update";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useAuth from "@/hooks/use-auth";
import UploadImageInheritComponent from "@/components/shared-custom/upload-image-inherit";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AccountSettingsDeleteComponent } from "./delete";
import { ChevronsUpDown, Plus } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function AccountSettingsCardComponent() {
  const queryClient = useQueryClient();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCollapsibleOpen, setIsCollapsibleOpen] = useState(false);

  const handleRefetchUserSession = async () => {
    await queryClient.refetchQueries({ queryKey: ["session"] });
  };

  const updateUserPhoto = async (image_url: string) => {
    toast.promise(
      (async () => {
        const result = await window.ipcRenderer.invoke("user-update", {
          token: localStorage.getItem("session_token"),
          data: { photo_url: image_url },
        });
        if (result) {
          handleRefetchUserSession();
        }
      })(),
      {
        loading: "Actualizando usuario...",
        success: "Usuario actualizado",
        error: "Ocurrió un error al actualizar usuario",
      }
    );
  };

  const deleteUserPhoto = async () => {
    toast.promise(
      (async () => {
        const result = await window.ipcRenderer.invoke("user-delete-field", {
          token: localStorage.getItem("session_token"),
          data: { field: "photo_url" },
        });
        if (result) {
          handleRefetchUserSession();
        }
      })(),
      {
        loading: "Eliminando foto de usuario...",
        success: "Foto de usuario eliminada",
        error: "Ocurrió un error al eliminar la foto de usuario",
      }
    );
  };

  const updateUserWorkLogo = async (image_url: string) => {
    toast.promise(
      (async () => {
        const result = await window.ipcRenderer.invoke("user-update", {
          token: localStorage.getItem("session_token"),
          data: { work_logo_url: image_url },
        });
        if (result) {
          handleRefetchUserSession();
        }
      })(),
      {
        loading: "Actualizando logo de trabajo...",
        success: "Logo de trabajo actualizado",
        error: "Ocurrió un error al actualizar el logo de trabajo",
      }
    );
  };

  const deleteUserWorkLogo = async () => {
    toast.promise(
      (async () => {
        const result = await window.ipcRenderer.invoke("user-delete-field", {
          token: localStorage.getItem("session_token"),
          data: { field: "work_logo_url" },
        });
        if (result) {
          handleRefetchUserSession();
        }
      })(),
      {
        loading: "Eliminando logo de trabajo...",
        success: "Logo de trabajo eliminado",
        error: "Ocurrió un error al eliminar el logo de trabajo",
      }
    );
  };

  const { handleLogout } = useAuth();

  const ProfileInfoItem = ({
    icon: Icon,
    label,
    value,
    tooltip,
  }: {
    icon: React.ElementType;
    label: string;
    value?: string;
    tooltip?: string;
  }) => (
    <div className="flex items-center space-x-3 py-2.5 border-b border-muted/30 last:border-b-0 w-full">
      <div className="bg-primary/5 p-2.5 rounded-full">
        <Icon className="h-4 w-4 text-primary" />
      </div>

      <div>
        {tooltip ? (
          <>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="flex items-center gap-1.5">
                  <p className="text-start text-xs font-medium tracking-wider uppercase line-clamp-2">
                    {label}
                  </p>
                  <Info className=" h-3 w-3 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
        ) : (
          <p className="text-xs font-medium tracking-wider uppercase line-clamp-2">
            {label}
          </p>
        )}
        <p className="font-medium text-sm text-muted-foreground line-clamp-3">
          {value || "No disponible"}
        </p>
      </div>
    </div>
  );

  return (
    <>
      <Card className="max-w-md w-full border-none shadow-xl rounded-2xl">
        <CardContent className="p-0">
          <CardHeader className="relative bg-gradient-to-t from-primary/0 to-primary/5 pt-8 pb-6 px-6">
            <div className="absolute top-4 right-4">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-primary/5"
                onClick={() => setIsUpdating(true)}
              >
                <Edit className="h-5 w-5 text-primary" />
              </Button>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="relative w-full flex items-center justify-center">
                <div className="flex flex-col items-start absolute left-0 top-[50%] translate-y-[-50%] text-center text-sm text-muted-foreground">
                  <UploadImageInheritComponent
                    onComplete={updateUserWorkLogo}
                    onDelete={
                      currentUser?.work_logo_url
                        ? deleteUserWorkLogo
                        : undefined
                    }
                    pencil_height={3}
                    pencil_width={3}
                    component_height="small"
                    folder="work_logos"
                    tooltip_title="Logo de trabajo"
                    tooptip_show_prescription={true}
                  >
                    <Avatar className="h-14 w-14 rounded-full bg-primary/5 flex items-center justify-center cursor-pointer">
                      <AvatarImage
                        src={currentUser?.work_logo_url}
                        alt={`${currentUser?.name} - Work Logo`}
                        className="object-cover"
                      />
                      <AvatarFallback className="text-3xl font-bold text-primary bg-primary/0">
                        <Plus className="h-4 w-4 text-primary/35" />
                      </AvatarFallback>
                    </Avatar>
                  </UploadImageInheritComponent>
                </div>
                <UploadImageInheritComponent
                  onComplete={updateUserPhoto}
                  onDelete={
                    currentUser?.photo_url ? deleteUserPhoto : undefined
                  }
                  folder="profile_photos"
                  tooltip_title="Imagen de perfil"
                >
                  <Avatar className="h-24 w-24 ring-4 ring-primary/10 cursor-pointer">
                    <AvatarImage
                      src={currentUser?.photo_url}
                      alt={`${currentUser?.name} - Avatar`}
                      className="object-cover"
                    />
                    <AvatarFallback className="text-3xl font-bold text-primary uppercase">
                      {currentUser && currentUser.name
                        ? currentUser.name[0] + (currentUser.name[1] || "")
                        : ""}
                    </AvatarFallback>
                  </Avatar>
                </UploadImageInheritComponent>
              </div>
              <div className="text-center flex flex-col gap-1 items-center">
                <h2 className="text-xl font-semibold text-primary">
                  {currentUser?.name}
                </h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4 " />
                  <p className="text-sm">
                    {currentUser?.role === "administrator"
                      ? "Administrador"
                      : currentUser?.role === "privileged"
                      ? "Privilegiado"
                      : "Usuario"}
                  </p>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="px-6 space-y-1">
            <ProfileInfoItem
              icon={UserSearch}
              label="ID"
              value={currentUser?._id}
            />
            <ProfileInfoItem
              icon={GraduationCap}
              label="Especialidad"
              value={currentUser?.speciality || "No registrada"}
            />
            <ProfileInfoItem
              icon={Mail}
              label="Correo"
              value={currentUser?.email}
            />

            <Collapsible
              open={isCollapsibleOpen}
              onOpenChange={setIsCollapsibleOpen}
            >
              <div className="flex items-center justify-between">
                <ProfileInfoItem
                  icon={Users}
                  label="Género"
                  value={
                    currentUser?.gender === "male"
                      ? "Masculino"
                      : currentUser?.gender === "female"
                      ? "Femenino"
                      : currentUser?.gender === "other"
                      ? "Otro"
                      : "No registrada"
                  }
                />
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="px-3 text-muted-foreground bg-primary/[0.035]"
                  >
                    Mostrar {isCollapsibleOpen ? "menos" : "más"}
                    <ChevronsUpDown className="h-4 w-4" />
                    <span className="sr-only">Toggle</span>
                  </Button>
                </CollapsibleTrigger>
              </div>

              <CollapsibleContent className="mt-1 space-y-1">
                <ProfileInfoItem
                  icon={Smartphone}
                  label="Teléfono personal"
                  value={currentUser?.personal_phone || "No registrado"}
                  tooltip="Este número se podrá mostrar al imprimir una prescripción"
                />
                <ProfileInfoItem
                  icon={Phone}
                  label="Teléfono laboral"
                  value={currentUser?.work_phone || "No registrado"}
                  tooltip="Este número se podrá mostrar al imprimir una prescripción"
                />
                <ProfileInfoItem
                  icon={MapPin}
                  label="Dirección laboral"
                  value={currentUser?.work_address || "No registrada"}
                  tooltip="Esta dirección se podrá mostrar al imprimir una prescripción"
                />
                <ProfileInfoItem
                  icon={DollarSign}
                  label="Suscripción"
                  value={
                    currentUser?.subscription?.type === "single-purchase"
                      ? "Compra única"
                      : currentUser?.subscription?.type === "active"
                      ? `Activa - Hasta el ${formatDate(
                          currentUser?.subscription.due_date!
                        )}`
                      : currentUser?.subscription?.type === "inactive"
                      ? "Inactiva"
                      : "No registrada"
                  }
                />
              </CollapsibleContent>
            </Collapsible>
          </CardContent>

          <CardFooter className="flex flex-col gap-2 items-center">
            <Button
              variant="outline"
              className="w-full rounded-md"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" /> Cerrar Sesión
            </Button>
            <div className="flex gap-2 w-full">
              <Button variant="outline" className="w-full rounded-md">
                <ShieldX className="mr-2 h-4 w-4" /> Terminar Suscripción
              </Button>
              <Button
                variant="default"
                className="w-full rounded-md"
                onClick={() => setIsDeleting(true)}
              >
                <Trash className="mr-2 h-4 w-4" /> Eliminar Cuenta
              </Button>
            </div>
          </CardFooter>
        </CardContent>
      </Card>
      {isUpdating && (
        <AccountSettingsUpdateComponent
          isOpen={isUpdating}
          setIsOpen={setIsUpdating}
          user={currentUser!}
        />
      )}
      {isDeleting && (
        <AccountSettingsDeleteComponent
          isOpen={isDeleting}
          setIsOpen={setIsDeleting}
        />
      )}
    </>
  );
}
