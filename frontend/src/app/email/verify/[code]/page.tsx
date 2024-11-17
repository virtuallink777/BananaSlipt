"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function VerifyEmailPage() {
  const { code } = useParams(); // Obtenemos el parámetro dinámico "code"

  useEffect(() => {
    if (code) {
      // Llama al backend para verificar el código
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/email/verify/${code}`)
        .then((res) => {
          if (res.ok) {
            console.log("Correo electrónico verificado con éxito.");
          } else {
            console.error("Error al verificar el correo electrónico.");
          }
        })
        .catch((err) => console.error(err));
    }
  }, [code]);

  return (
    <div>
      <h1>Verificando tu correo electrónico...</h1>
    </div>
  );
}
