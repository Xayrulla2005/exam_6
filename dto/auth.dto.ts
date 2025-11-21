// auth.dto.ts

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
  role?: "user" | "admin";
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface VerifyEmailDTO {
  email: string;
  code: string;
}

export interface ResendVerificationDTO {
  email: string;
}

export interface ChangePasswordDTO {
  oldPassword: string;
  newPassword: string;
}

export interface ForgotPasswordDTO {
  email: string;
}

export interface ResetPasswordDTO {
  token: string;
  newPassword: string;
}
