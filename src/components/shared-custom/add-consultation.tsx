"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import { ScrollArea } from "../ui/scroll-area";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { ConsultationProps } from "@/types/consultation";
import { SearchPatientComponent } from "./search-patient";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { ChevronsUpDown, Info } from "lucide-react";
import { Separator } from "../ui/separator";
import { SearchAppointmentComponent } from "./search-appointment";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import UploadImagesButtonComponent from "./upload-images-button";
import DatePickerComponent from "./date-picker";
import { PatientProps } from "@/types/patient";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export default function AddConsultationComponent({ isOpen, setIsOpen }: Props) {
  const queryClient = useQueryClient();

  const [inputs, setInputs] = React.useState<ConsultationProps>({
    reason: "",
    symptoms: "",
    diagnosis: "",
    laboratory_studies: {
      description: undefined,
      images: undefined,
    },
    images_studies: {
      description: undefined,
      images: undefined,
    },
    gynecological_information: {
      last_menstrual_period: undefined,
      estimated_due_date: undefined,
    },
    treatment: "",
    patient_id: "",
    appointment_id: undefined,
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

  const handleLaboratoryStudiesDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      laboratory_studies: {
        ...prevInputs.laboratory_studies,
        description: value,
      },
    }));
  };

  const handleLaboratoryStudiesImagesChange = (images: string[]) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      laboratory_studies: {
        ...prevInputs.laboratory_studies,
        images: images,
      },
    }));
  };

  const handleImagesStudiesDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      images_studies: {
        ...prevInputs.images_studies,
        description: value,
      },
    }));
  };

  const handleImagesStudiesImagesChange = (images: string[]) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      images_studies: {
        ...prevInputs.laboratory_studies,
        images: images,
      },
    }));
  };

  const calculateDueDate = (LMP: Date): Date | undefined => {
    if (LMP) {
      const dueDate = new Date(LMP);
      dueDate.setDate(dueDate.getDate() + 280);
      return dueDate;
    }

    return undefined;
  };

  const handleInputLMPChange = (value: Date) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      gynecological_information: {
        last_menstrual_period: value,
        estimated_due_date: calculateDueDate(value),
      },
    }));
  };

  const handleRefetchUserConsultations = async () => {
    await queryClient.refetchQueries({ queryKey: ["user_consultations"] });
  };

  const createConsultation = async () => {
    if (
      !inputs.patient_id ||
      !inputs.reason ||
      !inputs.symptoms ||
      !inputs.diagnosis ||
      !inputs.treatment
    ) {
      toast.error("Por favor, rellena todos los campos requeridos");
      return;
    }

    toast.promise(
      window.ipcRenderer.invoke("consultation-add", {
        token: localStorage.getItem("session_token"),
        data: { ...inputs },
      }),
      {
        loading: "Guardando consulta...",
        success: () => {
          handleRefetchUserConsultations();
          setIsOpen(false);
          return "Consulta creada";
        },
        error: "Ocurrió un error al crear la consulta",
      }
    );
  };

  const handleSelectPatient = (patient_id: string | undefined) => {
    if (!patient_id) {
      return;
    }

    setInputs((prevInputs) => ({
      ...prevInputs,
      patient_id: patient_id,
    }));
  };

  const { data: fetchedUserPatients } = useQuery({
    queryKey: ["user_patients"],
    queryFn: async () => {
      return await window.ipcRenderer.invoke("patient-get-from-user", {
        token: localStorage.getItem("session_token"),
      });
    },
  });

  const handleSelectAppointment = (appointment_id: string | undefined) => {
    if (!appointment_id) {
      return;
    }

    setInputs((prevInputs) => ({
      ...prevInputs,
      appointment_id: appointment_id,
    }));
  };

  const { data: fetchedUserAppointments } = useQuery({
    queryKey: ["patient_appointments", inputs.patient_id],
    queryFn: async () => {
      return await window.ipcRenderer.invoke("appointment-get-from-patient", {
        patient_id: inputs.patient_id,
        token: localStorage.getItem("session_token"),
      });
    },
    enabled: !!inputs.patient_id,
  });

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent
        disableAnimation
        className="max-w-full w-max h-[85%] 2xl:h-[70%] p-0"
      >
        <AlertDialogHeader className="pt-6 px-6 space-y-0">
          <AlertDialogTitle>Añadir consulta</AlertDialogTitle>
          <AlertDialogDescription>
            Añade una nueva consulta a tu registro. Al terminar haz click en
            guardar.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <ScrollArea className="h-full w-full">
          <div className="px-6 py-2 flex flex-col w-full h-full gap-5">
            <div className="flex flex-col gap-2.5 items-start">
              <Label className="text-right">
                Paciente <span className="text-red-500">*</span>
              </Label>
              <SearchPatientComponent
                patients={fetchedUserPatients?.data}
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
                  appointments={fetchedUserAppointments?.data}
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
                <UploadImagesButtonComponent
                  images={inputs.laboratory_studies?.images ?? []}
                  setImages={handleLaboratoryStudiesImagesChange}
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
                <UploadImagesButtonComponent
                  images={inputs.images_studies?.images ?? []}
                  setImages={handleImagesStudiesImagesChange}
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
            {inputs.patient_id &&
              fetchedUserPatients?.data.find(
                (patient: PatientProps) => patient._id === inputs.patient_id
              )?.gender !== "male" && (
                <div className="grid grid-cols-2 gap-4 items-start mb-2">
                  <div className="flex flex-col gap-2.5 items-start">
                    <Label className="text-right">Última menstruación</Label>
                    <DatePickerComponent
                      date={
                        inputs.gynecological_information?.last_menstrual_period
                      }
                      setDate={handleInputLMPChange}
                      untilCurrent={true}
                    />
                  </div>
                  <div className="flex flex-col gap-2.5 items-start">
                    <Label className="text-right">
                      Fecha probable de parto
                    </Label>
                    <DatePickerComponent
                      date={
                        inputs.gynecological_information?.estimated_due_date
                      }
                      setDate={() => {}}
                      disabled
                      placeholder="Seleccionar FUR / LMP"
                    />
                  </div>
                </div>
              )}
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
          <Button type="submit" onClick={createConsultation}>
            Guardar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
