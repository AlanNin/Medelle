"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Download, FileImage, Printer } from "lucide-react";
import { ConsultationProps } from "@/types/consultation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import formatDateShort from "@/lib/format-date-short";
import { generatePrescriptionTemplate } from "@/components/exports/prescription";
import { PrintNotSilentProps } from "@/types/print";
import { toast } from "sonner";
import { PdfDataProps } from "@/types/pdf";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  consultation: ConsultationProps;
};

interface PdfResult {
  success: boolean;
  path?: string;
  error?: string;
  canceled?: boolean;
}

export default function ConsultationDetailsComponent({
  isOpen,
  setIsOpen,
  consultation,
}: Props) {
  const [isShowingImage, setIsShowingImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  async function handleExportPDFPrescription() {
    console.log("Ejecutando función de impresión - consulta");

    const template = await generatePrescriptionTemplate(consultation);

    const handlePrintPrescription: PdfResult = await window.ipcRenderer.invoke(
      "export-pdf",
      {
        template,
        config: {
          margin: {
            marginType: "none" as const,
          },
          pageSize: "A4",
          landscape: false,
          printBackground: true,
        },
      } as PdfDataProps
    );

    if (handlePrintPrescription.success && handlePrintPrescription.path) {
      toast.success("PDF generado con éxito", {
        description: `Ubicación: "${handlePrintPrescription.path}"`,
      });
    } else {
      if (handlePrintPrescription.canceled) {
        toast.error("Generación de PDF cancelada");
      } else {
        toast.error("Error al generar PDF");
      }
    }
  }

  async function handlePrintNotSilent() {
    const template = await generatePrescriptionTemplate(consultation);

    const response = await window.ipcRenderer.invoke("print-not-silent", {
      template,
      config: {
        margin: {
          marginType: "none" as const,
        },
        Size: "A4",
        landscape: false,
        printBackground: true,
      },
    } as PrintNotSilentProps);

    if (response.success) {
      toast.success("Impresión exitosa");
    } else {
      toast.error("Error al imprimir");
    }
  }

  // async function handleLoadPrintersList() {
  //   const printersList: any[] = await window.ipcRenderer.invoke(
  //     "print-load-printers"
  //   );
  // }

  // async function handlePrintSilent() {
  //   const template = await generatePrescriptionTemplate(consultation);

  //   const response = await window.ipcRenderer.invoke("print-silent", {
  //     printer: "EPSON L220 Series",
  //     template,
  //     config: {
  //       pageSize: "A4",
  //       margin: {
  //         marginType: "none" as const,
  //       },
  //       landscape: false,
  //       printBackground: true,
  //     },
  //   } as PrintSilentProps);

  //   if (response.success) {
  //     toast.success("Impresión exitosa");
  //   } else {
  //     toast.error("Error al imprimir");
  //   }
  // }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent disableAnimation className=" h-[85%] p-0">
          <DialogHeader className="pt-6 px-6 space-y-0">
            <DialogTitle>Detalles de la consulta</DialogTitle>
            <DialogDescription>
              Información detallada de la consulta médica
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-full w-full">
            <div className="px-6 flex flex-col gap-5 w-full">
              <Card>
                <CardContent className="p-4 flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    {typeof consultation.patient_id === "string" ? (
                      <AvatarFallback className="uppercase">
                        {consultation.patient_id.charAt(0)}
                      </AvatarFallback>
                    ) : (
                      <>
                        <AvatarImage
                          src={consultation.patient_id.photo_url}
                          alt={consultation.patient_id.name}
                        />
                        <AvatarFallback className="uppercase">
                          {consultation.patient_id.name
                            .split(" ")
                            .map((name: string) => name.charAt(0))
                            .join("")}
                        </AvatarFallback>
                      </>
                    )}
                  </Avatar>
                  <div className="grid gap-1">
                    <h3 className="font-semibold">
                      {typeof consultation.patient_id === "object"
                        ? consultation.patient_id.name
                        : "Paciente"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Teléfono:{" "}
                      {(typeof consultation.patient_id === "object" &&
                        consultation.patient_id.phone) ??
                        "Sin registro"}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-4">
                <div>
                  <Label className="text-base">Motivo de la consulta</Label>
                  <p className="mt-1.5 text-sm text-muted-foreground whitespace-pre-wrap">
                    {consultation.reason}
                  </p>
                </div>

                <Separator />

                <div>
                  <Label className="text-base">Síntomas</Label>
                  <p className="mt-1.5 text-sm text-muted-foreground whitespace-pre-wrap">
                    {consultation.symptoms}
                  </p>
                </div>

                <Separator />

                <div>
                  <Label className="text-base">Diagnóstico</Label>
                  <p className="mt-1.5 text-sm text-muted-foreground whitespace-pre-wrap">
                    {consultation.diagnosis}
                  </p>
                </div>

                {consultation.laboratory_studies && (
                  <>
                    <Separator />
                    <div className="grid gap-2">
                      <Label className="text-base">
                        Estudios de laboratorio
                      </Label>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {consultation.laboratory_studies.description
                          ? consultation.laboratory_studies.description
                          : "Sin descripción"}
                      </p>
                      {consultation.laboratory_studies.images &&
                      consultation.laboratory_studies.images.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-1">
                          {consultation.laboratory_studies.images.map(
                            (image, index) => (
                              <div
                                key={index}
                                className="relative aspect-square cursor-pointer w-[143px] h-[143px]"
                                onClick={() => {
                                  setIsShowingImage(true);
                                  setSelectedImage(image);
                                }}
                              >
                                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                                  <FileImage className="h-6 w-6 text-white" />
                                </div>
                                <img
                                  src={image}
                                  alt={`Estudio de laboratorio ${index + 1}`}
                                  className="object-cover rounded-lg w-full h-full"
                                />
                              </div>
                            )
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 mt-1">
                          <FileImage
                            className="h-5 w-5 text-muted-foreground"
                            strokeWidth={1.2}
                          />
                          <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                            Sin imagenes
                          </p>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {consultation.images_studies && (
                  <>
                    <Separator />
                    <div className="grid gap-2">
                      <Label className="text-base">Estudios de imágenes</Label>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {consultation.images_studies.description
                          ? consultation.images_studies.description
                          : "Sin descripción"}
                      </p>
                      {consultation.images_studies.images &&
                      consultation.images_studies.images.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-1">
                          {consultation.images_studies.images.map(
                            (image, index) => (
                              <div
                                key={index}
                                className="relative aspect-square cursor-pointer w-[143px] h-[143px]"
                                onClick={() => {
                                  setIsShowingImage(true);
                                  setSelectedImage(image);
                                }}
                              >
                                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                                  <FileImage className="h-6 w-6 text-white" />
                                </div>
                                <img
                                  src={image}
                                  alt={`Estudio de imagen ${index + 1}`}
                                  className="object-cover rounded-lg w-full h-full"
                                />
                              </div>
                            )
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 mt-1">
                          <FileImage
                            className="h-5 w-5 text-muted-foreground"
                            strokeWidth={1.2}
                          />
                          <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                            Sin imagenes
                          </p>
                        </div>
                      )}
                    </div>
                  </>
                )}

                <Separator />

                <div>
                  <Label className="text-base">Tratamiento</Label>
                  <p className="mt-1.5 text-sm text-muted-foreground whitespace-pre-wrap">
                    {consultation.treatment}
                  </p>
                </div>

                <Separator />
                {typeof consultation.patient_id === "object" &&
                  consultation.patient_id.gender !== "male" && (
                    <>
                      <div className="flex flex-col mb-2 gap-1.5">
                        <Label className="text-base">Datos ginecológicos</Label>
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                          Fecha de última menstruación:{" "}
                          {consultation.gynecological_information
                            ?.last_menstrual_period
                            ? formatDateShort(
                                consultation.gynecological_information
                                  .last_menstrual_period
                              )
                            : "Sin información"}
                        </p>
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                          Fecha de parto previsto:{" "}
                          {consultation.gynecological_information
                            ?.estimated_due_date
                            ? formatDateShort(
                                consultation.gynecological_information
                                  .estimated_due_date
                              )
                            : "Sin información"}
                        </p>
                      </div>

                      <Separator />
                    </>
                  )}

                <div className="flex flex-col mb-2 gap-1">
                  <p className=" text-sm text-center text-muted-foreground whitespace-pre-wrap  ">
                    {consultation.createdAt
                      ? `Creada el ${formatDateShort(consultation.createdAt)}`
                      : "Fecha de creación no disponible"}
                  </p>
                  <p className=" text-sm text-center text-muted-foreground whitespace-pre-wrap  ">
                    {consultation.updatedAt
                      ? `Actualizada por última vez el ${formatDateShort(
                          consultation.updatedAt
                        )}`
                      : "Fecha de actulización no disponible"}
                  </p>
                </div>
              </div>
            </div>
          </ScrollArea>
          <DialogFooter className="pb-6 px-6 ">
            <Button
              variant="outline"
              onClick={handleExportPDFPrescription}
              className="w-full flex items-center gap-3"
            >
              <Download className="h-4 w-4" />
              Guardar como PDF
            </Button>
            <Button
              variant="outline"
              onClick={handlePrintNotSilent}
              className="w-full flex items-center gap-3"
            >
              <Printer className="h-4 w-4" />
              Imprimir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={isShowingImage} onOpenChange={setIsShowingImage}>
        <DialogContent
          hideClose
          className="max-w-[50%] p-0 bg-transparent border-none"
        >
          <div className="relative aspect-square p-0">
            <img
              src={selectedImage || ""}
              className="object-contain w-full h-full rounded-md"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
