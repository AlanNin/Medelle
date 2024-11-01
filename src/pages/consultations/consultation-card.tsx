import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConsultationProps } from "@/types/consultation";
import UpdateConsultationComponent from "@/components/shared-custom/update-consultation";
import ConsultationDetailsComponent from "./details";

type Props = {
  consultation: any;
};
export default function ConsultationCardComponent({ consultation }: Props) {
  const [isShowing, setIsShowing] = React.useState(false);
  const [
    selectedConsultationToShowDetails,
    setSelectedConsultationToShowDetails,
  ] = React.useState<ConsultationProps>({} as ConsultationProps);
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [
    selectedConsultationToUpdate,
    setSelectedConsultationToUpdate,
  ] = React.useState<ConsultationProps>({} as ConsultationProps);

  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Avatar className="h-12 w-12 ">
                <AvatarImage
                  src={consultation.patient_id.photo_url}
                  alt={consultation.patient_id.name}
                />
                <AvatarFallback className="uppercase">
                  {consultation.patient_id.name
                    .split(" ")
                    .map((name: string) => name.charAt(0))
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-sm font-medium">
                  {consultation.patient_id.name}
                </CardTitle>
                <CardDescription className="text-xs">
                  Teléfono: {consultation.patient_id.phone ?? "Sin registro"}
                </CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-2">
          <div>
            <div className="text-sm font-medium">Razón de consulta</div>
            <div className="text-sm text-muted-foreground line-clamp-1">
              {consultation.reason}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium">Síntomas</div>
            <div className="text-sm text-muted-foreground line-clamp-1">
              {consultation.symptoms}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium">Diagnóstico</div>
            <div className="text-sm text-muted-foreground line-clamp-1">
              {consultation.diagnosis}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium">Tratamiento</div>
            <div className="text-sm text-muted-foreground line-clamp-1">
              {consultation.treatment}
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setIsShowing(true);
                setSelectedConsultationToShowDetails(consultation);
              }}
            >
              <FileText className="h-4 w-4" />
              Ver detalles
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setIsUpdating(true);
                setSelectedConsultationToUpdate(consultation);
              }}
            >
              Actualizar consulta
            </Button>
          </div>
        </CardContent>
      </Card>
      {isUpdating && (
        <UpdateConsultationComponent
          isOpen={isUpdating}
          setIsOpen={setIsUpdating}
          consultation={selectedConsultationToUpdate}
        />
      )}
      {isShowing && (
        <ConsultationDetailsComponent
          isOpen={isShowing}
          setIsOpen={setIsShowing}
          consultation={selectedConsultationToShowDetails}
        />
      )}
    </>
  );
}
