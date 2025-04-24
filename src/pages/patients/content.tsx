"use client";
import * as React from "react";
import {
  Search,
  LayoutGrid,
  List as ListIcon,
  Loader2,
  Soup,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PatientProps } from "@/types/patient";
import UpdatePatientComponent from "@/components/shared-custom/update-patient";
import PatientCardComponent from "./patient-card";
import BottomPagination from "@/components/shared-custom/bottom-pagination";
import { cn } from "@/lib/utils";

type Props = {
  isLoadingUserPatients: boolean;
  currentPatients: PatientProps[];
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  viewMode: "list" | "grid";
  setViewMode: (viewMode: "list" | "grid") => void;
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
  filterValue: "all" | "with-appointment" | "without-appointment";
  setFilterValue: (
    filterValue: "all" | "with-appointment" | "without-appointment"
  ) => void;
};

export default function PatientsContentComponent({
  isLoadingUserPatients,
  currentPatients,
  totalPages,
  currentPage,
  setCurrentPage,
  viewMode,
  setViewMode,
  searchQuery,
  setSearchQuery,
  filterValue,
  setFilterValue,
}: Props) {
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [selectedPatientToUpdate, setSelectedPatientToUpdate] =
    React.useState<PatientProps>({} as PatientProps);

  return (
    <>
      <Card className="overflow-hidden border-none bg-card/50 shadow-md backdrop-blur-sm">
        <CardHeader className="border-b bg-background/50 px-6 py-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative flex-1 max-w-xs flex items-center">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar pacientes..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
              <Select
                value={filterValue}
                onValueChange={(value) => {
                  setFilterValue(
                    value as "all" | "with-appointment" | "without-appointment"
                  );
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filtrar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los pacientes</SelectItem>
                  <SelectItem value="with-appointment">
                    Con cita programada
                  </SelectItem>
                  <SelectItem value="without-appointment">
                    Sin cita programada
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-1.5 rounded-lg border bg-background p-1 relative">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={viewMode === "list" ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="h-8 w-8"
                  >
                    <ListIcon className="h-4 w-4" />
                    <span className="sr-only">Lista</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">Lista</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={viewMode === "grid" ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="h-8 w-8"
                  >
                    <LayoutGrid className="h-4 w-4" />
                    <span className="sr-only">Cuadrícula</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">Cadrícula</TooltipContent>
              </Tooltip>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div
            className={cn(
              viewMode === "list"
                ? "space-y-3"
                : "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
              totalPages > 1 && "mb-6"
            )}
          >
            {isLoadingUserPatients ? (
              <div className="w-full h-full items-center justify-center text-center p-8">
                <div className="flex flex-col items-center gap-3">
                  <Loader2
                    className="h-7 w-7 text-muted-foreground animate-spin"
                    strokeWidth={1.2}
                  />
                  <p className="text-sm text-muted-foreground">Cargando...</p>
                </div>
              </div>
            ) : (
              <>
                {currentPatients?.length > 0 ? (
                  <>
                    {currentPatients.map((patient: PatientProps) => (
                      <PatientCardComponent
                        key={patient._id}
                        patient={patient}
                        viewMode={viewMode}
                        setIsUpdating={setIsUpdating}
                        setSelectedPatientToUpdate={setSelectedPatientToUpdate}
                      />
                    ))}
                  </>
                ) : (
                  <div className="w-full h-full items-center justify-center text-center p-8">
                    <div className="flex flex-col items-center gap-3">
                      <Soup
                        className="h-7 w-7 text-muted-foreground"
                        strokeWidth={1.2}
                      />
                      <p className="text-sm text-muted-foreground">
                        No se encontraron resultados
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {totalPages > 1 && (
            <div className="mt-auto flex justify-center">
              <BottomPagination
                totalPages={totalPages}
                page={currentPage}
                setPage={setCurrentPage}
              />
            </div>
          )}
        </CardContent>
      </Card>
      {isUpdating && (
        <UpdatePatientComponent
          isOpen={isUpdating}
          setIsOpen={setIsUpdating}
          patient={selectedPatientToUpdate}
        />
      )}
    </>
  );
}
