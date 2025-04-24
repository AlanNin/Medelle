"use client";
import * as React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ConsultationProps } from "@/types/consultation";
import AddObstetricConsultationComponent from "./obstetric";
import SelectionAddConsultationComponent from "./selection";
import AddGynecologicalConsultationComponent from "./gynecological";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const selections = ["selection", "obstetric", "gynecological"];

export default function AddConsultationComponent({ isOpen, setIsOpen }: Props) {
  const queryClient = useQueryClient();
  const [currentSelection, setCurrentSelection] = React.useState<
    (typeof selections)[number]
  >(selections[0]);

  const [inputs, setInputs] = React.useState<ConsultationProps>({
    reason: "",
    symptoms: "",
    diagnosis: "",
    laboratory_studies: {
      description: undefined,
      images: undefined,
    },
    images_studies: {
      description: undefined,
      images: undefined,
    },
    obstetric_information: {
      blood_pressure: undefined,
      weight: undefined,
      fundal_height: undefined,
      fcf_mfa: undefined,
      edema: undefined,
      varices: undefined,
    },
    gynecological_information: {
      last_menstrual_period: undefined,
      estimated_due_date: undefined,
      gestational_age: undefined,
    },
    notes: undefined,
    treatment: "",
    patient_id: "",
    appointment_id: undefined,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleInputObstetricInformationChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setInputs((prevInputs) => ({
      ...prevInputs,
      obstetric_information: {
        ...prevInputs.obstetric_information,
        [name]: value,
      },
    }));
  };

  const handleLaboratoryStudiesDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      laboratory_studies: {
        ...prevInputs.laboratory_studies,
        description: value,
      },
    }));
  };

  const handleLaboratoryStudiesImagesChange = (images: string[]) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      laboratory_studies: {
        ...prevInputs.laboratory_studies,
        images: images,
      },
    }));
  };

  const handleImagesStudiesDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      images_studies: {
        ...prevInputs.images_studies,
        description: value,
      },
    }));
  };

  const handleImagesStudiesImagesChange = (images: string[]) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      images_studies: {
        ...prevInputs.laboratory_studies,
        images: images,
      },
    }));
  };

  const calculateDueDate = (LMP: Date): Date | undefined => {
    if (LMP) {
      const dueDate = new Date(LMP);
      dueDate.setDate(dueDate.getDate() + 280);
      return dueDate;
    }

    return undefined;
  };

  const calculateGestationalAge = (LMP: Date): number | undefined => {
    if (LMP) {
      const today = new Date();
      const diffInMs = today.getTime() - LMP.getTime();
      const diffInWeeks = diffInMs / (1000 * 60 * 60 * 24 * 7);
      return parseFloat(diffInWeeks.toFixed(1));
    }
    return undefined;
  };

  const handleInputLMPChange = (value: Date) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      gynecological_information: {
        last_menstrual_period: value,
        estimated_due_date: calculateDueDate(value),
        gestational_age: calculateGestationalAge(value),
      },
    }));
  };

  const handleRefetchUserConsultations = async () => {
    await queryClient.refetchQueries({ queryKey: ["user_consultations"] });
  };

  const createConsultation = async () => {
    if (
      !inputs.patient_id ||
      !inputs.reason ||
      !inputs.symptoms ||
      !inputs.diagnosis ||
      !inputs.treatment
    ) {
      toast.error("Por favor, rellena todos los campos requeridos");
      return;
    }

    toast.promise(
      window.ipcRenderer.invoke("consultation-add", {
        token: localStorage.getItem("session_token"),
        data: { ...inputs, type: currentSelection },
      }),
      {
        loading: "Guardando consulta...",
        success: () => {
          handleRefetchUserConsultations();
          setIsOpen(false);
          return "Consulta creada";
        },
        error: "Ocurrió un error al crear la consulta",
      }
    );
  };

  const handleSelectPatient = (patient_id: string | undefined) => {
    if (!patient_id) {
      return;
    }

    setInputs((prevInputs) => ({
      ...prevInputs,
      patient_id: patient_id,
    }));
  };

  const { data: fetchedUserPatients } = useQuery({
    queryKey: ["user_patients"],
    queryFn: async () => {
      return await window.ipcRenderer.invoke("patient-get-from-user", {
        token: localStorage.getItem("session_token"),
      });
    },
  });

  const handleSelectAppointment = (appointment_id: string | undefined) => {
    if (!appointment_id) {
      return;
    }

    setInputs((prevInputs) => ({
      ...prevInputs,
      appointment_id: appointment_id,
    }));
  };

  const { data: fetchedUserAppointments } = useQuery({
    queryKey: ["patient_appointments", inputs.patient_id],
    queryFn: async () => {
      return await window.ipcRenderer.invoke("appointment-get-from-patient", {
        patient_id: inputs.patient_id,
        token: localStorage.getItem("session_token"),
      });
    },
    enabled: !!inputs.patient_id,
  });

  return (
    <>
      <SelectionAddConsultationComponent
        isOpen={isOpen && currentSelection === selections[0]}
        handleClose={() => setIsOpen(false)}
        setCurrentSelection={setCurrentSelection}
      />
      <AddObstetricConsultationComponent
        isOpen={isOpen && currentSelection === selections[1]}
        handleClose={() => setIsOpen(false)}
        userPatients={fetchedUserPatients?.data}
        userAppointments={fetchedUserAppointments?.data}
        handleSelectPatient={handleSelectPatient}
        handleSelectAppointment={handleSelectAppointment}
        inputs={inputs}
        handleInputChange={handleInputChange}
        handleLaboratoryStudiesDescriptionChange={
          handleLaboratoryStudiesDescriptionChange
        }
        handleLaboratoryStudiesImagesChange={
          handleLaboratoryStudiesImagesChange
        }
        handleImagesStudiesDescriptionChange={
          handleImagesStudiesDescriptionChange
        }
        handleImagesStudiesImagesChange={handleImagesStudiesImagesChange}
        handleInputLMPChange={handleInputLMPChange}
        createConsultation={createConsultation}
        handleInputObstetricInformationChange={
          handleInputObstetricInformationChange
        }
      />
      <AddGynecologicalConsultationComponent
        isOpen={isOpen && currentSelection === selections[2]}
        handleClose={() => setIsOpen(false)}
        userPatients={fetchedUserPatients?.data}
        userAppointments={fetchedUserAppointments?.data}
        handleSelectPatient={handleSelectPatient}
        handleSelectAppointment={handleSelectAppointment}
        inputs={inputs}
        handleInputChange={handleInputChange}
        handleLaboratoryStudiesDescriptionChange={
          handleLaboratoryStudiesDescriptionChange
        }
        handleLaboratoryStudiesImagesChange={
          handleLaboratoryStudiesImagesChange
        }
        handleImagesStudiesDescriptionChange={
          handleImagesStudiesDescriptionChange
        }
        handleImagesStudiesImagesChange={handleImagesStudiesImagesChange}
        createConsultation={createConsultation}
      />
    </>
  );
}
