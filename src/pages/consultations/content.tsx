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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import ConsultationCardComponent from "./consultation-card";

type Props = {
  consultations: ConsultationProps[];
  isLoadingUserConsultations: boolean;
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  handleScroll: () => void;
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
  handleScroll,
  searchQuery,
  setSearchQuery,
  filterValue,
  setFilterValue,
}: Props) {
  return (
    <div className="mt-6 space-y-6">
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
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
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
    </div>
  );
}
