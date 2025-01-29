"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DatePickerComponent from "./date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FileClock, Info } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { ScrollArea } from "../ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PatientProps } from "@/types/patient";
import {
  differenceInMonths,
  differenceInYears,
  isBefore,
  setYear,
} from "date-fns";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export default function AddPatientComponent({ isOpen, setIsOpen }: Props) {
  const queryClient = useQueryClient();

  const [inputs, setInputs] = React.useState<PatientProps>({
    name: "",
    email: undefined,
    phone: undefined,
    address: undefined,
    date_of_birth: undefined,
    gender: undefined,
    age: undefined,
    insurance: undefined,
    marital_status: undefined,
    blood_group: undefined,
    height: undefined,
    weight: undefined,
    medical_history: {
      pathological_history: undefined,
      family_history: undefined,
      surgical_history: undefined,
      toxic_habits: undefined,
      allergy_history: undefined,
      gynecological_history: {
        menarche: undefined,
        telarche: undefined,
        first_coitus: undefined,
      },
      transfusion_history: undefined,
      obstetric_history: undefined,
    },
    doctor_notes: undefined,
  });

  const handleOnlyNumberChange = (e: any) => {
    const isControlKey = e.ctrlKey || e.metaKey;

    const isNumberKey = /^[0-9]$/.test(e.key);

    if (
      !isNumberKey &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "Tab" &&
      !isControlKey &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight" &&
      e.key !== "Home" &&
      e.key !== "End"
    ) {
      e.preventDefault();
    }

    if (e.key === "Enter") {
      e.preventDefault();
    }
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

  const handleInputSelectChange = (name: keyof PatientProps, value: string) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleDateOfBirthChange = (value: Date) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      date_of_birth: value,
    }));
  };

  const handleInputMedicalHistoryChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setInputs((prevInputs) => ({
      ...prevInputs,
      medical_history: {
        ...prevInputs.medical_history,
        [name]: value,
      },
    }));
  };

  const handleInputMedicalHistoryGynecologicalHistoryChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setInputs((prevInputs) => ({
      ...prevInputs,
      medical_history: {
        ...prevInputs.medical_history,
        gynecological_history: {
          ...prevInputs.medical_history!.gynecological_history,
          [name]: value,
        },
      },
    }));
  };

  function calculate_age(): number | undefined {
    if (!inputs.date_of_birth) {
      return undefined;
    }

    const today = new Date();
    const ageInYears = differenceInYears(today, inputs.date_of_birth);

    if (ageInYears < 1) {
      const ageInMonths = differenceInMonths(today, inputs.date_of_birth);
      const fractionalMonth =
        (today.getDate() - inputs.date_of_birth.getDate()) / 30;
      const ageInMonthsDecimal = ageInMonths + fractionalMonth;
      return ageInMonthsDecimal / 12;
    }

    const birthDateThisYear = setYear(
      inputs.date_of_birth,
      today.getFullYear()
    );

    if (isBefore(birthDateThisYear, today)) {
      return ageInYears;
    } else {
      return 0;
    }
  }

  const patient_age =
    calculate_age() !== undefined ? calculate_age() : undefined;

  const handleRefetchUserPatients = async () => {
    await queryClient.refetchQueries({ queryKey: ["user_patients"] });
  };

  const createPatient = async () => {
    if (!inputs.name || inputs.name.length === 0) {
      toast.error("Por favor, rellena todos los campos requeridos");
      return;
    }

    toast.promise(
      window.ipcRenderer.invoke("patient-add", {
        token: localStorage.getItem("session_token"),
        data: { ...inputs, age: patient_age },
      }),
      {
        loading: "Guardando paciente...",
        success: () => {
          handleRefetchUserPatients();
          setIsOpen(false);
          return "Paciente creado";
        },
        error: "Ocurrió un error al crear el paciente",
      }
    );
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="max-w-full w-max h-[80%] 2xl:h-[70%] p-0">
        <AlertDialogHeader className="pt-6 px-6 space-y-0">
          <AlertDialogTitle>Añadir paciente</AlertDialogTitle>
          <AlertDialogDescription>
            Añade un nuevo paciente a tu registro. Al terminar haz click en
            guardar.
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
                  <Label className="text-right">Correo</Label>
                  <Input
                    name="email"
                    value={inputs.email}
                    onChange={(e) => handleInputChange(e)}
                    placeholder="Ej: m@dominio.com"
                  />
                </div>
                <div className="flex flex-col gap-2.5 items-start">
                  <Label className="text-right">Teléfono</Label>
                  <Input
                    name="phone"
                    value={inputs.phone}
                    onChange={(e) => handleInputChange(e)}
                    placeholder="Ej: +1 (555) 555-5555"
                  />
                </div>
                <div className="flex flex-col gap-2.5 items-start">
                  <Label className="text-right">Dirección</Label>
                  <Input
                    name="address"
                    value={inputs.address}
                    onChange={(e) => handleInputChange(e)}
                    placeholder="Escribe la dirección aquí..."
                  />
                </div>
                <div className="flex flex-col gap-2.5 items-start">
                  <Label className="text-right">Estado civil</Label>
                  <Select
                    name="marital_status"
                    value={inputs.marital_status}
                    onValueChange={(value) =>
                      handleInputSelectChange("marital_status", value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecciona un estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Soltero/a</SelectItem>
                      <SelectItem value="married">Casado/a</SelectItem>
                      <SelectItem value="divorced">Divorciado/a</SelectItem>
                      <SelectItem value="widowed">Viudo/a</SelectItem>
                      <SelectItem value="separated">Separado/a</SelectItem>
                      <SelectItem value="free_union">Unión libre</SelectItem>
                      <SelectItem value="other">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2.5 items-start">
                  <Label className="text-right">Altura (cm)</Label>
                  <Input
                    name="height"
                    value={inputs.height}
                    onChange={(e) => handleInputChange(e)}
                    onKeyDown={(e) => {
                      handleOnlyNumberChange(e);
                    }}
                    placeholder="Escribe un número aquí..."
                  />
                </div>
              </div>

              {/* col 2 */}
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2.5 items-start">
                  <Label className="text-right">Fecha de nacimiento</Label>
                  <DatePickerComponent
                    date={inputs.date_of_birth}
                    setDate={handleDateOfBirthChange}
                    untilCurrent={true}
                  />
                </div>
                <div className="flex flex-col gap-2.5 items-start">
                  <div className="flex items-center gap-1.5">
                    <Label className="text-right">Edad</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className=" h-3.5 w-3.5 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            Se calcula automáticamente a partir de la fecha de
                            nacimiento
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input
                    name="age"
                    value={
                      patient_age
                        ? patient_age >= 1
                          ? `${patient_age} años`
                          : `${(patient_age * 12).toFixed(1)} meses`
                        : undefined
                    }
                    placeholder="Selecciona una fecha..."
                    disabled
                  />
                </div>
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
                  <Label className="text-right">Seguro</Label>
                  <Input
                    name="insurance"
                    value={inputs.insurance}
                    onChange={(e) => handleInputChange(e)}
                    placeholder="Escribe aquí..."
                  />
                </div>
                <div className="flex flex-col gap-2.5 items-start">
                  <Label className="text-right">Grupo sanguíneo</Label>
                  <Select
                    name="blood_group"
                    value={inputs.blood_group}
                    onValueChange={(value) =>
                      handleInputSelectChange("blood_group", value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecciona un grupo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">Sangre A+</SelectItem>
                      <SelectItem value="A-">Sangre A-</SelectItem>
                      <SelectItem value="B+">Sangre B+</SelectItem>
                      <SelectItem value="B-">Sangre B-</SelectItem>
                      <SelectItem value="AB+">Sangre AB+</SelectItem>
                      <SelectItem value="AB-">Sangre AB-</SelectItem>
                      <SelectItem value="O+">Sangre O+</SelectItem>
                      <SelectItem value="O-">Sangre O-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2.5 items-start">
                  <Label className="text-right">Peso (kg)</Label>
                  <Input
                    name="weight"
                    value={inputs.weight}
                    onChange={(e) => handleInputChange(e)}
                    onKeyDown={(e) => {
                      handleOnlyNumberChange(e);
                    }}
                    placeholder="Escribe un número aquí..."
                  />
                </div>
              </div>
            </div>

            {/* grid 2 */}
            <div className="flex gap-1.5 items-center my-8">
              <FileClock
                className="h-4 w-4 text-muted-foreground"
                strokeWidth={2}
              />

              <Label className="text-muted-foreground">Historial clinico</Label>
            </div>
            <div className="grid grid-cols-2 gap-10">
              {/* col 1 */}
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2.5 items-start">
                  <Label className="text-right">Antecedentes patologicos</Label>
                  <Textarea
                    className="min-h-[88px] max-h-[88px]"
                    name="pathological_history"
                    value={inputs.medical_history!.pathological_history}
                    onChange={(e) => handleInputMedicalHistoryChange(e)}
                    placeholder="Escribe aquí..."
                  />
                </div>
                <div className="flex flex-col gap-2.5 items-start">
                  <Label className="text-right">Antecedentes quirúrgicos</Label>
                  <Textarea
                    className="min-h-[88px] max-h-[88px]"
                    name="surgical_history"
                    value={inputs.medical_history!.surgical_history}
                    onChange={(e) => handleInputMedicalHistoryChange(e)}
                    placeholder="Escribe aquí..."
                  />
                </div>
                <div className="flex flex-col gap-2.5 items-start">
                  <Label className="text-right">Antecedentes alérgicos</Label>
                  <Textarea
                    className="min-h-[88px] max-h-[88px]"
                    name="allergy_history"
                    value={inputs.medical_history!.allergy_history}
                    onChange={(e) => handleInputMedicalHistoryChange(e)}
                    placeholder="Escribe aquí..."
                  />
                </div>
                <div className="flex flex-col gap-2.5 items-start">
                  <Label className="text-right">
                    Antecedentes transfusionales
                  </Label>
                  <Textarea
                    className="min-h-[88px] max-h-[88px]"
                    name="transfusion_history"
                    value={inputs.medical_history!.transfusion_history}
                    onChange={(e) => handleInputMedicalHistoryChange(e)}
                    placeholder="Escribe aquí..."
                  />
                </div>
              </div>

              {/* col 2 */}
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2.5 items-start">
                  <Label className="text-right">
                    Antecedentes heredofamiliares
                  </Label>
                  <Textarea
                    className="min-h-[88px] max-h-[88px]"
                    name="family_history"
                    value={inputs.medical_history!.family_history}
                    onChange={(e) => handleInputMedicalHistoryChange(e)}
                    placeholder="Escribe aquí..."
                  />
                </div>
                <div className="flex flex-col gap-2.5 items-start">
                  <Label className="text-right">Hábitos tóxicos</Label>
                  <Textarea
                    className="min-h-[88px] max-h-[88px]"
                    name="toxic_habits"
                    value={inputs.medical_history!.toxic_habits}
                    onChange={(e) => handleInputMedicalHistoryChange(e)}
                    placeholder="Escribe aquí..."
                  />
                </div>
                <div className="flex flex-col gap-2.5 items-start">
                  <div className="flex items-center gap-1.5">
                    <Label>Antecedentes ginecológicos</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className=" h-3.5 w-3.5 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            Introducir edades en los campos correspondientes
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="flex flex-wrap max-w-56 gap-2">
                    <Input
                      name="menarche"
                      value={
                        inputs.medical_history!.gynecological_history?.menarche
                      }
                      onChange={(e) =>
                        handleInputMedicalHistoryGynecologicalHistoryChange(e)
                      }
                      onKeyDown={(e) => {
                        handleOnlyNumberChange(e);
                      }}
                      placeholder="Mernaquia"
                      className="w-[108px]"
                    />
                    <Input
                      name="telarche"
                      value={
                        inputs.medical_history!.gynecological_history?.telarche
                      }
                      onChange={(e) =>
                        handleInputMedicalHistoryGynecologicalHistoryChange(e)
                      }
                      onKeyDown={(e) => {
                        handleOnlyNumberChange(e);
                      }}
                      placeholder="Terlaquia"
                      className="w-[108px]"
                    />
                    <Input
                      name="first_coitus"
                      value={
                        inputs.medical_history!.gynecological_history
                          ?.first_coitus
                      }
                      onChange={(e) =>
                        handleInputMedicalHistoryGynecologicalHistoryChange(e)
                      }
                      onKeyDown={(e) => {
                        handleOnlyNumberChange(e);
                      }}
                      placeholder="Primer coito"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2.5 items-start">
                  <Label className="text-right">Antecedentes obstétricos</Label>
                  <Textarea
                    className="min-h-[88px] max-h-[88px]"
                    name="obstetric_history"
                    value={inputs.medical_history!.obstetric_history}
                    onChange={(e) => handleInputMedicalHistoryChange(e)}
                    placeholder="Escribe aquí..."
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2.5 items-start mt-6">
              <Label className="text-right">Notas del doctor</Label>
              <Textarea
                className="min-h-[88px] max-h-[88px]"
                name="doctor_notes"
                value={inputs.doctor_notes}
                onChange={(e) => handleInputChange(e)}
                placeholder="Otros detalles relevantes..."
              />
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
          <Button type="submit" onClick={createPatient}>
            Guardar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
