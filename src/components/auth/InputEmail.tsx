import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useOtpRequest } from "@/hooks/api/auth/useOtpRequest";

type OtpPurpose = "password" | "account";

const InputEmail = ({
  setEmail,
  purpose = "password",
}: {
  setEmail: (email: string) => void;
  purpose?: OtpPurpose;
}) => {
  const [value, setValue] = useState("");
  const { mutate: otpRequest } = useOtpRequest({ value, setEmail, purpose });

  const changeCenterCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filteredValue = e.target.value.replace(/[^a-zA-Z0-9@._-]/g, "");
    setValue(filteredValue);
  };
  const handleEmailCheck = () => {
    if (!value) {
      alert("이메일을 입력해주세요.");
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
        {isAccountUnlock ? "이메일 입력 (잠긴 계정 해제)" : "이메일 입력"}
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
              ? "가입 시 등록한 이메일을 입력해주세요."
              : "회원가입 하신 이메일을 입력해주세요."
          }
          required
          className="bg-white dark:bg-border"
        />
        <Button onClick={handleEmailCheck}>확인</Button>
      </div>
    </div>
  );
};

export default InputEmail;
