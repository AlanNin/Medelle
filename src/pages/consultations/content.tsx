"use client";

import { Search, Loader2, Soup } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ConsultationProps } from "@/types/consultation";
import ConsultationCardComponent from "./consultation-card";
import BottomPagination from "@/components/shared-custom/bottom-pagination";
import { cn } from "@/lib/utils";

type Props = {
  consultations: ConsultationProps[];
  isLoadingUserConsultations: boolean;
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
  filterValue: "all" | "today" | "last-week" | "last-month";
  setFilterValue: (
    filterValue: "all" | "today" | "last-week" | "last-month"
  ) => void;
};

export default function ConsultationsContentComponent({
  consultations,
  isLoadingUserConsultations,
  totalPages,
  currentPage,
  setCurrentPage,
  searchQuery,
  setSearchQuery,
  filterValue,
  setFilterValue,
}: Props) {
  return (
    <div className="space-y-6 h-full">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar consultas por paciente o motivo..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="flex gap-2">
          <Select
            value={filterValue}
            onValueChange={(value) => {
              setFilterValue(
                value as "all" | "today" | "last-week" | "last-month"
              );
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar consultas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las consultas</SelectItem>
              <SelectItem value="today">Hoy</SelectItem>
              <SelectItem value="last-week">Última semana</SelectItem>
              <SelectItem value="last-month">Último mes</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoadingUserConsultations ? (
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
          {consultations.length > 0 ? (
            <div
              className={cn(
                "grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4",
                totalPages > 1 && "mb-6"
              )}
            >
              {consultations.map((consultation: ConsultationProps) => (
                <ConsultationCardComponent
                  key={consultation._id}
                  consultation={consultation}
                />
              ))}
            </div>
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

      {totalPages > 1 && (
        <div className="mt-auto flex justify-center">
          <BottomPagination
            totalPages={totalPages}
            page={currentPage}
            setPage={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
