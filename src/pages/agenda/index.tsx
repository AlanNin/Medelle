"use client";

import * as React from "react";
import CalendarComponent from "./calendar";
import SelectedDayAppointmentsComponent from "./selected-day-appointments";
import UpcomingDaysAppointmentsComponent from "./upcoming-days-appointments";
import { useQuery } from "@tanstack/react-query";
import { AppointmentProps } from "@/types/appointment";
import { motion } from "framer-motion";

export default function AgendaPage() {
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());

  const isSameDay = (date_1: Date | undefined, date_2: Date) => {
    if (date_1 === undefined || date_2 === undefined) {
      return false;
    }

    return (
      date_1.getFullYear() === date_2.getFullYear() &&
      date_1.getMonth() === date_2.getMonth() &&
      date_1.getDate() === date_2.getDate()
    );
  };

  const { data: fetchedUserAppointments, refetch: refetchUserAppointments } =
    useQuery({
      queryKey: ["user_appointments"],
      queryFn: async () => {
        return await window.ipcRenderer.invoke("appointment-get-from-user", {
          token: localStorage.getItem("session_token"),
        });
      },
    });

  const selectedDayAppointments = fetchedUserAppointments?.data?.filter(
    (appointment: AppointmentProps) =>
      isSameDay(new Date(appointment.date_time), selectedDate)
  );

  const upcomingAppointments = fetchedUserAppointments?.data?.filter(
    (appointment: AppointmentProps) => {
      const appointmentDate = new Date(appointment.date_time);
      return (
        appointmentDate > selectedDate &&
        !selectedDayAppointments.some((selected: any) =>
          isSameDay(appointmentDate, new Date(selected.date_time))
        )
      );
    }
  );

  return (
    <main className="min-h-page bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-6">
      <div className="space-y-8">
        <div className="flex  lg:flex-auto gap-8 max-lg:justify-center">
          <motion.div
            key="calendar"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CalendarComponent
              isSameDay={isSameDay}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </motion.div>
          <motion.div
            className="w-full lg:w-auto lg:flex-grow"
            key="today-appointments"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SelectedDayAppointmentsComponent
              isSameDay={isSameDay}
              selectedDayAppointments={selectedDayAppointments}
              selectedDate={selectedDate}
            />
          </motion.div>
        </div>
        <motion.div
          key="upcoming-appointment"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <UpcomingDaysAppointmentsComponent
            upcomingAppointments={upcomingAppointments}
            refetchUserAppointments={refetchUserAppointments}
          />
        </motion.div>
      </div>
    </main>
  );
}
