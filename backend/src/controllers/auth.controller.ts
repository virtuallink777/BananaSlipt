import { CREATED, OK, UNAUTHORIZED } from "../constans/http";
import SessionModel from "../models/sessionModel";
import {
  createAccount,
  loginUser,
  refreshUserAccessToken,
  resetPassword,
  sendPasswordResetEmail,
  verifyEmail,
} from "../services/auth.services";
import appAssert from "../utils/appAssert";
import {
  clearAuthCookies,
  getAccessTokenCookieOptions,
  getRefreshTokenCookieOptions,
  setAuthCookies,
} from "../utils/cookies";
import { verifyToken } from "../utils/jwt";
import catchErrors from "../utils/catchErrors";
import {
  emailSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  verificationCodeSchema,
} from "./auth.schemas";
import { CustomError, EmailNotVerifiedError } from "../utils/customError";
import { z } from "zod";

export const registerHandler = catchErrors(async (req, res) => {
  console.log("Intentando registrar usuario:", req.body.email);
  const request = registerSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  try {
    const { user, accessToken, refreshToken } = await createAccount(request);
    console.log("Usuario creado exitosamente:", user.email);
    return setAuthCookies({ res, accessToken, refreshToken })
      .status(CREATED)
      .json(user);
  } catch (error) {
    if (error instanceof CustomError && error.code === "USER_ALREADY_EXISTS") {
      return res.status(409).json({
        error: true,
        message:
          error.message || "El usuario ya existe. Por favor, inicie sesión.",
      });
    }
    // Re-lanzar otros errores para que sean manejados por catchErrors
    throw error;
  }
});

export const loginHandler = catchErrors(async (req, res) => {
  try {
    // Validar los datos de entrada con zod
    const request = loginSchema.parse({
      ...req.body,
      userAgent: req.headers["user-agent"],
    });

    // Llamar al servicio de login
    const { accessToken, refreshToken } = await loginUser(request);

    // Establecer cookies y devolver una respuesta exitosa
    return setAuthCookies({ res, accessToken, refreshToken })
      .status(OK)
      .json({ message: "Login successful" });
  } catch (error) {
    // Manejar error de correo no verificado
    if (error instanceof EmailNotVerifiedError) {
      return res.status(403).json({
        error: true,
        message: error.message,
      });
    }

    // Manejar errores de validación del esquema zod
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: true,
        message: "Datos de entrada inválidos",
        details: error.errors, // Detalles del esquema fallido
      });
    }

    // Propagar otros errores para el manejo global
    throw error;
  }
});

export const logoutHandler = catchErrors(async (req, res) => {
  const accessToken = req.cookies.accessToken as string | undefined;
  const { payload } = verifyToken(accessToken || "");

  if (payload) {
    // remove session from db
    await SessionModel.findByIdAndDelete(payload.sessionId);
  }

  // clear cookies
  return clearAuthCookies(res)
    .status(OK)
    .json({ message: "Logout successful" });
});

export const refreshHandler = catchErrors(async (req, res) => {
  const refreshToken = req.cookies.refreshToken as string | undefined;
  appAssert(refreshToken, UNAUTHORIZED, "Missing refresh token");

  const { accessToken, newRefreshToken } = await refreshUserAccessToken(
    refreshToken
  );
  if (newRefreshToken) {
    res.cookie("refreshToken", newRefreshToken, getRefreshTokenCookieOptions());
  }
  return res
    .status(OK)
    .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
    .json({ message: "Access token refreshed" });
});

export const verifyEmailHandler = catchErrors(async (req, res) => {
  const verificationCode = verificationCodeSchema.parse(req.params.code);

  await verifyEmail(verificationCode);

  return res.status(OK).json({ message: "Email was successfully verified" });
});

export const sendPasswordResetHandler = catchErrors(async (req, res) => {
  const email = emailSchema.parse(req.body.email);

  await sendPasswordResetEmail(email);

  return res.status(OK).json({ message: "Password reset email sent" });
});

export const resetPasswordHandler = catchErrors(async (req, res) => {
  const request = resetPasswordSchema.parse(req.body);

  await resetPassword(request);

  return clearAuthCookies(res)
    .status(OK)
    .json({ message: "Password was reset successfully" });
});
