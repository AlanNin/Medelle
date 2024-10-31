import * as React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddPatientComponent from "@/components/shared-custom/add-patient";

export default function PatientsHeaderComponent() {
  const [isAdding, setIsAdding] = React.useState(false);

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight">Pacientes</h1>
          <p className="text-sm text-muted-foreground">
            Gestiona la información de tus pacientes
          </p>
        </div>
        <Button size="lg" onClick={() => setIsAdding(true)}>
          <Plus className="mr-2 h-5 w-5" />
          Añadir Paciente
        </Button>
      </div>
      {isAdding && (
        <AddPatientComponent isOpen={isAdding} setIsOpen={setIsAdding} />
      )}
    </>
  );
}
