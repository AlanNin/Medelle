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
  AlertDialogAction,
  AlertDialogCancel,
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
import { ChevronsUpDown, Info, Trash } from "lucide-react";
import { Separator } from "../ui/separator";
import { SearchAppointmentComponent } from "./search-appointment";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import UploadImagesButtonComponent from "./upload-images-button";

type Props = {
  consultation: ConsultationProps;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export default function UpdateConsultationComponent({
  consultation,
  isOpen,
  setIsOpen,
}: Props) {
  const queryClient = useQueryClient();

  const [inputs, setInputs] = React.useState<ConsultationProps>({
    reason: consultation.reason,
    symptoms: consultation.symptoms,
    diagnosis: consultation.diagnosis,
    laboratory_studies: {
      description: consultation.laboratory_studies?.description,
      images: consultation.laboratory_studies?.images,
    },
    images_studies: {
      description: consultation.images_studies?.description,
      images: consultation.images_studies?.images,
    },
    treatment: consultation.treatment,
    patient_id: consultation.patient_id,
    appointment_id: consultation.appointment_id ?? undefined,
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

  const handleRefetchUserConsultations = async () => {
    await queryClient.refetchQueries({ queryKey: ["user_consultations"] });
  };

  const updateConsultation = async () => {
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
    const result = await window.ipcRenderer.invoke("consultation-update", {
      token: localStorage.getItem("session_token"),
      data: {
        ...inputs,
        consultation_id: consultation._id,
      },
    });
    if (result) {
      handleRefetchUserConsultations();
      toast.success("Consulta actualizada");
      setIsOpen(false);
    }
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

  const patientId =
    typeof inputs.patient_id === "string"
      ? inputs.patient_id
      : inputs.patient_id?._id;

  const { data: fetchedUserAppointments } = useQuery({
    queryKey: ["patient_appointments", patientId],
    queryFn: async () => {
      return await window.ipcRenderer.invoke("appointment-get-from-patient", {
        patient_id: patientId,
        token: localStorage.getItem("session_token"),
      });
    },
    enabled: !!inputs.patient_id,
  });

  const [isDeleting, setIsDeleting] = React.useState(false);

  const deleteConsultation = async () => {
    try {
      const result = await window.ipcRenderer.invoke("consultation-delete", {
        token: localStorage.getItem("session_token"),
        data: {
          consultation_id: consultation._id,
        },
      });
      if (result) {
        setIsOpen(false);
        handleRefetchUserConsultations();
        toast.success("Consulta eliminada");
      }
    } catch (error) {
      toast.error("Ocurrio un error al eliminar la consulta");
    }
  };

  return (
    <>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent
          disableAnimation
          className="max-w-full w-max md:h-[80%] lg:h-[80%] xl:h-[75%] 2xl:h-[75%] p-0"
        >
          <AlertDialogHeader className="pt-6 px-6 space-y-0">
            <AlertDialogTitle>Actualizar consulta</AlertDialogTitle>
            <AlertDialogDescription>
              Actualiza la consulta seleccionada en tu registro. Al terminar haz
              click en guardar.
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
                  selectedPatient={patientId}
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
                    onChange={(e) =>
                      handleLaboratoryStudiesDescriptionChange(e)
                    }
                    placeholder="Escribe aquí..."
                  />
                  <UploadImagesButtonComponent
                    images={inputs.laboratory_studies?.images ?? []}
                    setImages={handleLaboratoryStudiesImagesChange}
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
            </div>
          </ScrollArea>
          <AlertDialogFooter className="pb-6 px-6 flex items-center gap-4">
            <Button
              variant="destructive"
              onClick={() => setIsDeleting(true)}
              className="group"
            >
              <Trash className="h-10 w-10 group-hover:rotate-12 transition-all duration-150" />
            </Button>
            <Button
              variant="outline"
              type="submit"
              onClick={() => setIsOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" onClick={updateConsultation}>
              Actualizar consulta
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={isDeleting} onOpenChange={setIsDeleting}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              ¿Estás seguro de eliminar esta consulta?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente
              la consulta seleccionada.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={deleteConsultation}>
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
