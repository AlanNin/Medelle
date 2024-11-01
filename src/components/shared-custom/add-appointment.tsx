"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchPatientComponent } from "./search-patient";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export function AddAppointmentComponent({ isOpen, setIsOpen }: Props) {
  const queryClient = useQueryClient();

  const [appointmentDate, setAppointmentDate] = React.useState<
    Date | undefined
  >(() => {
    const date = new Date();
    date.setHours(1, 0, 0, 0);
    return date;
  });
  const [appointmentHour, setAppointmentHour] = React.useState<string>("01");
  const [appointmentMinute, setAppointmentMinute] = React.useState<string>(
    "00"
  );
  const [amPm, setAmPm] = React.useState<string>("AM");

  const hours = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0")
  );

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      const newDate = new Date(date);
      newDate.setSeconds(0);
      newDate.setHours(
        parseInt(appointmentHour, 10) + ((amPm === "PM" ? 12 : 0) % 24)
      );
      newDate.setMinutes(parseInt(appointmentMinute, 10));
      setAppointmentDate(newDate);
    } else {
      setAppointmentDate(undefined);
    }
  };

  const handleHourChange = (hour: string) => {
    setAppointmentHour(hour);
    if (appointmentDate) {
      const newDate = new Date(appointmentDate);
      let hour24 = parseInt(hour, 10);

      if (amPm === "AM") {
        hour24 = hour24 === 12 ? 0 : hour24;
      } else {
        hour24 = hour24 === 12 ? 12 : hour24 + 12;
      }

      newDate.setSeconds(0);
      newDate.setHours(hour24);
      setAppointmentDate(newDate);
    }
  };

  const handleMinuteChange = (minute: string) => {
    setAppointmentMinute(minute);
    if (appointmentDate) {
      const newDate = new Date(appointmentDate);
      newDate.setSeconds(0);
      newDate.setMinutes(parseInt(minute, 10));
      setAppointmentDate(newDate);
    }
  };

  const handleAmPmChange = (period: string) => {
    setAmPm(period);
    if (appointmentDate) {
      const newDate = new Date(appointmentDate);
      let hour24 = parseInt(appointmentHour, 10) % 12;

      if (period === "AM") {
        hour24 = hour24 === 12 ? 0 : hour24;
      } else {
        hour24 = hour24 === 12 ? 12 : hour24 + 12;
      }

      newDate.setSeconds(0);
      newDate.setHours(hour24);
      setAppointmentDate(newDate);
    }
  };

  const [selectedPatient, setSelectedPatient] = React.useState<
    string | undefined
  >("");

  const { data: fetchedUserPatients } = useQuery({
    queryKey: ["user_patients"],
    queryFn: async () => {
      return await window.ipcRenderer.invoke("patient-get-from-user", {
        token: localStorage.getItem("session_token"),
      });
    },
  });

  const [reason, setReason] = React.useState<string | undefined>(undefined);

  const [status, setStatus] = React.useState<
    "waiting" | "confirmed" | "completed" | "canceled"
  >("waiting");

  const clearInputs = () => {
    setAppointmentDate(() => {
      const date = new Date();
      date.setHours(1, 0, 0, 0);
      return date;
    });
    setAppointmentHour("01");
    setAppointmentMinute("00");
    setAmPm("AM");
    setSelectedPatient("");
    setReason(undefined);
    setStatus("waiting");
  };

  const refetchUserAppointments = async () => {
    await queryClient.refetchQueries({ queryKey: ["user_appointments"] });
  };

  const createAppointment = async () => {
    if (!selectedPatient) {
      toast.error("Por favor selecciona un paciente");
      return;
    }

    try {
      const result = await window.ipcRenderer.invoke("appointment-add", {
        token: localStorage.getItem("session_token"),
        data: {
          date_time: appointmentDate,
          patient_id: selectedPatient,
          reason: reason,
          status: status,
        },
      });
      if (result) {
        setIsOpen(false);
        clearInputs();
        refetchUserAppointments();
        toast.success("Cita guardada");
      }
    } catch (error) {
      toast.error("Ocurrio un error al crear la cita");
    }
  };

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open: boolean) => {
        setIsOpen(open);
        if (!open) {
          clearInputs();
        }
      }}
    >
      <AlertDialogContent disableAnimation className="max-w-full w-max">
        <AlertDialogHeader className="space-y-0">
          <AlertDialogTitle>Añadir cita</AlertDialogTitle>
          <AlertDialogDescription>
            Añade un cita a tu agenda. Al terminar haz click en guardar.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex gap-8 py-4">
          <Calendar
            mode="single"
            selected={appointmentDate}
            onSelect={handleDateChange}
            className="rounded-md border w-max"
          />
          <div className="flex flex-col gap-4">
            <div className="items-start gap-2 flex flex-col">
              <Label htmlFor="time" className="text-right">
                Hora
              </Label>
              <div className="flex gap-2 w-full">
                <Select
                  value={appointmentHour}
                  onValueChange={handleHourChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {hours.map((hour) => (
                      <SelectItem key={hour} value={hour}>
                        {hour}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={appointmentMinute}
                  onValueChange={handleMinuteChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {minutes.map((minute) => (
                      <SelectItem key={minute} value={minute}>
                        {minute}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={amPm} onValueChange={handleAmPmChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AM">A.M.</SelectItem>
                    <SelectItem value="PM">P.M.</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="items-start gap-2 flex flex-col">
              <Label htmlFor="name" className="text-right">
                Paciente <span className="text-red-500">*</span>
              </Label>
              <SearchPatientComponent
                patients={fetchedUserPatients?.data}
                selectedPatient={selectedPatient}
                setSelectedPatient={setSelectedPatient}
              />
            </div>
            <div className="items-start gap-2 flex flex-col">
              <Label htmlFor="username" className="text-right">
                Motivo
              </Label>
              <Input
                id="username"
                placeholder="Ej: Examen físico"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>
            <div className="items-start gap-2 flex flex-col">
              <Label htmlFor="status" className="text-right">
                Estado
              </Label>
              <Select
                name="status"
                defaultValue="waiting"
                value={status}
                onValueChange={(value) => setStatus(value as typeof status)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="waiting">En espera</SelectItem>
                  <SelectItem value="confirmed">Confirmado</SelectItem>
                  <SelectItem value="completed">Completado</SelectItem>
                  <SelectItem value="canceled">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <AlertDialogFooter className="flex items-center gap-4">
          <Button
            variant="outline"
            type="submit"
            onClick={() => setIsOpen(false)}
          >
            Cancelar
          </Button>
          <Button type="submit" onClick={createAppointment}>
            Guardar cita
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
