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

export function AddAppointmentComponent() {
  const [appointmentDate, setAppointmentDate] = React.useState<
    Date | undefined
  >(new Date());
  const [appointmentHour, setAppointmentHour] = React.useState<string>("12");
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

  console.log(appointmentDate);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
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
                Paciente
              </Label>
              <Input id="name" placeholder="Ej: John Doe" />
            </div>
            <div className="items-start gap-2 flex flex-col">
              <Label htmlFor="username" className="text-right">
                Motivo
              </Label>
              <Input id="username" placeholder="Ej: Examen físico" />
            </div>
            <div className="items-start gap-2 flex flex-col">
              <Label htmlFor="status" className="text-right">
                Estado
              </Label>
              <Select name="status">
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
          <Button type="submit">Guardar cita</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
