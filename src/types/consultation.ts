import { AppointmentProps } from "./appointment";
import { PatientProps } from "./patient";
import { UserProps } from "./user";

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
  gynecological_information?: {
    last_menstrual_period?: Date;
    estimated_due_date?: Date;
    gestational_age?: number;
  };
  patient_id: PatientProps | string;
  user_id?: UserProps | string;
  appointment_id?: AppointmentProps | string;
  createdAt?: Date;
  updatedAt?: Date;
};
