import { AppointmentProps } from "./appointment";
import { PatientProps } from "./patient";

export type ConsultationProps = {
  _id?: string;
  reason: string;
  symptoms: string;
  diagnosis: string;
  laboratory_studies?: {
    description?: string;
    images?: string[];
  };
  images_studies?: {
    description?: string;
    images?: string[];
  };
  treatment: string;
  patient_id: PatientProps | string;
  user_id?: string;
  appointment_id?: AppointmentProps | string;
  createdAt?: Date;
  updatedAt?:   Date;
  ;
};
