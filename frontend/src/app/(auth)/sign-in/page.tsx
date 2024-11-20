"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const Loginpage = () => {
  const handleLogin = () => {};

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

          <form onSubmit={handleLogin} className="grid gap-6">
            <div className="grid gap-2">
              <div className="grid gap-1 py-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Email" />
              </div>
              <div className="grid gap-1 py-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input placeholder="Contraseña" id="password" type="password" />
              </div>

              <Button>Logueate</Button>
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
            <form className="flex flex-col items-center space-y-4 w-full">
              <input
                placeholder="Email"
                className="p-2 border rounded-md w-full"
              />

              <Button type="submit" className="w-full p-2">
                Enviar indicaciones al email
              </Button>
            </form>
            <div className="flex justify-center mt-4"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loginpage;
