import { Link, useRouterState } from "@tanstack/react-router";
import {
  Menubar,
  MenubarCheckboxItem,
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
import AppLogo from "@/assets/icons/AppLogoBlack.png";
import { Button } from "./ui/button";
import useAuth from "@/hooks/use-auth";
import { DoorOpen } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export default function Layout() {
  const router = useRouterState();

  if (router.location.pathname === "/") {
    return null;
  }

  const { handleLogout } = useAuth();

  return (
    <Menubar className="rounded-none h-11 flex items-center justify-between p-4 py-6">
      <div className="flex items-center gap-1">
        <Link to="/agenda">
          <img
            className="w-5 h-5 ml-3 mr-2 dark:invert"
            src={AppLogo}
            alt="AppLogo"
          />
        </Link>
        <MenubarMenu>
          <MenubarTrigger className="cursor-pointer hover:bg-primary/5">
            Agenda
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem className="cursor-pointer">
              Ver <MenubarShortcut>Ctrl+A</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled>Otros</MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger className="cursor-pointer">
                Acceso Rápido
              </MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem className="cursor-pointer">
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
            <MenubarItem className="cursor-pointer">
              Lista <MenubarShortcut>Ctrl+P</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled>Otros</MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger className="cursor-pointer">
                Acceso Rápido
              </MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem className="cursor-pointer">
                  Nuevo Paciente
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
            <MenubarCheckboxItem className="cursor-pointer">
              Siempre Mostrar ...
            </MenubarCheckboxItem>
            <MenubarSeparator />
            <MenubarItem className="cursor-pointer" inset>
              Recargar <MenubarShortcut>⌘R</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled inset>
              Forzar Recarga <MenubarShortcut>⇧⌘R</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="cursor-pointer hover:bg-primary/5">
            Mi cuenta
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem className="cursor-pointer">Ajustes</MenubarItem>
            <MenubarSeparator />
            <MenubarItem className="cursor-pointer">Cerrar Sesión</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="cursor-pointer hover:bg-primary/5">
            Configuración
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem className="cursor-pointer">General</MenubarItem>
            <MenubarSeparator />
            <MenubarItem className="cursor-pointer">
              Actualizaciones
            </MenubarItem>

            <MenubarItem className="cursor-pointer">Acerca De</MenubarItem>
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
  );
}
