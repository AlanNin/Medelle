import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import AppLogo from "@/assets/icons/AppLogoBlack.png";
import useAuth from "@/hooks/use-auth";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleLogin } = useAuth();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-white p-8">
      <div className="w-full max-w-4xl p-8 flex flex-col md:flex-row items-center bg-white rounded-3xl shadow-2xl">
        <div className="w-1/2  flex flex-col items-center">
          <img
            src={AppLogo}
            alt="App Logo"
            className="relative z-10 w-32 h-auto mx-auto"
          />
          <h1 className="text-4xl font-extrabold text-center mt-6 mb-2">
            PatientCare
          </h1>
          <Label className="text-gray-600 text-center">
            Mejor atención, mejores resultados.
          </Label>
        </div>
        <Card className="w-1/2 border-0 shadow-none">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold">Bienvenido</CardTitle>
            <CardDescription>
              Ingresa tus credenciales para acceder a tu cuenta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => handleLogin(email, password, e)}
              className="space-y-6"
            >
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Correo Electrónico
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@dominio.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="transition-all duration-200 focus:ring-2 focus:ring-black"
                />
              </div>
              <div className="space-y-2">
                <div className="w-full flex justify-between items-center">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Contraseña
                  </Label>
                  <p className="text-xs text-gray-600 hover:underline cursor-pointer">
                    ¿Olvidaste tu contraseña?
                  </p>
                </div>

                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="transition-all duration-200 focus:ring-2 focus:ring-black"
                />
              </div>
              <Button
                className="w-full font-semibold bg-black text-white hover:bg-gray-800 transition-colors duration-200"
                type="submit"
              >
                Iniciar Sesión
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-600 ">
              ¿No tienes cuenta?{" "}
              <span className="hover:underline cursor-pointer">
                Registrate ahora
              </span>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
