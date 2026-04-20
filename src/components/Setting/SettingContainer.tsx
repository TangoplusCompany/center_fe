"use client";

import React, { useState } from "react";
import EditCenterContainer from "./EditCenterContainer";
import { useAuthStore } from "@/providers/AuthProvider";
import SettingTab from "./SettingTab";
import EditUserContainer from "./EditUserContainer";

const SettingContainer = () => {
  const { adminRole } = useAuthStore((state) => state);
  const isMainAdmin = adminRole === 1;
  const [nowTab, setNowTab] = useState(isMainAdmin ? 0 : 1);
  return (
    <div className="w-full flex flex-col gap-5">
      {/* 센터정보는 주관리자만 표시 */}
      <SettingTab nowTab={nowTab} setNowTab={setNowTab}/>
      {(nowTab === 0) && isMainAdmin && (
        <EditCenterContainer />
      )}
      {(nowTab === 1 ) && (
        <EditUserContainer />
      )}
    </div>
  );
};

export default SettingContainer;
