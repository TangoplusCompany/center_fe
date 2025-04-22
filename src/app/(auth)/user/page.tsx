"use client";

import React from "react";
import UserPage from "./_components/UserPage";

const UserHome = () => {
  return (
    <div className="grid grid-cols-12 gap-5">
      <h1 className="text-2xl col-span-12">센터 사용자 관리</h1>
      <UserPage />
    </div>
  );
};

export default UserHome;
