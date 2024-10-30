"use client";

import {
  Search,
  LayoutGrid,
  List as ListIcon,
  ChevronRight,
  Calendar,
  Soup,
  Loader2,
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PatientProps } from "@/types/patient";
import formatDateShort from "@/lib/format-date-short";

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
  handleScroll: () => void;
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
  handleScroll,
}: Props) {
  return (
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
          className={
            viewMode === "list"
              ? "space-y-3"
              : "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          }
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
                    <div
                      key={patient._id}
                      className={`group relative overflow-hidden rounded-xl border bg-card transition-all hover:shadow-lg cursor-pointer ${
                        viewMode === "grid" ? "p-6" : "p-4"
                      }`}
                    >
                      <div
                        className={`flex items-start gap-4 ${
                          viewMode === "grid"
                            ? "flex-col items-center text-center"
                            : ""
                        }`}
                      >
                        <div className="relative">
                          <Avatar className="h-12 w-12 ">
                            <AvatarImage
                              src={patient.photo_url}
                              alt={patient.name}
                            />
                            <AvatarFallback className="uppercase">
                              {patient.name
                                .split(" ")
                                .map((name: string) => name.charAt(0))
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          {patient.next_appointment && (
                            <div className="absolute -right-0.5 -top-0.5 h-3 w-3">
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                              <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
                            </div>
                          )}
                        </div>
                        <div
                          className={`flex-1 space-y-1 ${
                            viewMode === "grid" ? "items-center" : ""
                          }`}
                        >
                          <h3 className="font-medium tracking-tight">
                            {patient.name}
                          </h3>
                          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                            <Calendar className="h-3.5 w-3.5" />
                            {patient.next_appointment ? (
                              <p>
                                {formatDateShort(
                                  patient.next_appointment.date_time
                                )}{" "}
                                - {patient.next_appointment.reason}
                              </p>
                            ) : (
                              <span className="text-yellow-600 dark:text-yellow-500">
                                Sin cita programada
                              </span>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`shrink-0 ${
                            viewMode === "grid" ? "absolute right-4 top-4" : ""
                          }`}
                        >
                          <ChevronRight className="h-4 w-4" />
                          <span className="sr-only">Ver detalles</span>
                        </Button>
                      </div>
                    </div>
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
          <div className="mt-6 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() => {
                      setCurrentPage(Math.max(1, currentPage - 1));
                      handleScroll();
                    }}
                    className={
                      currentPage === 1 ? "pointer-events-none opacity-50" : ""
                    }
                    content="Anterior"
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        onClick={() => {
                          setCurrentPage(page);
                          handleScroll();
                        }}
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={() => {
                      setCurrentPage(Math.min(totalPages, currentPage + 1));
                      handleScroll();
                    }}
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
