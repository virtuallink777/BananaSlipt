import axios, { AxiosResponse } from "axios";
import {
  RegisterInput,
  registerSchema,
  LoginInput,
  loginSchema,
} from "../../../backend/src/controllers/auth.schemas";
import { z } from "zod";
import { toast } from "react-toastify";

interface RegisterResponse {
  user: string;
  accessToken: string;
  refreshToken: string;
}

export const signUp = async (
  data: RegisterInput
): Promise<AxiosResponse<RegisterResponse>> => {
  try {
    // validar los datos con zod
    registerSchema.parse(data);

    // enviar los datos al backend
    const response = await axios.post(
      "http://localhost:4004/auth/register",
      data
    );
    console.log(response.data);
    return response;
  } catch (error) {
    if (error instanceof z.ZodError) {
      // maneja los errores de validacion de zod
      throw error;
    }
    throw error;
  }
};

export const login = async (
  data: LoginInput
): Promise<AxiosResponse<RegisterResponse>> => {
  try {
    // validar los datos con zod

    loginSchema.parse(data);

    console.log(loginSchema.parse(data));

    if (data.verfied === false) {
      throw new Error(
        "El correo no ha sido verificado, por favor ve a tu correo y has click en el link de verificacion"
      );
    } else {
      // enviar los datos al backend
      const response = await axios.post(
        "http://localhost:4004/auth/login",
        data,
        {
          withCredentials: true, // Esta es la línea clave para manejar cookies
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      return response;
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      // maneja los errores de validacion de zod
      throw error;
    }
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axios.get(
      // Cambiar POST a GET
      "http://localhost:4004/auth/logout",
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.data);
    toast.success("Sesión cerrada");
    return response;
  } catch (error) {
    console.error("Error durante el logout:", error);
    toast.error("No se pudo cerrar la sesión");
    throw error;
  }
};
