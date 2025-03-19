"use client"

import React from "react";
import dynamic from "next/dynamic";

const UserPage = dynamic(() => import("./_components/UserPage"), {
  ssr: false,
});

const UserHome = () => {
  return (
    <div className="grid grid-cols-12 gap-5">
      <h1 className="text-2xl col-span-12">센터 사용자 관리</h1>
      <UserPage />
    </div>
  );
};

export default UserHome;
