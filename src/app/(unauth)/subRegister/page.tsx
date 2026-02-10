"use client";

import React from "react";
import { SubRegisterContainer } from "../_components/SubRegisterForm";
import { useSearchParams } from "next/navigation";

const SubRegisterPage = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="w-full max-w-[480px]">
        <SubRegisterContainer email={email} />
      </div>
    </div>
  );
};

export default SubRegisterPage;
