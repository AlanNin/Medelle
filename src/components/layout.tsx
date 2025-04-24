import * as React from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import AppLogo from "@/assets/icons/AppLogo.png";
import { Button } from "./ui/button";
import useAuth from "@/hooks/use-auth";
import { DoorOpen } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { AddAppointmentComponent } from "./shared-custom/add-appointment";
import AddPatientComponent from "./shared-custom/add-patient";
import AddConsultationComponent from "./shared-custom/add-consultation";
import useKeyboardShortcuts from "@/lib/keyboard-shortcuts";
import IsOfflineChecker from "@/lib/offline-checker";

export default function Layout() {
  const router = useRouterState();

  if (router.location.pathname === "/") {
    return null;
  }

  const { handleLogout } = useAuth();

  const [isAgendaNewRegisterOpen, setIsAgendaNewRegisterOpen] =
    React.useState(false);

  const [isPatientNewRegisterOpen, setIsPatientNewRegisterOpen] =
    React.useState(false);

  const [isConsultationNewRegisterOpen, setIsConsultationNewRegisterOpen] =
    React.useState(false);

  const handleReload = () => {
    window.location.reload();
  };

  const handleForceReload = () => {
    window.location.href = window.location.href;
  };

  useKeyboardShortcuts();

  IsOfflineChecker();

  return (
    <>
      <Menubar className="rounded-none h-11 flex items-center justify-between p-4 py-6 fixed top-0 left-0 right-0 z-10">
        <div className="flex items-center gap-1">
          <Link to="/agenda">
            <img
              className="w-5 h-5 ml-3 mr-2 object-contain invert dark:invert-0"
              src={AppLogo}
              alt="AppLogo"
            />
          </Link>
          <MenubarMenu>
            <MenubarTrigger className="cursor-pointer hover:bg-primary/5">
              Agenda
            </MenubarTrigger>
            <MenubarContent>
              <Link to="/agenda">
                <MenubarItem className="cursor-pointer">
                  Ver <MenubarShortcut>Ctrl+1</MenubarShortcut>
                </MenubarItem>
              </Link>
              <MenubarItem disabled>Otros</MenubarItem>
              <MenubarSeparator />
              <MenubarSub>
                <MenubarSubTrigger className="cursor-pointer">
                  Acceso Rápido
                </MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem
                    className="cursor-pointer"
                    onClick={() => setIsAgendaNewRegisterOpen(true)}
                  >
                    Nuevo Registro
                  </MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger className="cursor-pointer hover:bg-primary/5">
              Pacientes
            </MenubarTrigger>
            <MenubarContent>
              <Link to="/patients">
                <MenubarItem className="cursor-pointer">
                  Ver <MenubarShortcut>Ctrl+2</MenubarShortcut>
                </MenubarItem>
              </Link>
              <MenubarItem disabled>Otros</MenubarItem>
              <MenubarSeparator />
              <MenubarSub>
                <MenubarSubTrigger className="cursor-pointer">
                  Acceso Rápido
                </MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem
                    className="cursor-pointer"
                    onClick={() => setIsPatientNewRegisterOpen(true)}
                  >
                    Nuevo Paciente
                  </MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger className="cursor-pointer hover:bg-primary/5">
              Consultas
            </MenubarTrigger>
            <MenubarContent>
              <Link to="/consultations">
                <MenubarItem className="cursor-pointer">
                  Ver <MenubarShortcut>Ctrl+3</MenubarShortcut>
                </MenubarItem>
              </Link>
              <MenubarItem disabled>Otros</MenubarItem>
              <MenubarSeparator />
              <MenubarSub>
                <MenubarSubTrigger className="cursor-pointer">
                  Acceso Rápido
                </MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem
                    className="cursor-pointer"
                    onClick={() => setIsConsultationNewRegisterOpen(true)}
                  >
                    Nueva Consulta
                  </MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger className="cursor-pointer hover:bg-primary/5">
              Vista
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem className="cursor-pointer" onClick={handleReload}>
                Recargar <MenubarShortcut>Ctrl+R</MenubarShortcut>
              </MenubarItem>
              <MenubarItem
                className="cursor-pointer"
                onClick={handleForceReload}
              >
                Forzar Recarga
                <MenubarShortcut className="ml-3">Ctrl+⇧+R</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger className="cursor-pointer hover:bg-primary/5">
              Mi cuenta
            </MenubarTrigger>
            <MenubarContent>
              <Link to="/account-settings">
                <MenubarItem className="cursor-pointer">Ajustes</MenubarItem>
              </Link>
              <MenubarSeparator />
              <MenubarItem className="cursor-pointer" onClick={handleLogout}>
                Cerrar Sesión
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger className="cursor-pointer hover:bg-primary/5">
              Configuración
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem className="cursor-pointer" disabled>
                General
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem className="cursor-pointer" disabled>
                Actualizaciones
              </MenubarItem>
              <Link to="/about">
                <MenubarItem className="cursor-pointer">Acerca De</MenubarItem>
              </Link>
            </MenubarContent>
          </MenubarMenu>
        </div>
        <div className="flex items-center gap-1">
          <TooltipProvider disableHoverableContent>
            <Tooltip delayDuration={100}>
              <TooltipTrigger asChild>
                <Button
                  className="rounded-full w-8 h-8 bg-background mr-2"
                  variant="outline"
                  size="icon"
                  onClick={handleLogout}
                >
                  <DoorOpen className="w-[1.2rem] h-[1.2rem]" />
                  <span className="sr-only">Cerrar Sesión</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Cerrar Sesión</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </Menubar>
      {isAgendaNewRegisterOpen && (
        <AddAppointmentComponent
          isOpen={isAgendaNewRegisterOpen}
          setIsOpen={setIsAgendaNewRegisterOpen}
        />
      )}
      {isPatientNewRegisterOpen && (
        <AddPatientComponent
          isOpen={isPatientNewRegisterOpen}
          setIsOpen={setIsPatientNewRegisterOpen}
        />
      )}
      {isConsultationNewRegisterOpen && (
        <AddConsultationComponent
          isOpen={isConsultationNewRegisterOpen}
          setIsOpen={setIsConsultationNewRegisterOpen}
        />
      )}
    </>
  );
}
