import { RegisterInput } from "./validations/auth";

export async function SignUp(data: RegisterInput) {
  try {
    const response = await fetch("http://localhost:4004/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });
    const responseData = await response.json();

    if (!response) {
      throw new Error(responseData.message || "Error en el registro");
    }

    return responseData;
  } catch (error) {
    throw error;
  }
}
