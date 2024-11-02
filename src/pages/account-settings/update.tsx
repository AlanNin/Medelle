"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { UserProps } from "@/types/user";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  user: UserProps;
};

type PasswordInputsProps = {
  old_password: string | undefined;
  new_password: string | undefined;
  confirm_new_password: string | undefined;
};

export default function AccountSettingsUpdateComponent({
  isOpen,
  setIsOpen,
  user,
}: Props) {
  const queryClient = useQueryClient();

  const [inputs, setInputs] = React.useState<UserProps>({
    name: user?.name,
    speciality: user?.speciality,
    email: user?.email,
    personal_phone: user?.personal_phone,
    work_phone: user?.work_phone,
    work_address: user?.work_address,
    gender: user?.gender,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleInputSelectChange = (name: keyof UserProps, value: string) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const [passwordInputs, setPasswordInputs] = React.useState<
    PasswordInputsProps
  >({
    old_password: undefined,
    new_password: undefined,
    confirm_new_password: undefined,
  });

  const handleInputPasswordsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setPasswordInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleRefetchUserSession = async () => {
    await queryClient.refetchQueries({ queryKey: ["session"] });
  };

  const isDisabled = Boolean(
    !inputs.name ||
      !inputs.email ||
      (passwordInputs.old_password &&
        (!passwordInputs.new_password ||
          !passwordInputs.confirm_new_password)) ||
      (!passwordInputs.old_password &&
        (passwordInputs.new_password || passwordInputs.confirm_new_password))
  );

  const isPasswordsDifferent =
    passwordInputs.old_password &&
    passwordInputs.new_password &&
    passwordInputs.confirm_new_password &&
    passwordInputs.new_password !== passwordInputs.confirm_new_password;

  const updateUser = async () => {
    try {
      if (isDisabled) {
        toast.error("Por favor, rellena todos los campos requeridos");
        return;
      }

      if (isPasswordsDifferent) {
        toast.error("Las contraseñas no coinciden");
        return;
      }

      const result = await window.ipcRenderer.invoke("user-update", {
        token: localStorage.getItem("session_token"),
        data: { ...inputs, ...passwordInputs },
      });
      if (result) {
        handleRefetchUserSession();
        toast.success("Paciente actualizado");
        setIsOpen(false);
      }
    } catch (error) {
      if (passwordInputs.old_password) {
        toast.error("La contraseña anterior es incorrecta");
      } else {
        toast.error("Error al actualizar usuario");
      }
    }
  };

  return (
    <>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent disableAnimation className="p-0">
          <AlertDialogHeader className="pt-6 px-6 space-y-0">
            <AlertDialogTitle>Actualizar perfil</AlertDialogTitle>
            <AlertDialogDescription>
              Modifica tu información personal. Al terminar haz click en
              actualizar.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <ScrollArea className="h-full w-full ">
            <div className="px-6 py-2">
              {/* grid 1 */}
              <div className="grid grid-cols-2 gap-10 ">
                {/* col 1 */}
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2.5 items-start">
                    <Label className="text-right">
                      Nombre <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      name="name"
                      value={inputs.name}
                      onChange={(e) => handleInputChange(e)}
                      placeholder="Ej: John Doe"
                    />
                  </div>
                  <div className="flex flex-col gap-2.5 items-start">
                    <Label className="text-right">
                      Correo <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      name="email"
                      value={inputs.email}
                      onChange={(e) => handleInputChange(e)}
                      placeholder="Ej: m@dominio.com"
                    />
                  </div>
                  <div className="flex flex-col gap-2.5 items-start">
                    <Label className="text-right">Teléfono personal</Label>
                    <Input
                      name="personal_phone"
                      value={inputs.personal_phone}
                      onChange={(e) => handleInputChange(e)}
                      placeholder="Ej: +1 (555) 555-5555"
                    />
                  </div>
                  <div className="flex flex-col gap-2.5 items-start">
                    <Label className="text-right">Teléfono laboral</Label>
                    <Input
                      name="work_phone"
                      value={inputs.work_phone}
                      onChange={(e) => handleInputChange(e)}
                      placeholder="Ej: +1 (555) 555-5555"
                    />
                  </div>
                  <div className="flex flex-col gap-2.5 items-start">
                    <Label className="text-right">Ubicación laboral</Label>
                    <Input
                      name="work_address"
                      value={inputs.work_address}
                      onChange={(e) => handleInputChange(e)}
                      placeholder="Escribe aquí..."
                    />
                  </div>
                </div>

                {/* col 2 */}
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2.5 items-start">
                    <Label className="text-right">Género</Label>
                    <Select
                      name="gender"
                      value={inputs.gender}
                      onValueChange={(value) =>
                        handleInputSelectChange("gender", value)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona un género" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Masculino</SelectItem>
                        <SelectItem value="female">Femenino</SelectItem>
                        <SelectItem value="other">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-2.5 items-start">
                    <Label className="text-right">Especialidad</Label>
                    <Input
                      name="speciality"
                      value={inputs.speciality}
                      onChange={(e) => handleInputChange(e)}
                      placeholder="Escribe aquí..."
                    />
                  </div>
                  <div className="flex flex-col gap-2.5 items-start">
                    <Label className="text-right">Contraseña actual </Label>{" "}
                    <Input
                      name="old_password"
                      value={passwordInputs.old_password}
                      onChange={(e) => handleInputPasswordsChange(e)}
                      placeholder="••••••••"
                      type="password"
                    />
                  </div>
                  <div className="flex flex-col gap-2.5 items-start">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="flex items-center gap-1.5">
                          <Label className="text-right">Nueva contraseña</Label>
                          <Info className=" h-3 w-3 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            La contraseña debe tener al menos 1 letra mayúscula,
                            1 número y 8 caracteres
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <Input
                      name="new_password"
                      value={passwordInputs.new_password}
                      onChange={(e) => handleInputPasswordsChange(e)}
                      placeholder="••••••••"
                      type="password"
                      disabled={!passwordInputs.old_password}
                    />
                  </div>
                  <div className="flex flex-col gap-2.5 items-start">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="flex items-center gap-1.5">
                          <Label className="text-right">
                            Confirmar nueva contraseña
                          </Label>
                          <Info className=" h-3 w-3 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            La contraseña debe tener al menos 1 letra mayúscula,
                            1 número y 8 caracteres
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <Input
                      name="confirm_new_password"
                      value={passwordInputs.confirm_new_password}
                      onChange={(e) => handleInputPasswordsChange(e)}
                      placeholder="••••••••"
                      type="password"
                      disabled={!passwordInputs.old_password}
                    />
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
          <AlertDialogFooter className="pb-6 px-6 flex items-center">
            <Button
              variant="outline"
              type="submit"
              onClick={() => setIsOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" onClick={updateUser} disabled={isDisabled}>
              Actualizar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
