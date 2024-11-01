"use client";

import * as React from "react";
import {
  ChevronRight,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Cake,
  User,
  Ruler,
  Weight,
  HeartPulse,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PatientProps } from "@/types/patient";
import formatDateShort from "@/lib/format-date-short";
import { AnimatePresence, motion } from "framer-motion";
import { CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent } from "@/components/ui/dialog";

type Props = {
  patient: PatientProps;
  viewMode: "list" | "grid";
  setIsUpdating: (isUpdating: boolean) => void;
  setSelectedPatientToUpdate: (patient: PatientProps) => void;
};

export default function PatientCardComponent({
  patient,
  viewMode,
  setIsUpdating,
  setSelectedPatientToUpdate,
}: Props) {
  const [isShowing, setIsShowing] = React.useState(false);

  return (
    <div
      key={patient._id}
      className={`group relative overflow-hidden rounded-xl border bg-card transition-all hover:shadow-lg cursor-pointer flex flex-col gap-8 ${
        viewMode === "grid" ? "p-6" : "p-4"
      }`}
      onClick={() => {
        setIsShowing(!isShowing);
      }}
    >
      <div
        className={`flex items-center gap-4 ${
          viewMode === "grid" ? "flex-col items-center text-center" : ""
        }`}
      >
        <div className="relative">
          <Avatar className="h-12 w-12 ">
            <AvatarImage src={patient.photo_url} alt={patient.name} />
            <AvatarFallback className="uppercase">
              {patient.name
                .split(" ")
                .map((name: string) => name.charAt(0))
                .join("")}
            </AvatarFallback>
          </Avatar>
          {patient.next_appointment && (
            <div className="absolute -right-0.5 -top-0.5 h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
            </div>
          )}
        </div>
        <div
          className={`flex-1 space-y-1 ${
            viewMode === "grid" ? "items-center" : ""
          }`}
        >
          <h3 className="font-medium tracking-tight">{patient.name}</h3>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            {patient.next_appointment ? (
              <p>
                {formatDateShort(patient.next_appointment.date_time)} -{" "}
                {patient.next_appointment.reason}
              </p>
            ) : (
              <span className="text-yellow-600 dark:text-yellow-500">
                Sin cita programada
              </span>
            )}
          </div>
        </div>
        <Button
          size="sm"
          variant="outline"
          className={`w-max ${viewMode === "grid" && "hidden"}`}
          onClick={(e) => {
            setIsUpdating(true);
            setSelectedPatientToUpdate(patient);
            e.stopPropagation();
          }}
        >
          <p>Actualizar</p>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className={`shrink-0 ${
            viewMode === "grid" ? "absolute right-4 top-4" : ""
          }`}
        >
          <ChevronRight
            className={`h-4 w-4 ${
              isShowing && viewMode === "list" ? "rotate-90" : ""
            } transition-transform duration-200`}
          />
          <span className="sr-only">Ver detalles</span>
        </Button>
      </div>
      <AnimatePresence>
        {isShowing && viewMode === "list" && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CardContent>
              <div className="gap-x-32 gap-y-8 grid md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold uppercase text-muted-foreground">
                    Información de contacto
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {patient.email ?? "Sin registro"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {patient.phone ?? "Sin registro"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {patient.address ?? "Sin registro"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold uppercase text-muted-foreground">
                    Información personal
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Cake className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {patient.date_of_birth
                          ? formatDateShort(patient.date_of_birth)
                          : "Sin registro"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {patient.gender
                          ? patient.gender === "male"
                            ? "Masculino"
                            : patient.gender === "female"
                            ? "Femenino"
                            : "Otro"
                          : "Sin registro"}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                      <Badge
                        variant="outline"
                        className="text-xs text-muted-foreground flex items-center gap-2"
                      >
                        <HeartPulse className="h-3 w-3 text-muted-foreground" />
                        {patient.blood_group ?? "?"}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Ruler className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {patient.height
                            ? `${patient.height} cm`
                            : "Sin registro"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Weight className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {patient.weight
                            ? `${patient.weight} cm`
                            : "Sin registro"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 md:col-span-2 lg:col-span-1">
                  <h4 className="text-sm font-semibold uppercase text-muted-foreground">
                    Citas
                  </h4>
                  {patient.appointments && patient.appointments.length > 0 ? (
                    <ScrollArea
                      className={`${
                        patient.appointments.length > 1
                          ? "h-[86px]"
                          : "h-[54px]"
                      } w-max rounded-md border p-4`}
                    >
                      <div className="space-y-3">
                        {patient.appointments.map((appointment, index) => (
                          <div
                            key={index}
                            className="flex justify-between text-sm gap-4"
                          >
                            <span>
                              {formatDateShort(appointment.date_time)}
                            </span>
                            <span className="text-muted-foreground">
                              {appointment.reason}
                            </span>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No hay citas programadas
                    </p>
                  )}
                </div>
              </div>

              <Separator className="mt-10 mb-8" />
              <div className="space-y-2">
                <h4 className="text-xs font-semibold uppercase text-muted-foreground">
                  Notas del doctor
                </h4>
                {patient.doctor_notes ? (
                  <p className="text-sm text-muted-foreground">
                    {patient.doctor_notes}
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground">Sin notas...</p>
                )}
              </div>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
      {isShowing && viewMode === "grid" && (
        <Dialog open={isShowing} onOpenChange={setIsShowing}>
          <DialogContent
            disableAnimation
            onClick={(e) => e.stopPropagation()}
            hideClose
          >
            <CardContent className="w-full py-4 px-0">
              <div className="w-full gap-4 gap-y-8 flex flex-col">
                <div className="flex justify-between">
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold uppercase text-muted-foreground">
                      Información de contacto
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {patient.email ?? "Sin registro"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {patient.phone ?? "Sin registro"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground max-w-[180px]">
                          {patient.address ?? "Sin registro"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold uppercase text-muted-foreground">
                      Información personal
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Cake className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {patient.date_of_birth
                            ? formatDateShort(patient.date_of_birth)
                            : "Sin registro"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {patient.gender
                            ? patient.gender === "male"
                              ? "Masculino"
                              : patient.gender === "female"
                              ? "Femenino"
                              : "Otro"
                            : "Sin registro"}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-sm max-w-[180px]">
                        <Badge
                          variant="outline"
                          className="text-xs text-muted-foreground flex items-center gap-2"
                        >
                          <HeartPulse className="h-3 w-3 text-muted-foreground" />
                          {patient.blood_group ?? "?"}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Ruler className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            {patient.height
                              ? `${patient.height} cm`
                              : "Sin registro"}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Weight className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            {patient.weight
                              ? `${patient.weight} cm`
                              : "Sin registro"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 md:col-span-2 lg:col-span-1">
                  <h4 className="text-sm font-semibold uppercase text-muted-foreground">
                    Citas
                  </h4>
                  {patient.appointments && patient.appointments.length > 0 ? (
                    <ScrollArea
                      className={`${
                        patient.appointments.length > 1
                          ? "h-[86px]"
                          : "h-[54px]"
                      } w-full rounded-md border p-4`}
                    >
                      <div className="space-y-3">
                        {patient.appointments.map((appointment, index) => (
                          <div
                            key={index}
                            className="flex justify-between text-sm gap-4"
                          >
                            <span>
                              {formatDateShort(appointment.date_time)}
                            </span>
                            <span className="text-muted-foreground">
                              {appointment.reason}
                            </span>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No hay citas programadas
                    </p>
                  )}
                </div>
              </div>

              <Separator className="my-8" />
              <div className="space-y-2">
                <h4 className="text-xs font-semibold uppercase text-muted-foreground">
                  Notas del doctor
                </h4>
                {patient.doctor_notes ? (
                  <p className="text-sm text-muted-foreground">
                    {patient.doctor_notes}
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground">Sin notas...</p>
                )}
              </div>
            </CardContent>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
