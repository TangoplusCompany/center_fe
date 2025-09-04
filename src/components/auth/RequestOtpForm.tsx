"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useOtpVerify } from "@/hooks/api/auth/useOtpVerify";

const FormSchema = z.object({
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export const RequestOtpForm = ({
  email,
  handleRequestOtp,
}: {
  email: string;
  handleRequestOtp: (jwt: string) => void;
}) => {
  const { mutate: otpVerify } = useOtpVerify({ handleRequestOtp });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    otpVerify({
      email_or_mobile: email,
      type: "email",
      purpose: "password",
      otp: data.otp,
    });
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-2"
    >
      <legend className="text-lg">OTP 입력</legend>
      <div className="flex gap-2">
        <InputOTP
          maxLength={6}
          value={form.watch("otp")}
          onChange={(value) => form.setValue("otp", value)}
        >
          <InputOTPGroup>
            <InputOTPSlot className="bg-white" index={0} />
            <InputOTPSlot className="bg-white" index={1} />
            <InputOTPSlot className="bg-white" index={2} />
            <InputOTPSlot className="bg-white" index={3} />
            <InputOTPSlot className="bg-white" index={4} />
            <InputOTPSlot className="bg-white" index={5} />
          </InputOTPGroup>
        </InputOTP>
        <Button type="submit">확인</Button>
      </div>
    </form>
  );
};
