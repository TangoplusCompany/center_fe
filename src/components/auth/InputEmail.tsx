import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useOtpRequest } from "@/hooks/api/auth/useOtpRequest";
import { useTranslations } from "next-intl";

type OtpPurpose = "password" | "account";

const InputEmail = ({
  setEmail,
  purpose = "password",
}: {
  setEmail: (email: string) => void;
  purpose?: OtpPurpose;
}) => {
  const t = useTranslations("Index");
  const [value, setValue] = useState("");
  const { mutate: otpRequest, isPending: isSending } = useOtpRequest({
    value,
    setEmail,
    purpose,
    t
  });

  const changeCenterCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filteredValue = e.target.value.replace(/[^a-zA-Z0-9@._-]/g, "");
    setValue(filteredValue);
  };
  const handleEmailCheck = () => {
    if (!value) {
      alert(t("alert_sub_admin_invite_meail_min"));
      return;
    }
    otpRequest({
      email_or_mobile: value,
      type: "email",
      purpose,
    });
  };
  const isAccountUnlock = purpose === "account";
  return (
    <div className="w-full flex flex-col gap-2">
      <Label htmlFor="centerCheck" className="lg:text-lg">
        {isAccountUnlock ? t("login_unlock_title_1") : t("login_find_email")}
      </Label>
      <div className="w-full flex items-center gap-2">
        <Input
          id="centerCheck"
          type="text"
          maxLength={30}
          value={value}
          onChange={changeCenterCode}
          placeholder={
            isAccountUnlock
              ? t("login_unlock_input_eamil_hint")
              : t("login_find_email_hint")
          }
          required
          className="bg-white dark:bg-border"
        />
        <Button onClick={handleEmailCheck} disabled={isSending}>
          {isSending ? t("btn_sub_admin_invite_pending") : t("btn_confirm")}
        </Button>
      </div>
    </div>
  );
};

export default InputEmail;
