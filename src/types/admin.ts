type Type = "email" | "mobile";
type Purpose = "account" | "password";

export interface IOtpProps {
  email_or_mobile: string;
  type: Type;
  purpose: Purpose;
}

export interface IOtpVerifyProps extends IOtpProps {
  otp: string;
}
