"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AppointmentProps } from "@/types/appointment";
import formatDateShort from "@/lib/format-date-short";

type Props = {
  appointments: AppointmentProps[];
  selectedAppointment: string | undefined;
  setSelectedAppointment: (appointment: string | undefined) => void;
  disabled?: boolean;
};

export function SearchAppointmentComponent({
  appointments,
  selectedAppointment,
  setSelectedAppointment,
  disabled,
}: Props) {
  const [open, setOpen] = React.useState(false);

  const [appointmentReason, setAppointmentReason] = React.useState<string>("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          disabled={disabled}
        >
          {selectedAppointment
            ? appointments?.find(
                (appointment: AppointmentProps) =>
                  appointment._id === selectedAppointment
              )?.reason
            : disabled
            ? "Por favor selecciona un paciente..."
            : "Seleccionar cita..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[480px] p-0">
        <Command>
          <CommandInput
            value={appointmentReason}
            onValueChange={(e) => setAppointmentReason(e)}
            placeholder="Buscar cita..."
          />
          <CommandList>
            <CommandEmpty className="p-5 flex flex-col items-center justify-center gap-3">
              <p className="text-sm text-center">Sin resultados.</p>
            </CommandEmpty>
            <CommandGroup>
              {appointments?.map((appointment: AppointmentProps) => (
                <CommandItem
                  key={appointment._id}
                  value={appointment.reason + " - " + appointment.date_time}
                  onSelect={() => {
                    setSelectedAppointment(
                      appointment._id === selectedAppointment
                        ? ""
                        : appointment._id
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedAppointment === appointment._id
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {appointment.reason}
                  <span className="text-muted-foreground">
                    {formatDateShort(appointment.date_time)}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
