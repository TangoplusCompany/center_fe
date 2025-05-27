import React from "react";
import SettingContainer from "./_components/SettingContainer";

const SettingHome = () => {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl">설정</h1>
      <SettingContainer />
    </div>
  );
};

export default SettingHome;
