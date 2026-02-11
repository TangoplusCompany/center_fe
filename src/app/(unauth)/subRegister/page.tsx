"use client";

import React from "react";
import { SubRegisterContainer } from "../_components/SubRegisterForm";
import { useSearchParams } from "next/navigation";

const SubRegisterPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token")?.trim() ?? "";
  const email = searchParams.get("email")?.trim() ?? "";

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="w-full max-w-[480px]">
        <SubRegisterContainer token={token} email={email} />
      </div>
    </div>
  );
};

export default SubRegisterPage;
