"use client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card, CardContent } from "@/components/ui/card";
import ObstetricIllustration from "@/assets/ilustrations/obstetric-consultation.png";
import GynecologicalIllustration from "@/assets/ilustrations/gynecological-consultation.png";
import * as React from "react";
type SelectionAddConsultationComponentProps = {
  isOpen: boolean;
  handleClose: () => void;
  setCurrentSelection: (selection: string) => void;
};

export default function SelectionAddConsultationComponent({
  isOpen,
  handleClose,
  setCurrentSelection,
}: SelectionAddConsultationComponentProps) {
  const [selection, setSelection] = React.useState<
    "obstetric" | "gynecological" | undefined
  >(undefined);

  function handleContinue() {
    if (!selection) {
      return;
    }
    setCurrentSelection(selection);
  }

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="max-w-full w-max h-auto p-0">
        <AlertDialogHeader className="pt-6 px-6 space-y-0">
          <AlertDialogTitle>Añadir Consulta - Selección</AlertDialogTitle>
          <AlertDialogDescription>
            Por favor selecciona el tipo de paciente al que desea realizar la
            consulta.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <ScrollArea className="h-full w-full">
          <div className="px-6 py-6 flex w-full h-full gap-5">
            <Card
              className={`w-full  transition-all duration-250 cursor-pointer group ${
                selection === "obstetric"
                  ? "shadow-lg scale-105"
                  : "hover:shadow-lg hover:scale-105"
              }`}
              onClick={() => setSelection("obstetric")}
            >
              <CardContent className="p-4 flex flex-col items-center gap-4">
                <img
                  src={ObstetricIllustration}
                  alt="ObstetricIllustration"
                  className={`w-52 h-52 grayscale group-hover:grayscale-0 transition-all duration-250 ${
                    selection === "obstetric"
                      ? "grayscale-0"
                      : "grayscale group-hover:grayscale-0"
                  }`}
                />
                <h1 className="font-medium">Paciente Obstétrica/o</h1>
              </CardContent>
            </Card>
            <Card
              className={`w-full  transition-all duration-250 cursor-pointer group ${
                selection === "gynecological"
                  ? "shadow-lg scale-105"
                  : "hover:shadow-lg hover:scale-105"
              }`}
              onClick={() => setSelection("gynecological")}
            >
              <CardContent className="p-4 flex flex-col items-center gap-4">
                <img
                  src={GynecologicalIllustration}
                  alt="GynecologicalIllustration"
                  className={`w-52 h-52 grayscale group-hover:grayscale-0 transition-all duration-250 ${
                    selection === "gynecological"
                      ? "grayscale-0"
                      : "grayscale group-hover:grayscale-0"
                  }`}
                />
                <h1 className="font-medium">Paciente Ginecológica/o</h1>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
        <AlertDialogFooter className="pb-6 px-6 flex items-center">
          <Button variant="outline" type="submit" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={selection === undefined}
            onClick={handleContinue}
          >
            Continuar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
