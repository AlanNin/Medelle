"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarCheck, ChevronRight, Clock, Plus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { AddAppointmentComponent } from "@/components/shared-custom/add-appointment";
import formatTime from "@/lib/format-time";
import { UpdateAppointmentComponent } from "@/components/shared-custom/update-appointment";
import { AppointmentProps } from "@/types/appointment";
import { Button } from "@/components/ui/button";

type Props = {
  isSameDay: (date_1: Date | undefined, date_2: Date) => boolean;
  selectedDayAppointments: any[];
  selectedDate: Date;
  refetchUserAppointments: () => void;
};

export default function SelectedDayAppointmentsComponent({
  isSameDay,
  selectedDayAppointments,
  selectedDate,
  refetchUserAppointments,
}: Props) {
  const isSelectedDateInThePast = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const [isAdding, setIsAdding] = React.useState(false);

  const [isUpdating, setIsUpdating] = React.useState(false);

  const [
    selectedAppointmentToUpdate,
    setSelectedAppointmentToUpdate,
  ] = React.useState<AppointmentProps>({} as AppointmentProps);

  return (
    <>
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
                <span>
                  {isSameDay(selectedDate, new Date())
                    ? "Citas para el día de hoy"
                    : `Citas para el día ${selectedDate?.toLocaleDateString(
                        "es-ES",
                        {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}`}
                </span>
              </div>
              <>
                <Button
                  variant="outline"
                  size="default"
                  onClick={() => setIsAdding(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Añadir Cita
                </Button>
                {isAdding && (
                  <AddAppointmentComponent
                    refetchUserAppointments={refetchUserAppointments}
                    isOpen={isAdding}
                    setIsOpen={setIsAdding}
                  />
                )}
              </>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 h-full w-full ">
            {selectedDayAppointments && selectedDayAppointments.length > 0 ? (
              <ScrollArea className="h-[342px]">
                <ul className="divide-y divide-border ">
                  {selectedDayAppointments.map((appointment, index) => (
                    <motion.li
                      key={appointment._id}
                      className="p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      onClick={() => {
                        setIsUpdating(true);
                        setSelectedAppointmentToUpdate(appointment);
                      }}
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={appointment.patient_id.photo_url}
                            alt={appointment.patient_id.name}
                          />
                          <AvatarFallback className="uppercase">
                            {appointment.patient_id.name
                              .split(" ")
                              .map((name: string) => name.charAt(0))
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1  space-y-1">
                          <p className="font-medium text-lg">
                            {appointment.patient_id.name}
                          </p>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="mr-1.5 h-4 w-4" />
                            {formatTime(appointment.date_time)}
                            {appointment.reason && ` - ${appointment.reason}`}
                          </div>
                        </div>
                        <Badge
                          variant={
                            appointment.status === "waiting"
                              ? "secondary"
                              : appointment.status === "confirmed"
                              ? "outline"
                              : appointment.status === "completed"
                              ? "default"
                              : "destructive"
                          }
                        >
                          {appointment.status === "waiting"
                            ? "En espera"
                            : appointment.status === "confirmed"
                            ? "Confirmado"
                            : appointment.status === "completed"
                            ? "Completado"
                            : "Cancelado"}
                        </Badge>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </ScrollArea>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="mb-20 lg:mb-28 flex items-center gap-4">
                  <CalendarCheck
                    className="h-8 w-8 text-primary"
                    strokeWidth={1.2}
                  />
                  <Label className="text-center text-xl font-medium">
                    {isSelectedDateInThePast(selectedDate)
                      ? "¡Woah, cero estrés! No tuviste citas este día"
                      : "¡Día libre! Relájate, no tienes citas pendientes."}
                  </Label>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
      {isUpdating && (
        <UpdateAppointmentComponent
          appointment={selectedAppointmentToUpdate}
          refetchUserAppointments={refetchUserAppointments}
          isOpen={isUpdating}
          setIsOpen={setIsUpdating}
        />
      )}
    </>
  );
}
