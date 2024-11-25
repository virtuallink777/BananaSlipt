export class CustomError extends Error {
  constructor(public code: string, message: string) {
    super(message);
    this.name = "CustomError";
  }
}

export class EmailNotVerifiedError extends CustomError {
  constructor(message = "Por favor verifica tu email antes de iniciar sesión") {
    super("EMAIL_NOT_VERIFIED", message);
  }
}
