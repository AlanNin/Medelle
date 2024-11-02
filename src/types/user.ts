import { AppointmentProps } from "./appointment";
import { ConsultationProps } from "./consultation";
import { PatientProps } from "./patient";

export type UserProps = {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  photo_url?: string;
  phone?: string;
  address?: string;
  gender?: "male" | "female" | "other";
  role?: "user" | "administrator" | "privileged";
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
