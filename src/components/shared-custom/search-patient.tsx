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
import { PatientProps } from "@/types/patient";

type Props = {
  patients: PatientProps[];
  createPatient: (patient: PatientProps) => void;
  selectedPatient: string | undefined;
  setSelectedPatient: (patient: string | undefined) => void;
};

export function SearchPatientComponent({
  patients,
  createPatient,
  selectedPatient,
  setSelectedPatient,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const [patientName, setPatientName] = React.useState<string>("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedPatient
            ? patients?.find(
                (patient: PatientProps) => patient._id === selectedPatient
              )?.name
            : "Seleccionar paciente..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[224px] p-0">
        <Command>
          <CommandInput
            value={patientName}
            onValueChange={(e) => setPatientName(e)}
            placeholder="Buscar paciente..."
          />
          <CommandList>
            <CommandEmpty className="p-5 flex flex-col items-center justify-center gap-3">
              <p className="text-sm text-center">Sin resultados.</p>
              {patientName.length > 0 && (
                <Button
                  variant="outline"
                  onClick={() => createPatient({ name: patientName })}
                >
                  Crear paciente
                </Button>
              )}
            </CommandEmpty>
            <CommandGroup>
              {patients?.map((patient: PatientProps) => (
                <CommandItem
                  key={patient._id}
                  value={patient.name}
                  onSelect={() => {
                    setSelectedPatient(
                      patient._id === selectedPatient ? "" : patient._id
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedPatient === patient._id
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {patient.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
