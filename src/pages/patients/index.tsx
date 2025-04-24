"use client";

import { useState, useMemo } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import normalizeString from "@/lib/normalize-string";
import { useQuery } from "@tanstack/react-query";
import { PatientProps } from "@/types/patient";
import PatientsHeaderComponent from "./header";
import PatientsContentComponent from "./content";
import { motion } from "framer-motion";

export default function Component() {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterValue, setFilterValue] = useState<
    "all" | "with-appointment" | "without-appointment"
  >("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  let itemsPerPage = 12;

  const { data: fetchedUserPatients, isLoading: isLoadingUserPatients } =
    useQuery({
      queryKey: ["user_patients"],
      queryFn: async () => {
        return await window.ipcRenderer.invoke("patient-get-from-user", {
          token: localStorage.getItem("session_token"),
        });
      },
    });

  const filteredPatients = useMemo(() => {
    return fetchedUserPatients?.data?.filter((patient: PatientProps) => {
      const matchesSearch = normalizeString(patient.name).includes(
        normalizeString(searchQuery)
      );

      const matchesFilter =
        filterValue === "all" ||
        (filterValue === "with-appointment" && patient.next_appointment) ||
        (filterValue === "without-appointment" && !patient.next_appointment);

      return matchesSearch && matchesFilter;
    });
  }, [fetchedUserPatients, searchQuery, filterValue]);

  const totalPages = Math.ceil(filteredPatients?.length / itemsPerPage);
  const currentPatients = filteredPatients?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <TooltipProvider>
      <main className="min-h-page bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-6">
        <motion.div
          key="patients-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <PatientsHeaderComponent />
        </motion.div>
        <motion.div
          key="today-appointments"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <PatientsContentComponent
            isLoadingUserPatients={isLoadingUserPatients}
            currentPatients={currentPatients}
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            viewMode={viewMode}
            setViewMode={setViewMode}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filterValue={filterValue}
            setFilterValue={setFilterValue}
          />
        </motion.div>
      </main>
    </TooltipProvider>
  );
}
