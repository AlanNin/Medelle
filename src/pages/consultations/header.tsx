import * as React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddConsultationComponent from "@/components/shared-custom/add-consultation";

export default function ConsultationsHeaderComponent() {
  const [isAdding, setIsAdding] = React.useState(false);

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight">Consultas</h1>
          <p className="text-sm text-muted-foreground">
            Organiza y administra todas tus consultas médicas
          </p>
        </div>
        <Button size="lg" onClick={() => setIsAdding(true)}>
          <Plus className="mr-2 h-5 w-5" />
          Añadir Consulta
        </Button>
      </div>
      {isAdding && (
        <AddConsultationComponent isOpen={isAdding} setIsOpen={setIsAdding} />
      )}
    </>
  );
}
