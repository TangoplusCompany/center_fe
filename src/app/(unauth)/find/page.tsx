"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const FindPasswordPage = () => {
  const [email, setEmail] = useState("");
  const changeCenterCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filteredValue = e.target.value.replace(/[^a-zA-Z0-9@._-]/g, "");
    setEmail(filteredValue);
  };

  const handleEmailCheck = () => {};
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="w-full max-w-[480px]">
        <div className="w-full flex flex-col items-start gap-2">
          <h1 className="text-2xl font-bold mb-3 lg:mb-5 text-center">
            탱고플러스 센터관리자 비밀번호 찾기
          </h1>
          <Label htmlFor="centerCheck" className="lg:text-lg">
            이메일 입력
          </Label>
          <div className="w-full flex items-center gap-2">
            <Input
              id="centerCheck"
              type="text"
              value={email}
              onChange={changeCenterCode}
              placeholder="회원가입 하신 이메일을 입력해주세요."
              required
              className="bg-white dark:bg-border"
            />
            <Button onClick={handleEmailCheck}>확인</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindPasswordPage;
