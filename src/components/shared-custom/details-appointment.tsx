"use client";

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
import { AppointmentProps } from "@/types/appointment";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  appointment: AppointmentProps;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export function AppointmentDetailsComponent({
  appointment,
  isOpen,
  setIsOpen,
}: Props) {
  const previous_date_time = new Date(appointment.date_time);
  let previous_hours = previous_date_time.getHours();
  const previous_hours_standard = previous_hours;
  previous_hours = previous_hours % 12 || 12;
  let formattedHours =
    previous_hours < 10 ? "0" + previous_hours : previous_hours.toString();
  const previous_minutes = previous_date_time.getMinutes() || 0;
  const formattedMinutes =
    previous_minutes < 10
      ? "0" + previous_minutes
      : previous_minutes.toString();
  const previous_amPm = previous_hours_standard >= 12 ? "PM" : "AM";

  const hours = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0")
  );
  console.log(appointment);
  const selectedPatient = appointment.patient_id?.name;
  const reason = appointment.reason;
  const status = appointment.status;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent disableAnimation className="max-w-full w-max">
          <DialogHeader className="space-y-0">
            <DialogTitle>Detalles de la cita</DialogTitle>
            <DialogDescription>
              Información detallada de la cita médica.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-8 py-4">
            <Calendar
              mode="single"
              selected={previous_date_time}
              onSelect={() => {}}
              className="rounded-md border w-max"
            />
            <div className="flex flex-col gap-4">
              <div className="items-start gap-2 flex flex-col">
                <Label htmlFor="time" className="text-right">
                  Hora
                </Label>
                <div className="flex gap-2 w-full">
                  <Select
                    value={formattedHours}
                    onValueChange={() => {}}
                    disabled
                  >
                    <SelectTrigger className="w-full disabled:opacity-100">
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
                    value={formattedMinutes}
                    onValueChange={() => {}}
                    disabled
                  >
                    <SelectTrigger className="w-full disabled:opacity-100">
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
                  <Select
                    value={previous_amPm}
                    onValueChange={() => {}}
                    disabled
                  >
                    <SelectTrigger className="w-full disabled:opacity-100">
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
                <Input
                  placeholder="Paciente..."
                  value={selectedPatient}
                  disabled
                  className="disabled:opacity-100"
                />
              </div>
              <div className="items-start gap-2 flex flex-col">
                <Label htmlFor="reason" className="text-right">
                  Motivo
                </Label>
                <Input
                  id="reason"
                  placeholder="Ej: Examen físico"
                  value={reason}
                  disabled
                  className="disabled:opacity-100"
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
                  disabled
                >
                  <SelectTrigger className="disabled:opacity-100">
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
        </DialogContent>
      </Dialog>
    </>
  );
}
