import { AppointmentProps } from "./appointment";
import { ConsultationProps } from "./consultation";
import { PatientProps } from "./patient";

export type UserProps = {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  photo_url?: string;
  work_logo_url?: string;
  personal_phone?: string;
  work_phone?: string;
  speciality?: string;
  work_address?: string;
  assists?: {
    name: string;
    id: string;
  };
  gender?: "male" | "female" | "other";
  role?: "user" | "administrator" | "privileged" | "assistant";
  subscription?: {
    type?: "single-purchase" | "active" | "inactive";
    due_date?: Date;
  };
  appointments?: AppointmentProps[];
  patients?: PatientProps[];
  consultations?: ConsultationProps[];
  createdAt?: Date;
  updatedAt?: Date;
};
