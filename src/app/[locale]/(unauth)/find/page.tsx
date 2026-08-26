"use client";

import React, { useState } from "react";
import { RequestOtpForm } from "@/components/auth/RequestOtpForm";
import InputEmail from "@/components/auth/InputEmail";
import ResetPwd from "@/components/auth/ResetPwd";
import { useTranslations } from "next-intl";

const FindPasswordPage = () => {
  const t = useTranslations("Index")
  const [email, setEmail] = useState("");
  const [jwt, setJwt] = useState("");
  const [step, setStep] = useState(0);
  const handleInputEmail = (email: string) => {
    setEmail(email);
    setStep(1);
  };
  const handleRequestOtp = (jwt: string) => {
    if (!jwt?.trim()) return;
    setJwt(jwt);
    setStep(2);
  };
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="w-full max-w-[480px]">
        <div className="w-full flex flex-col items-start gap-2">
          <h1 className="text-2xl font-bold mb-3 lg:mb-5 text-center">
            {t('login_find_pw_title')}
          </h1>
          {step === 0 && <InputEmail setEmail={handleInputEmail} />}
          {step === 1 && (
            <RequestOtpForm
              handleRequestOtp={handleRequestOtp}
              email_or_mobile={email}
              purpose="password"
              type="email"
            />
          )}
          {step === 2 && <ResetPwd jwt={jwt} email={email} />}
        </div>
      </div>
    </div>
  );
};

export default FindPasswordPage;
