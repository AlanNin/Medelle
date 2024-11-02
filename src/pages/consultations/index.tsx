"use client";

import { motion } from "framer-motion";
import ConsultationsHeaderComponent from "./header";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useRef, useState } from "react";
import normalizeString from "@/lib/normalize-string";
import { ConsultationProps } from "@/types/consultation";
import ConsultationsContentComponent from "./content";
import { useMQBreakpoint } from "@/hooks/use-mq-breakpoint";

export default function ConsultationsPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterValue, setFilterValue] = useState<
    "all" | "today" | "last-week" | "last-month"
  >("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  let itemsPerPage = 10;

  const { is2xl } = useMQBreakpoint("2xl");
  const { isXl } = useMQBreakpoint("xl");
  const { isLg } = useMQBreakpoint("lg");

  if (is2xl) {
    itemsPerPage = 8;
  } else if (isXl || isLg) {
    itemsPerPage = 6;
  }

  const {
    data: fetchedUserConsultations,
    isLoading: isLoadingUserConsultations,
  } = useQuery({
    queryKey: ["user_consultations"],
    queryFn: async () => {
      return await window.ipcRenderer.invoke("consultation-get-from-user", {
        token: localStorage.getItem("session_token"),
      });
    },
  });

  const filteredConsultations = useMemo(() => {
    const now = new Date();

    return fetchedUserConsultations?.data?.filter(
      (consultation: ConsultationProps) => {
        const createdAt = new Date(consultation.updatedAt!);
        const matchesSearch =
          normalizeString(consultation.reason).includes(
            normalizeString(searchQuery)
          ) ||
          (consultation.patient_id &&
            typeof consultation.patient_id === "object" &&
            consultation.patient_id.name &&
            normalizeString(consultation.patient_id.name).includes(
              normalizeString(searchQuery)
            ));

        const matchesFilter =
          filterValue === "all" ||
          (filterValue === "today" &&
            createdAt.toDateString() === now.toDateString()) ||
          (filterValue === "last-week" &&
            createdAt >=
              new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)) ||
          (filterValue === "last-month" &&
            createdAt >=
              new Date(now.getFullYear(), now.getMonth() - 1, now.getDate()));

        return matchesSearch && matchesFilter;
      }
    );
  }, [fetchedUserConsultations, searchQuery, filterValue]);

  const totalPages = Math.ceil(filteredConsultations?.length / itemsPerPage);
  const currentConsultations = filteredConsultations?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const mainRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (mainRef.current) {
      mainRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main
      className="min-h-page bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-6"
      ref={mainRef}
    >
      <motion.div
        key="consultations-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ConsultationsHeaderComponent />
      </motion.div>
      <motion.div
        key="today-appointments"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <ConsultationsContentComponent
          consultations={currentConsultations}
          isLoadingUserConsultations={isLoadingUserConsultations}
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          handleScroll={handleScroll}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filterValue={filterValue}
          setFilterValue={setFilterValue}
        />
      </motion.div>
    </main>
  );
}
