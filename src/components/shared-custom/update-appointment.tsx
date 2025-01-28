"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
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
import { AppointmentProps } from "@/types/appointment";
import { Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Props = {
  appointment: AppointmentProps;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export function UpdateAppointmentComponent({
  appointment,
  isOpen,
  setIsOpen,
}: Props) {
  const queryClient = useQueryClient();

  const previous_date_time = new Date(appointment.date_time);
  let previous_hours = previous_date_time.getHours();
  const previous_hours_standard = previous_hours;
  previous_hours = previous_hours % 12 || 12;
  let formattedHours =
    previous_hours < 10 ? "0" + previous_hours : previous_hours.toString();
  const previous_minutes = previous_date_time.getMinutes();
  const formattedMinutes =
    previous_minutes < 10
      ? "0" + previous_minutes
      : previous_minutes.toString();
  const previous_amPm = previous_hours_standard >= 12 ? "PM" : "AM";

  const [appointmentDate, setAppointmentDate] = React.useState<
    Date | undefined
  >(previous_date_time);
  const [appointmentHour, setAppointmentHour] = React.useState<string>(
    formattedHours
  );
  const [appointmentMinute, setAppointmentMinute] = React.useState<string>(
    formattedMinutes
  );
  const [amPm, setAmPm] = React.useState<string>(previous_amPm);

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
  >(appointment.patient_id._id);

  const { data: fetchedUserPatients } = useQuery({
    queryKey: ["user_patients"],
    queryFn: async () => {
      return await window.ipcRenderer.invoke("patient-get-from-user", {
        token: localStorage.getItem("session_token"),
      });
    },
  });

  const refetchUserAppointments = async () => {
    await queryClient.refetchQueries({ queryKey: ["user_appointments"] });
  };

  const [reason, setReason] = React.useState<string | undefined>(
    appointment.reason
  );

  const [status, setStatus] = React.useState<
    "waiting" | "confirmed" | "completed" | "canceled" | undefined
  >(appointment.status);

  const updateAppointment = async () => {
    if (!selectedPatient) {
      toast.error("Por favor selecciona un paciente");
      return;
    }

    if (
      appointmentDate === previous_date_time &&
      appointmentHour === formattedHours &&
      appointmentMinute === formattedMinutes &&
      amPm === previous_amPm &&
      selectedPatient === appointment.patient_id._id &&
      reason === appointment.reason &&
      status === appointment.status
    ) {
      setIsOpen(false);
      toast.success("No se detectaron cambios");
      return;
    }

    toast.promise(
      window.ipcRenderer.invoke("appointment-update", {
        token: localStorage.getItem("session_token"),
        data: {
          appointment_id: appointment._id,
          date_time: appointmentDate,
          patient_id: selectedPatient,
          reason: reason,
          status: status,
        },
      }),
      {
        loading: "Actualizando cita...",
        success: () => {
          setIsOpen(false);
          refetchUserAppointments();
          return "Cita actualizada";
        },
        error: "Ocurrió un error al actualizar la cita",
      }
    );
  };

  const [isDeleting, setIsDeleting] = React.useState(false);

  const deleteAppointment = async () => {
    toast.promise(
      window.ipcRenderer.invoke("appointment-delete", {
        token: localStorage.getItem("session_token"),
        data: {
          appointment_id: appointment._id,
        },
      }),
      {
        loading: "Eliminando cita...",
        success: () => {
          setIsOpen(false);
          refetchUserAppointments();
          return "Cita eliminada";
        },
        error: "Ocurrió un error al eliminar la cita",
      }
    );
  };

  return (
    <>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent className="max-w-full w-max">
          <AlertDialogHeader className="space-y-0">
            <AlertDialogTitle>Actualizar cita</AlertDialogTitle>
            <AlertDialogDescription>
              Actualiza la cita de tu agenda. Al terminar haz click en
              actualizar.
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
          <AlertDialogFooter className="flex items-center">
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
            <Button type="submit" onClick={updateAppointment}>
              Actualizar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={isDeleting} onOpenChange={setIsDeleting}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              ¿Estás seguro de eliminar esta cita?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente
              la cita seleccionada.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={deleteAppointment}>
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
