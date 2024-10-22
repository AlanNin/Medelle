"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Calendar as CalendarIcon,
  Stethoscope,
  ChevronRight,
  Plus,
  Grid,
  List,
} from "lucide-react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { useSelector } from "react-redux";

export default function AgendaPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [viewMode, setViewMode] = React.useState<"list" | "grid">("list");
  const { currentUser } = useSelector((state: any) => state.user);

  const todayAppointments = [
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
      patient: "Pedrito Alimñana",
      type: "Examen físico",
      avatar: "/avatars/carlos.png",
      status: "Confirmado",
    },
  ];

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
          <motion.div
            key="calendar"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="overflow-hidden">
              <CardHeader className="bg-primary text-primary-foreground p-6">
                <CardTitle className="flex items-center space-x-4 text-2xl">
                  <CalendarIcon className="h-6 w-6" />
                  <span>Calendario</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-none border-none p-4"
                />
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            className="w-full lg:h-[427px] lg:w-auto lg:flex-grow"
            key="today-appointments"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="w-full h-full lg:w-auto lg:flex-grow">
              <CardHeader className="bg-secondary text-secondary-foreground p-6">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-2xl">
                    <Clock className="h-6 w-6" />
                    <span>Citas Para Hoy</span>
                  </div>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Añadir Cita
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 ">
                <ScrollArea>
                  <ul className="divide-y divide-border ">
                    {todayAppointments.map((appointment, index) => (
                      <motion.li
                        key={appointment.id}
                        className="p-4 hover:bg-muted/50 transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage
                              src={appointment.avatar}
                              alt={appointment.patient}
                            />
                            <AvatarFallback>
                              {appointment.patient.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-1">
                            <p className="font-medium text-lg">
                              {appointment.patient}
                            </p>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="mr-2 h-4 w-4" />
                              {appointment.time} - {appointment.type}
                            </div>
                          </div>
                          <Badge
                            variant={
                              appointment.status === "Confirmado"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {appointment.status}
                          </Badge>
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </ScrollArea>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        <motion.div
          key="upcoming-appointment"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader className="bg-accent text-accent-foreground p-6">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-2xl">
                  <Stethoscope className="h-6 w-6" />
                  <span>Próximas Citas</span>
                </div>
                <Tabs
                  value={viewMode}
                  onValueChange={(value) =>
                    setViewMode(value as "list" | "grid")
                  }
                  className="w-auto"
                >
                  <TabsList>
                    <TabsTrigger value="list">
                      <List className="h-4 w-4 mr-2" />
                      Lista
                    </TabsTrigger>
                    <TabsTrigger value="grid">
                      <Grid className="h-4 w-4 mr-2" />
                      Cuadrícula
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {viewMode === "list" ? (
                <ul className="space-y-4">
                  {upcomingAppointments.map((appointment, index) => (
                    <motion.li
                      key={appointment.id}
                      className="bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="flex items-center p-4 space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={appointment.avatar}
                            alt={appointment.patient}
                          />
                          <AvatarFallback>
                            {appointment.patient.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <p className="font-medium text-lg">
                            {appointment.patient}
                          </p>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {appointment.date} - {appointment.time}
                          </div>
                        </div>
                        <Badge
                          variant={
                            appointment.status === "Confirmado"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {appointment.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          Ver detalles
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingAppointments.map((appointment, index) => (
                    <motion.div
                      key={appointment.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex flex-col items-center text-center space-y-4">
                            <Avatar className="h-20 w-20">
                              <AvatarImage
                                src={appointment.avatar}
                                alt={appointment.patient}
                              />
                              <AvatarFallback>
                                {appointment.patient.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold text-lg">
                                {appointment.patient}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {appointment.date} - {appointment.time}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {appointment.type}
                              </p>
                            </div>
                            <Badge
                              variant={
                                appointment.status === "Confirmado"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {appointment.status}
                            </Badge>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full"
                            >
                              Ver detalles
                              <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
