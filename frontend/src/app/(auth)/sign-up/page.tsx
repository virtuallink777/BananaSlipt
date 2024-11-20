"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { RegisterInput } from "../../../../../backend/src/controllers/auth.schemas";
import { signUp } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Page = () => {
  const [errors, setErrors] = useState<Partial<RegisterInput>>({});
  const [formData, setFormData] = useState<RegisterInput>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | JSX.Element>("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setServerError("");

    // Validaciones en el cliente
    const clientErrors: Partial<RegisterInput> = {};
    if (formData.password.length < 6) {
      clientErrors.password = "La contraseña debe tener al menos 6 caracteres.";
    }
    if (formData.password !== formData.confirmPassword) {
      clientErrors.confirmPassword = "Las contraseñas no coinciden.";
    }

    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return; // No enviamos el formulario si hay errores
    }

    try {
      setIsLoading(true);
      const response = await signUp(formData);

      console.log("Usuario registrado:", response);
      toast.success("Registro exitoso");

      router.push(`/verifyEmail?email=${encodeURIComponent(formData.email)}`);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setServerError(
          <p className="text-sm text-red-500 text-center">
            El correo{" "}
            <span className="text-blue-500 text-xl">{formData.email}</span> ya
            está registrado, por favor Loguéate.
          </p>
        );
      } else {
        setServerError(
          error instanceof Error ? error.message : "Error en el registro"
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col items-center space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Crea tu Cuenta
          </h1>
          <Link
            className={buttonVariants({
              variant: "link",
              className: "gap-1.5 text-muted-foreground",
            })}
            href="/sign-in"
          >
            Ya tienes una cuenta?, entonces logueate
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6">
          {serverError && (
            <p className="text-sm text-red-500 text-center">{serverError}</p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <div className="grid gap-1 py-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  placeholder="Email"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  className={cn(
                    "border border-gray-400 rounded-md",
                    errors.email && "border-red-500"
                  )}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
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
              <div className="grid gap-1 py-2">
                <Label htmlFor="password-confirm">Confirma tu Contraseña</Label>
                <Input
                  placeholder="Contraseña"
                  id="confirmPassword"
                  className={cn(
                    "border border-gray-400 rounded-md",
                    errors.confirmPassword && "border-red-500"
                  )}
                  type="password"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      confirmPassword: e.target.value,
                    }))
                  }
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Registrando..." : "Crea tu cuenta"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
