import axios, { AxiosResponse } from "axios";
import {
  RegisterInput,
  registerSchema,
} from "../../../backend/src/controllers/auth.schemas";
import { z } from "zod";

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
