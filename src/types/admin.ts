export type Type = "email" | "mobile";
export type Purpose = "account" | "password";

export interface IOtpProps {
  email_or_mobile: string;
  type: Type;
  purpose: Purpose;
}

export interface IOtpVerifyProps extends IOtpProps {
  otp: string;
}

export interface IResetPwdProps extends IOtpProps {
  jwt: string;
  new_password: string;
}