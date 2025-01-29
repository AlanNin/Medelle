"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { SearchPatientComponent } from "../search-patient";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown, Info, SquarePen } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { SearchAppointmentComponent } from "../search-appointment";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import UploadFilesButtonComponent from "../upload-images-button";
import { PatientProps } from "@/types/patient";
import { ConsultationProps } from "@/types/consultation";
import { AppointmentProps } from "@/types/appointment";

type GynecologicalComponentProps = {
  isOpen: boolean;
  handleClose: () => void;
  userPatients: PatientProps[];
  userAppointments: AppointmentProps[];
  handleSelectPatient: (patient_id: string | undefined) => void;
  handleSelectAppointment: (appointment_id: string | undefined) => void;
  inputs: ConsultationProps;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleLaboratoryStudiesDescriptionChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleLaboratoryStudiesImagesChange: (images: string[]) => void;
  handleImagesStudiesDescriptionChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleImagesStudiesImagesChange: (images: string[]) => void;
  createConsultation: () => void;
};

export default function AddGynecologicalConsultationComponent({
  isOpen,
  handleClose,
  userPatients,
  userAppointments,
  handleSelectPatient,
  handleSelectAppointment,
  inputs,
  handleInputChange,
  handleLaboratoryStudiesDescriptionChange,
  handleLaboratoryStudiesImagesChange,
  handleImagesStudiesDescriptionChange,
  handleImagesStudiesImagesChange,
  createConsultation,
}: GynecologicalComponentProps) {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="max-w-full w-max h-[85%] 2xl:h-[70%] p-0">
        <AlertDialogHeader className="pt-6 px-6 space-y-0">
          <AlertDialogTitle>Añadir consulta ginecológica</AlertDialogTitle>
          <AlertDialogDescription>
            Añade una nueva consulta ginecológica a tu registro. Para finalizar
            haz click en guardar.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <ScrollArea className="h-full w-full">
          <div className="px-6 py-2 flex flex-col w-full h-full gap-5">
            <div className="flex flex-col gap-2.5 items-start">
              <Label className="text-right">
                Paciente <span className="text-red-500">*</span>
              </Label>
              <SearchPatientComponent
                patients={userPatients}
                selectedPatient={inputs.patient_id as string}
                setSelectedPatient={handleSelectPatient}
              />
            </div>
            <Collapsible className="space-y-2.5 w-full">
              <CollapsibleTrigger className="flex items-center gap-2">
                <Label className="text-right cursor-pointer text-muted-foreground">
                  ¿Quieres vincular esta consulta a una cita existente?
                </Label>
                <ChevronsUpDown className="h-4 w-4  text-muted-foreground" />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className=" h-3.5 w-3.5 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        Al vincular una cita existente esta será actualizada
                        como completada
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SearchAppointmentComponent
                  appointments={userAppointments}
                  selectedAppointment={inputs.appointment_id as string}
                  setSelectedAppointment={handleSelectAppointment}
                  disabled={!inputs.patient_id}
                />
              </CollapsibleContent>
            </Collapsible>
            <Separator className="my-2.5" />
            <div className="flex flex-col gap-2.5 items-start">
              <Label className="text-right">
                Motivo de la consulta <span className="text-red-500">*</span>
              </Label>
              <Textarea
                className="min-h-[88px] max-h-[88px]"
                name="reason"
                value={inputs.reason}
                onChange={(e) => handleInputChange(e)}
                placeholder="Escribe aquí..."
              />
            </div>
            <div className="flex flex-col gap-2.5 items-start">
              <Label className="text-right">
                Sintomas <span className="text-red-500">*</span>
              </Label>
              <Textarea
                className="min-h-[88px] max-h-[88px]"
                name="symptoms"
                value={inputs.symptoms}
                onChange={(e) => handleInputChange(e)}
                placeholder="Escribe aquí..."
              />
            </div>
            <div className="flex flex-col gap-2.5 items-start">
              <Label className="text-right">
                Diagnosis <span className="text-red-500">*</span>
              </Label>
              <Textarea
                className="min-h-[88px] max-h-[88px]"
                name="diagnosis"
                value={inputs.diagnosis}
                onChange={(e) => handleInputChange(e)}
                placeholder="Escribe aquí..."
              />
            </div>
            <div className="flex flex-col gap-2.5 items-start">
              <Label className="text-right">Estudios de laboratorio</Label>
              <div className="flex gap-4 items-center w-full">
                <Textarea
                  className="min-h-[88px] max-h-[88px] w-full"
                  name="laboratory_studies-description"
                  value={inputs.laboratory_studies?.description}
                  onChange={(e) => handleLaboratoryStudiesDescriptionChange(e)}
                  placeholder="Escribe aquí..."
                />
                <UploadFilesButtonComponent
                  files={inputs.laboratory_studies?.images ?? []}
                  setFiles={handleLaboratoryStudiesImagesChange}
                  folder="laboratory_studies"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2.5 items-start">
              <Label className="text-right">Estudios de imagenes</Label>
              <div className="flex gap-4 items-center w-full">
                <Textarea
                  className="min-h-[88px] max-h-[88px] w-full"
                  name="images_studies-description"
                  value={inputs.images_studies?.description}
                  onChange={(e) => handleImagesStudiesDescriptionChange(e)}
                  placeholder="Escribe aquí..."
                />
                <UploadFilesButtonComponent
                  files={inputs.images_studies?.images ?? []}
                  setFiles={handleImagesStudiesImagesChange}
                  folder="images_studies"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2.5 items-start">
              <Label className="text-right">
                Tratamiento <span className="text-red-500">*</span>
              </Label>
              <Textarea
                className="min-h-[88px] max-h-[88px]"
                name="treatment"
                value={inputs.treatment}
                onChange={(e) => handleInputChange(e)}
                placeholder="Escribe aquí..."
              />
            </div>
            <div className="flex gap-1.5 items-center my-4">
              <SquarePen
                className="h-4 w-4 text-muted-foreground"
                strokeWidth={2}
              />

              <Label className="text-muted-foreground">Otros</Label>
            </div>
            <div className="flex flex-col gap-2.5 items-start">
              <Label className="text-right">Notas del doctor</Label>
              <Textarea
                className="min-h-[88px] max-h-[88px]"
                name="notes"
                value={inputs.notes}
                onChange={(e) => handleInputChange(e)}
                placeholder="Otros detalles relevantes..."
              />
            </div>
          </div>
        </ScrollArea>
        <AlertDialogFooter className="pb-6 px-6 flex items-center">
          <Button variant="outline" type="submit" onClick={handleClose}>
            Cancelar
          </Button>
          <Button type="submit" onClick={createConsultation}>
            Guardar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
