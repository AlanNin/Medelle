import { Info, Mail, Phone } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-page bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-6 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-8 text-center">
          <Info className="h-10 w-10 mx-auto mb-3" />
          <h2 className="text-2xl font-bold text-gray-800">
            Acerca de PatientCare
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            PatientCare es la solución ideal para que los médicos gestionen
            citas, consultas y pacientes de manera eficiente y segura.
          </p>
          <p className="mt-6 text-sm text-gray-600 italic mx-4">
            Por favor, tener en cuenta que esta es una versión{" "}
            <span className="font-medium">Alpha</span> de la aplicación
          </p>
          <div className="mt-6 flex flex-col items-center gap-2">
            <h3 className="text-base font-medium text-gray-800">Contáctanos</h3>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                alanbusinessnin@gmail.com
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">+1 (809) 433-5578</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
