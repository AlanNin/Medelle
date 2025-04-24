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
import {
  Calendar1,
  ChevronsUpDown,
  Info,
  SquarePen,
  Trash,
  Weight,
} from "lucide-react";
import { Separator } from "../ui/separator";
import { SearchAppointmentComponent } from "./search-appointment";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import UploadFilesButtonComponent from "./upload-images-button";
import DatePickerComponent from "./date-picker";
import { Input } from "../ui/input";
import { gestationalAgeToText } from "@/lib/gestional-age-text";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

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
    type: consultation.type ?? "gynecological",
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
    gynecological_information: {
      last_menstrual_period:
        consultation.gynecological_information?.last_menstrual_period,
      estimated_due_date:
        consultation.gynecological_information?.estimated_due_date,
      gestational_age: consultation.gynecological_information?.gestational_age,
    },
    obstetric_information: {
      blood_pressure: consultation.obstetric_information?.blood_pressure
        ? String(consultation.obstetric_information?.blood_pressure)
        : undefined,
      weight: consultation.obstetric_information?.weight
        ? String(consultation.obstetric_information?.weight)
        : undefined,
      fundal_height: consultation.obstetric_information?.fundal_height
        ? String(consultation.obstetric_information?.fundal_height)
        : undefined,
      fcf_mfa: consultation.obstetric_information?.fcf_mfa
        ? String(consultation.obstetric_information?.fcf_mfa)
        : undefined,
      edema: consultation.obstetric_information?.edema
        ? String(consultation.obstetric_information?.edema)
        : undefined,
      varices: consultation.obstetric_information?.varices
        ? String(consultation.obstetric_information?.varices)
        : undefined,
    },
    notes: consultation.notes,
    treatment: consultation.treatment,
    patient_id: consultation.patient_id,
    appointment_id: consultation.appointment_id ?? undefined,
  });
  console.log(consultation.obstetric_information?.weight);

  const handleConsultationTypeChange = (value: string) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      type: value as "gynecological" | "obstetric",
    }));
  };

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

  const calculateGestationalAge = (LMP: Date): number | undefined => {
    if (LMP) {
      const today = new Date();
      const diffInMs = today.getTime() - LMP.getTime();
      const diffInWeeks = diffInMs / (1000 * 60 * 60 * 24 * 7);
      return parseFloat(diffInWeeks.toFixed(1));
    }
    return undefined;
  };

  const handleInputLMPChange = (value: Date) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      gynecological_information: {
        last_menstrual_period: value,
        estimated_due_date: calculateDueDate(value),
        gestational_age: calculateGestationalAge(value),
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

    toast.promise(
      window.ipcRenderer.invoke("consultation-update", {
        token: localStorage.getItem("session_token"),
        data: {
          ...inputs,
          consultation_id: consultation._id,
        },
      }),
      {
        loading: "Actualizando consulta...",
        success: () => {
          handleRefetchUserConsultations();
          setIsOpen(false);
          return "Consulta actualizada";
        },
        error: "Ocurrió un error al actualizar la consulta",
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
    toast.promise(
      window.ipcRenderer.invoke("consultation-delete", {
        token: localStorage.getItem("session_token"),
        data: {
          consultation_id: consultation._id,
        },
      }),
      {
        loading: "Eliminando consulta...",
        success: () => {
          setIsOpen(false);
          handleRefetchUserConsultations();
          return "Consulta eliminada";
        },
        error: "Ocurrió un error al eliminar la consulta",
      }
    );
  };

  const handleInputObstetricInformationChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setInputs((prevInputs) => ({
      ...prevInputs,
      obstetric_information: {
        ...prevInputs.obstetric_information,
        [name]: value,
      },
    }));
  };

  return (
    <>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent className="max-w-full w-max h-[85%] 2xl:h-[70%] p-0">
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
                  Tipo de consulta <span className="text-red-500">*</span>
                </Label>
                <Select
                  name="type"
                  value={inputs.type}
                  onValueChange={handleConsultationTypeChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona un tipo de consulta" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="obstetric">Obstétrica</SelectItem>
                    <SelectItem value="gynecological">Ginecológica</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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

              {inputs.type && inputs.type === "obstetric" && (
                <>
                  <div className="flex gap-1.5 items-center my-4">
                    <Calendar1
                      className="h-4 w-4 text-muted-foreground"
                      strokeWidth={2}
                    />

                    <Label className="text-muted-foreground">
                      Calendario gestacional
                    </Label>
                  </div>
                  <div className="grid grid-cols-2 gap-4 items-start mb-2">
                    <div className="flex flex-col gap-2.5 items-start">
                      <Label className="text-right">Última menstruación</Label>
                      <DatePickerComponent
                        date={
                          inputs.gynecological_information
                            ?.last_menstrual_period
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
                          inputs.gynecological_information
                            ?.estimated_due_date ||
                          consultation.gynecological_information
                            ?.estimated_due_date
                        }
                        setDate={() => {}}
                        disabled
                        placeholder="Seleccionar FUR / LMP"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2.5 items-start">
                    <Label className="text-right">Edad gestacional</Label>
                    <Input
                      value={gestationalAgeToText(
                        inputs.gynecological_information?.gestational_age ||
                          consultation.gynecological_information
                            ?.gestational_age
                      )}
                      onChange={() => {}}
                      disabled
                      placeholder="Seleccionar FUR / LMP"
                    />
                  </div>

                  <div className="flex gap-1.5 items-center my-4">
                    <Weight
                      className="h-4 w-4 text-muted-foreground"
                      strokeWidth={2}
                    />

                    <Label className="text-muted-foreground">
                      Exámen físico
                    </Label>
                  </div>

                  <div className="grid grid-cols-2 gap-10 ">
                    {/* col 1 */}
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-2.5 items-start">
                        <Label className="text-right">Tensión arterial</Label>
                        <Input
                          name="blood_pressure"
                          onChange={(e) =>
                            handleInputObstetricInformationChange(e)
                          }
                          value={inputs.obstetric_information?.blood_pressure}
                          placeholder="Escribe aquí..."
                        />
                      </div>
                      <div className="flex flex-col gap-2.5 items-start">
                        <Label className="text-right">Altura Uterina</Label>
                        <Input
                          name="fundal_height"
                          onChange={(e) =>
                            handleInputObstetricInformationChange(e)
                          }
                          value={inputs.obstetric_information?.fundal_height}
                          placeholder="Escribe aquí..."
                        />
                      </div>
                      <div className="flex flex-col gap-2.5 items-start">
                        <Label className="text-right">FCF/MFA</Label>
                        <Input
                          name="fcf_mfa"
                          onChange={(e) =>
                            handleInputObstetricInformationChange(e)
                          }
                          value={inputs.obstetric_information?.fcf_mfa}
                          placeholder="Escribe aquí..."
                        />
                      </div>
                    </div>

                    {/* col 2 */}
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-2.5 items-start">
                        <Label className="text-right">Peso (kg)</Label>
                        <Input
                          name="weight"
                          onChange={(e) =>
                            handleInputObstetricInformationChange(e)
                          }
                          value={inputs.obstetric_information?.weight}
                          placeholder="Escribe aquí..."
                        />
                      </div>
                      <div className="flex flex-col gap-2.5 items-start">
                        <Label className="text-right">Edema</Label>
                        <Input
                          name="edema"
                          onChange={(e) =>
                            handleInputObstetricInformationChange(e)
                          }
                          value={inputs.obstetric_information?.edema}
                          placeholder="Escribe aquí..."
                        />
                      </div>
                      <div className="flex flex-col gap-2.5 items-start">
                        <Label className="text-right">Varices</Label>
                        <Input
                          name="varices"
                          onChange={(e) =>
                            handleInputObstetricInformationChange(e)
                          }
                          value={inputs.obstetric_information?.varices}
                          placeholder="Escribe aquí..."
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

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
            <Button
              variant="destructive"
              onClick={() => setIsDeleting(true)}
              className="group mr-auto"
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
              Actualizar
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
