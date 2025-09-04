"use client";

import React, { useState } from "react";
import { RequestOtpForm } from "@/components/auth/RequestOtpForm";
import InputEmail from "@/components/auth/InputEmail";
import ResetPwd from "@/components/auth/ResetPwd";

const FindPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [jwt, setJwt] = useState("");
  const [step, setStep] = useState(0);
  const handleInputEmail = (email: string) => {
    setEmail(email);
    setStep(1);
  };
  const handleRequestOtp = (jwt: string) => {
    setJwt(jwt);
    setStep(2);
  };
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="w-full max-w-[480px]">
        <div className="w-full flex flex-col items-start gap-2">
          <h1 className="text-2xl font-bold mb-3 lg:mb-5 text-center">
            탱고플러스 센터관리자 비밀번호 찾기
          </h1>
          {step === 0 && <InputEmail setEmail={handleInputEmail} />}
          {step === 1 && (
            <RequestOtpForm handleRequestOtp={handleRequestOtp} email={email} />
          )}
          {step === 2 && <ResetPwd jwt={jwt} email={email} />}
        </div>
      </div>
    </div>
  );
};

export default FindPasswordPage;
