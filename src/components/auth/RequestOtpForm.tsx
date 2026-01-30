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
import type { Purpose, Type } from "@/types/admin";

const FormSchema = z.object({
  otp: z.string().min(6, {
    message: "OTP는 6자리입니다.",
  }),
});

export const RequestOtpForm = ({
  email_or_mobile,
  handleRequestOtp,
  purpose = "password",
  type = "email",
}: {
  /** OTP 받을 이메일 또는 전화번호 (t_admin_info에 등록된 값) */
  email_or_mobile: string;
  handleRequestOtp: (jwt: string) => void;
  /** account: 계정해제, password: 비밀번호 찾기 */
  purpose?: Purpose;
  /** OTP 전달 매개체: email | mobile */
  type?: Type;
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
      email_or_mobile,
      type,
      purpose,
      otp: data.otp,
    });
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-2"
    >
      <legend className="text-lg">
        {purpose === "account" ? "잠긴 계정 해제용 OTP 입력" : "OTP 입력"}
      </legend>
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
