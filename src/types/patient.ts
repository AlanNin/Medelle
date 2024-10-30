import { AppointmentProps } from "./appointment";

export type PatientProps = {
  _id?: string;
  name: string;
  photo_url?: string;
  email?: string;
  phone?: string;
  address?: string;
  date_of_birth?: string;
  gender?: "male" | "female" | "other";
  age?: number;
  insurance?: string;
  marital_status?: string;
  blood_group?: string;
  height?: string;
  weight?: string;
  doctor_notes?: string;
  appointments?: AppointmentProps[];
  next_appointment?: AppointmentProps;
};
