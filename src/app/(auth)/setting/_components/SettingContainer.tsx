"use client";

import { useAuthStore } from "@/providers/AuthProvider";
import React, { useState } from "react";
import SettingTab from "@/components/Setting/SettingTab";

const SettingContainer = () => {
  const { adminName, adminEmail, adminRole } = useAuthStore((state) => state);

  const [nowTab, setNowTab] = useState("center_view");
  return (
    <nav className="w-full">
      <SettingTab nowTab={nowTab} setNowTab={setNowTab} />
      {nowTab === "center_view" && <></>}
    </nav>
  );
};

export default SettingContainer;
