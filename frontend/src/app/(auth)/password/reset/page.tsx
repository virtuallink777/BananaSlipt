"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const router = useRouter();
  const searchparams = useSearchParams();
  const [code, setCode] = useState("");
  const [exp, setExp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const resetCode = searchparams.get("code");
    const expTime = searchparams.get("exp");

    if (resetCode && expTime) {
      setCode(resetCode);
      setExp(expTime);
    } else {
      setError("Código de restablecimiento inválido");
    }
  }, [searchparams]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Limpiar errores anteriores

    // Validaciones básicas
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:4004/auth/password/reset",
        {
          verificationCode: code,
          password,
          exp: parseInt(exp),
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response) {
        setSuccessMessage(
          "Tu contraseña fue restablecida con éxito. Por favor, inicia sesión con tu nueva contraseña."
        );
      }

      setTimeout(() => {
        router.push("/sign-in");
      }, 4000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data.message || "No se pudo restablecer la contraseña"
        );
      } else {
        setError("Error de conexión");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-4">
        <h2 className="text-2xl font-bold text-center">
          Restablecer Contraseña
        </h2>
        <p className="text-center">Ingresa Tu nueva Contraseña</p>
        {successMessage && (
          <div className="success-message">
            <p>{successMessage}</p>
          </div>
        )}
        {/* Mostrar error de manera no invasiva */}
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <Label htmlFor="password">Nueva Contraseña</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Ingresa tu nueva contraseña"
            />
          </div>
          <div>
            <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirma tu nueva contraseña"
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Reestableciendo..." : "Restablecer Contraseña"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
