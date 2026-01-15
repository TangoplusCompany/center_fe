"use client";

import React from "react";
import CenterUserPage from "@/components/User/CenterUserPage";

const UserHome = () => {
  return (
    <div className="grid grid-cols-12 gap-5 relative">
      <CenterUserPage />
    </div>
  );
};

export default UserHome;
