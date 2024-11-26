"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { LoginInput } from "../../../../../backend/src/controllers/auth.schemas";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { forgotPassword, login } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { isAxiosError } from "axios";

const LoginPage = () => {
  const [errors, setErrors] = useState<Partial<LoginInput>>({});
  const [formData, setFormData] = useState<LoginInput>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | JSX.Element>("");

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setServerError("");

    try {
      setIsLoading(true);
      const response = await login(formData);
      console.log(response);
      if (response.status === 200) {
        router.push("/controlPanel");
        router.refresh();
      }
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        const status = error.response?.status;
        switch (status) {
          case 401:
            setServerError(
              <p className="text-sm text-red-500 text-center">
                El correo{" "}
                <span className="text-blue-500 text-xl">{formData.email}</span>{" "}
                o la contraseña estan incorrectas, intentalo nuevamente
              </p>
            );
            break;
          case 403:
            setServerError(
              <p className="text-sm text-red-500 text-center">
                El correo{" "}
                <span className="text-blue-500 text-xl">{formData.email}</span>{" "}
                no ha sido verificado, por favor ingresa a tu correo y haz click
                en el link de verificacion
              </p>
            );
            break;
          default:
            setServerError(
              <div className="text-sm text-red-500 text-center">
                Algo salió mal. Por favor intenta nuevamente.
              </div>
            );
        }
      } else {
        setServerError(
          <div className="text-sm text-red-500 text-center">
            Error de conexión. Por favor intenta más tarde.
          </div>
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  // logica para restear la contraseña

  const [email, setEmail] = useState("");
  const [isLoadingReset, setIsLoadingReset] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoadingReset(true);
    setMessage("");
    setError("");

    try {
      // Aquí llamarás a tu función de API para solicitar restablecimiento

      const response = await forgotPassword(email);
      setMessage(response.data.message);

      setMessage("Se han enviado instrucciones a tu correo electrónico");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setIsLoadingReset(false);
    }
  };

  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Logueate</h1>

            <Link
              className={buttonVariants({
                variant: "link",
                className: "gap-1.5 text-muted-foreground",
              })}
              href="/sign-up"
            >
              No tienes una Cuenta? entonces creala...
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {serverError && (
            <div className="text-sm text-red-500 text-center">
              {serverError}{" "}
            </div>
          )}

          <form onSubmit={handleLogin} className="grid gap-6">
            <div className="grid gap-2">
              <div className="grid gap-1 py-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="grid gap-1 py-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  placeholder="Contraseña"
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  className={cn(
                    "border border-gray-400 rounded-md",
                    errors.password && "border-red-500"
                  )}
                />

                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Logueandose..." : "Logueate"}
              </Button>
            </div>
          </form>
        </div>
      </div>

      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center items-center space-y-6 sm:w-[350px]">
          <h1 className="text-2xl font-bold text-center">
            ¿Olvidaste tu contraseña?
          </h1>
          <p className="text-muted-foreground text-center">
            Ingresa tu dirección de email y te enviaremos instrucciones para
            restablecer tu contraseña.
          </p>
          <div className="flex flex-col items-center space-y-2 w-full">
            <form
              className="flex flex-col items-center space-y-4 w-full"
              onSubmit={handleForgotPassword}
            >
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="p-2 border rounded-md w-full"
              />

              <Button
                type="submit"
                className="w-full p-2"
                disabled={isLoadingReset}
              >
                {isLoadingReset
                  ? "Enviando..."
                  : "Enviar indicaciones al email"}
              </Button>
            </form>
            {message && (
              <p className="text-sm text-green-500 text-center mt-2">
                {message}
              </p>
            )}
            {error && (
              <p className="text-sm text-red-500 text-center mt-2">{error}</p>
            )}
            <div className="flex justify-center mt-4"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
