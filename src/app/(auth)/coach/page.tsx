"use client";

import React from "react";
import dynamic from "next/dynamic";

const CoachPage = dynamic(() => import("./_components/CoachPage"), {
  ssr: false,
});

const CoachHome = () => {
  return (
    <div className="grid grid-cols-12 gap-5">
      <h1 className="text-2xl col-span-12">센터 코치 관리</h1>
      <CoachPage />
    </div>
  );
};

export default CoachHome;
