"use client";

import * as React from "react";
import CalendarComponent from "./calendar";
import SelectedDayAppointmentsComponent from "./selected-day-appointments";
import UpcomingDaysAppointmentsComponent from "./upcoming-days-appointments";

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

  const todayAppointments = isSameDay(selectedDate, new Date())
    ? [
        {
          id: 1,
          time: "09:00",
          patient: "Juan Pérez",
          type: "Consulta general",
          avatar: "/avatars/juan.png",
          status: "Confirmado",
        },
        {
          id: 2,
          time: "11:30",
          patient: "María García",
          type: "Seguimiento",
          avatar: "/avatars/maria.png",
          status: "En espera",
        },
        {
          id: 3,
          time: "14:00",
          patient: "Carlos Rodríguez",
          type: "Examen físico",
          avatar: "/avatars/carlos.png",
          status: "Confirmado",
        },
        {
          id: 4,
          time: "14:00",
          patient: "Pedrito Alimaña",
          type: "Examen físico",
          avatar: "/avatars/carlos.png",
          status: "Confirmado",
        },
        {
          id: 4,
          time: "14:00",
          patient: "Pedrito Alimaña",
          type: "Examen físico",
          avatar: "/avatars/carlos.png",
          status: "Confirmado",
        },
      ]
    : [];

  const upcomingAppointments = [
    {
      id: 4,
      date: "2024-10-22",
      time: "10:00",
      patient: "Ana Martínez",
      type: "Primera visita",
      avatar: "/avatars/ana.png",
      status: "Confirmado",
    },
    {
      id: 5,
      date: "2024-10-23",
      time: "16:30",
      patient: "Luis Sánchez",
      type: "Consulta de rutina",
      avatar: "/avatars/luis.png",
      status: "En espera",
    },
    {
      id: 6,
      date: "2024-10-25",
      time: "13:00",
      patient: "Elena López",
      type: "Revisión de resultados",
      avatar: "/avatars/elena.png",
      status: "Confirmado",
    },
  ];

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
            todayAppointments={todayAppointments}
            selectedDate={selectedDate}
          />
        </div>
        <UpcomingDaysAppointmentsComponent
          upcomingAppointments={upcomingAppointments}
        />
      </main>
    </div>
  );
}
