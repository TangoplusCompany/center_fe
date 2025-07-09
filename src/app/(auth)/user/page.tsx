"use client";

import React from "react";
import CenterUserPage from "@/components/User/CenterUserPage";

const UserHome = () => {
  return (
    <div className="grid grid-cols-12 gap-5 relative">
      <h1 className="text-2xl col-span-12">센터 사용자 관리</h1>
      <CenterUserPage />
    </div>
  );
};

export default UserHome;
