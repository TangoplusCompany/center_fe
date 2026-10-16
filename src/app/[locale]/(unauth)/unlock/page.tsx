"use client";

import React, { useState } from "react";
import Link from "next/link";
import { RequestOtpForm } from "@/components/auth/RequestOtpForm";
import InputEmail from "@/components/auth/InputEmail";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

const UnlockAccountPage = () => {
  const t = useTranslations("Index");
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(0);

  const handleInputEmail = (email: string) => {
    setEmail(email);
    setStep(1);
  };

  const handleRequestOtp = () => {
    setStep(2);
  };

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="w-full max-w-[480px]">
        <div className="w-full flex flex-col items-center gap-2">
          <h1 className="text-2xl font-bold mb-3 lg:mb-5 text-center">
            {t("login_unlock_title_0")}
          </h1>
          {step === 0 && <InputEmail purpose="account" setEmail={handleInputEmail} />}
          {step === 1 && (
            <RequestOtpForm
              handleRequestOtp={handleRequestOtp}
              email_or_mobile={email}
              purpose="account"
              type="email"
            />
          )}
          {step === 2 && (
            <div className="w-full flex flex-col gap-4">
              <p className="text-center font-medium">{t("alert_unlock")}</p>
              <Button asChild variant="outline" className="w-full">
                <Link href="/login">{t("btn_back_to_login")}</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UnlockAccountPage;
