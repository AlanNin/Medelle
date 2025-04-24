import { useEffect, useRef, useState } from "react";
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
import AppLogo from "@/assets/icons/AppLogo.png";
import useAuth from "@/hooks/use-auth";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Eye, EyeClosed, Info } from "lucide-react";

type SignInInputs = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [inputs, setInputs] = useState<SignInInputs>({
    email: "",
    password: "",
    rememberMe: false,
  });

  const {
    handleSignUp,
    handleLogin,
    session_exists,
    handlePersistentSession,
    handleRecoverPassword,
  } = useAuth();
  const hasExecutedRef = useRef(false);

  useEffect(() => {
    if (session_exists && !hasExecutedRef.current) {
      handlePersistentSession();
      hasExecutedRef.current = true;
      return;
    }
  }, []);

  const lastEmail = localStorage.getItem("lastEmail");
  const emailData = inputs.email ?? lastEmail;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-white p-8">
      <div className="w-full max-w-4xl p-8 flex flex-col md:flex-row items-center bg-white rounded-3xl shadow-2xl">
        <div className="w-1/2  flex flex-col items-center">
          <img
            src={AppLogo}
            alt="App Logo"
            className="relative z-10 w-32 h-auto mx-auto invert dark:invert-0"
          />
          <h1 className="text-4xl font-extrabold text-center mt-6 mb-2">
            Medelle
          </h1>
          <Label className="text-primary/85 text-center">
            Mejor atención, mejores resultados.
          </Label>
        </div>
        <Card className="w-1/2 border-0 shadow-none">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold"> ¡Bienvenido!</CardTitle>
            <CardDescription>
              Ingresa tus credenciales para acceder a tu cuenta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) =>
                handleLogin(emailData!, inputs.password, e, inputs.rememberMe)
              }
              className="space-y-6"
            >
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Correo Electrónico
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="c@dominio.com"
                  required
                  value={inputs.email ?? undefined}
                  defaultValue={lastEmail ?? undefined}
                  onChange={(e) =>
                    setInputs({ ...inputs, email: e.target.value })
                  }
                  className="transition-all duration-200 focus:ring-2 focus:ring-black"
                  autoComplete="off"
                />
              </div>
              <div className="space-y-2">
                <div className="w-full flex justify-between items-center">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Contraseña
                  </Label>
                  <p
                    className="text-xs text-primary/85 hover:underline cursor-pointer"
                    onClick={handleRecoverPassword}
                  >
                    ¿Olvidaste tu contraseña?
                  </p>
                </div>

                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={inputs.password ?? undefined}
                    onChange={(e) =>
                      setInputs({ ...inputs, password: e.target.value })
                    }
                    className="transition-all duration-200 focus:ring-2 focus:ring-black pr-10"
                    autoComplete="off"
                  />
                  {showPassword ? (
                    <EyeClosed
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer h-4 w-4"
                      strokeWidth={1.5}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <Eye
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer h-4 w-4"
                      strokeWidth={1.5}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rememberMe"
                  checked={inputs.rememberMe}
                  onCheckedChange={(value) =>
                    setInputs({ ...inputs, rememberMe: value === true })
                  }
                  className="border-primary/65"
                />
                <label
                  className="text-sm text-primary/85 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-1.5 cursor-pointer"
                  htmlFor="rememberMe"
                >
                  Recordar mi correo electrónico
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3.5 w-3.5 text-muted-foreground mt-0.5" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          Rellenará el campo "Correo Electrónico" por defecto al
                          terminar la sesión
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </label>
              </div>

              <Button className="w-full font-semibold" type="submit">
                Iniciar Sesión
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-primary/85">
              ¿No tienes cuenta?{" "}
              <button
                onClick={handleSignUp}
                className="hover:underline cursor-pointer"
              >
                Registrate ahora
              </button>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
