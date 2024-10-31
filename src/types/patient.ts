import { AppointmentProps } from "./appointment";

export type PatientProps = {
  _id?: string;
  name: string;
  photo_url?: string;
  email?: string;
  phone?: string;
  address?: string;
  date_of_birth?: Date;
  gender?: "male" | "female" | "other";
  age?: number;
  insurance?: string;
  marital_status?: string;
  blood_group?: string;
  height?: number;
  weight?: number;
  medical_history?: {
    pathological_history?: string;
    family_history?: string;
    surgical_history?: string;
    toxic_habits?: string;
    allergy_history?: string;
    gynecological_history?: {
      menarche?: number;
      telarche?: number;
      first_coitus?: number;
    };
    transfusion_history?: string;
    obstetric_history?: string;
  };
  doctor_notes?: string;
  appointments?: AppointmentProps[];
  user_id?: string;
  next_appointment?: AppointmentProps;
  created_at?: string;
  updated_at?: string;
};
