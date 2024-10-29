"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchPatientComponent } from "./search-patient";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { PatientProps } from "@/types/patient";
import { toast } from "sonner";

type Props = {
  refetchUserAppointments: () => void;
};

export function AddAppointmentComponent({ refetchUserAppointments }: Props) {
  const [isOpen, setIsOpen] = React.useState(false);

  const [appointmentDate, setAppointmentDate] = React.useState<
    Date | undefined
  >(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  });
  const [appointmentHour, setAppointmentHour] = React.useState<string>("00");
  const [appointmentMinute, setAppointmentMinute] = React.useState<string>(
    "00"
  );
  const [amPm, setAmPm] = React.useState<string>("AM");

  const hours = Array.from({ length: 12 }, (_, i) =>
    i.toString().padStart(2, "0")
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
      const hour24 =
        parseInt(hour, 10) + (amPm === "PM" && hour !== "12" ? 12 : 0);
      newDate.setSeconds(0);
      newDate.setHours(hour24 % 24);
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
      const hour24 =
        parseInt(appointmentHour, 10) +
        (period === "PM" && appointmentHour !== "12" ? 12 : 0);
      newDate.setSeconds(0);
      newDate.setHours(hour24 % 24);
      setAppointmentDate(newDate);
    }
  };

  const [selectedPatient, setSelectedPatient] = React.useState<
    string | undefined
  >("");

  const { data: fetchedUserPatients, refetch: refetchUserPatients } = useQuery({
    queryKey: ["user_patients"],
    queryFn: async () => {
      return await window.ipcRenderer.invoke("patient-get-from-user", {
        token: Cookies.get("session_token"),
      });
    },
    refetchOnWindowFocus: false,
  });

  const createPatient = async (data: PatientProps) => {
    const result = await window.ipcRenderer.invoke("patient-add", {
      token: Cookies.get("session_token"),
      data,
    });
    if (result) {
      refetchUserPatients();
    }
  };

  const [reason, setReason] = React.useState<string | undefined>(undefined);

  const [status, setStatus] = React.useState<
    "waiting" | "confirmed" | "completed" | "canceled" | undefined
  >(undefined);

  const clearInputs = () => {
    setAppointmentDate(() => {
      const date = new Date();
      date.setHours(0, 0, 0, 0);
      return date;
    });
    setAppointmentHour("00");
    setAppointmentMinute("00");
    setAmPm("AM");
    setSelectedPatient("");
    setReason(undefined);
    setStatus(undefined);
  };

  const createAppointment = async () => {
    if (!selectedPatient) {
      toast.error("Por favor selecciona un paciente");
      return;
    }

    const result = await window.ipcRenderer.invoke("appointment-add", {
      token: Cookies.get("session_token"),
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
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          clearInputs();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" onClick={() => setIsOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Añadir Cita
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-full w-max">
        <DialogHeader>
          <DialogTitle>Añadir cita</DialogTitle>
          <DialogDescription>
            Añade un cita a tu agenda. Al terminar haz click en guardar.
          </DialogDescription>
        </DialogHeader>
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
            {/* to-do: change input for a select with find for patients */}
            <div className="items-start gap-2 flex flex-col">
              <Label htmlFor="name" className="text-right">
                Paciente <span className="text-red-500">*</span>
              </Label>
              <SearchPatientComponent
                patients={fetchedUserPatients?.data}
                createPatient={createPatient}
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
        <DialogFooter>
          <Button type="submit" onClick={createAppointment}>
            Guardar cita
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
