"use client";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const router = useRouter();
  const params = useParams();
  const [state, setState] = useState({
    message: "Verificando tu correo...",
    success: false,
    loading: true,
  });

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const code = params.code;

        if (!code) {
          setState({
            success: false,
            message: "Código de verificación inválido o faltante.",
            loading: false,
          });
          return;
        }

        const response = await fetch(
          `http://localhost:4004/api/auth/email/verify/${code}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Error al verificar el correo");
        }

        setState({
          success: true,
          message: "¡Correo verificado con éxito!",
          loading: false,
        });

        setTimeout(() => {
          router.push("/");
        }, 3000);
      } catch (error) {
        setState({
          success: false,
          message:
            error instanceof Error
              ? error.message
              : "Error al verificar el correo.",
          loading: false,
        });
      }
    };

    verifyEmail();
  }, [params.code, router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        {state.loading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="text-center">
            <h1
              className={`text-xl font-semibold mb-4 ${
                state.success ? "text-green-600" : "text-gray-800"
              }`}
            >
              {state.message}
            </h1>
            {state.success && (
              <p className="text-sm text-gray-600">
                Serás redirigido a la página principal en unos momentos...
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
