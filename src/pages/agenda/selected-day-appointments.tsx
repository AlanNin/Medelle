import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarCheck, ChevronRight, Clock } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { AddAppointmentComponent } from "./add-appointment";

type Props = {
  isSameDay: (date_1: Date | undefined, date_2: Date) => boolean;
  todayAppointments: any[];
  selectedDate: Date;
};

export default function SelectedDayAppointmentsComponent({
  isSameDay,
  todayAppointments,
  selectedDate,
}: Props) {
  return (
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
            <AddAppointmentComponent />
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 h-full w-full ">
          {todayAppointments.length > 0 ? (
            <ScrollArea className="h-[342px]">
              <ul className="divide-y divide-border ">
                {todayAppointments.map((appointment, index) => (
                  <motion.li
                    key={appointment.id}
                    className="p-4 hover:bg-muted/50 transition-colors cursor-pointer"
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
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="mb-20 lg:mb-28 flex items-center gap-4">
                <CalendarCheck
                  className="h-8 w-8 text-primary"
                  strokeWidth={1.2}
                />
                <Label className="text-center text-xl font-medium">
                  ¡Día libre! Relájate, no tienes citas pendientes.
                </Label>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
