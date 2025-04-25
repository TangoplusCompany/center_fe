"use client";

import React, { JSX, useState } from "react";
import SettingTab from "@/components/Setting/SettingTab";
import CenterInformation from "@/components/Center/CenterInformation";
import { SettingTabEnum } from "@/types/setting";
import CenterManagerList from "@/components/Center/CenterManagerList";

const settingComponent: Record<SettingTabEnum, JSX.Element> = {
  center_view: <CenterInformation />,
  admin_view: <CenterManagerList />,
};

const SettingContainer = () => {
  const [nowTab, setNowTab] = useState<SettingTabEnum>("center_view");
  return (
    <>
      <nav className="w-full">
        <SettingTab nowTab={nowTab} setNowTab={setNowTab} />
      </nav>
      {settingComponent[nowTab]}
    </>
  );
};

export default SettingContainer;
