"use client";

import * as React from "react";
import CalendarComponent from "./calendar";
import SelectedDayAppointmentsComponent from "./selected-day-appointments";
import UpcomingDaysAppointmentsComponent from "./upcoming-days-appointments";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";

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

  const {
    data: fetchedUserAppointments,
    refetch: refetchUserAppointments,
  } = useQuery({
    queryKey: ["user_appointments"],
    queryFn: async () => {
      return await window.ipcRenderer.invoke("appointment-get-from-user", {
        token: Cookies.get("session_token"),
      });
    },
    refetchOnWindowFocus: false,
  });

  const selectedDayAppointments = fetchedUserAppointments?.data?.filter(
    (appointment: any) =>
      isSameDay(new Date(appointment.date_time), selectedDate)
  );

  const upcomingAppointments = fetchedUserAppointments?.data?.filter(
    (appointment: any) => {
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
    <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-6">
      <main className="space-y-8">
        <div className="flex flex-wrap lg:flex-auto gap-8 max-lg:justify-center">
          <CalendarComponent
            isSameDay={isSameDay}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
          <SelectedDayAppointmentsComponent
            isSameDay={isSameDay}
            selectedDayAppointments={selectedDayAppointments}
            selectedDate={selectedDate}
            refetchUserAppointments={refetchUserAppointments}
          />
        </div>
        <UpcomingDaysAppointmentsComponent
          upcomingAppointments={upcomingAppointments}
        />
      </main>
    </div>
  );
}
