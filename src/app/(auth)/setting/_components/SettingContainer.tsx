"use client";

import React from "react";
import EditCenterProfileContainer from "./EditCenterProfileContainer";
import EditManagerProfileContainer from "./EditManagerProfileContainer";
import { Separator } from "@/components/ui/separator";
import EditManagerPasswordForm from "@/components/Manager/EditManagerPasswordForm";

const SettingContainer = () => {
  return (
    <div className="w-full flex flex-col gap-5">
      <EditCenterProfileContainer />
      <Separator />
      <EditManagerProfileContainer />
      <Separator />
      <EditManagerPasswordForm />
    </div>
  );
};

export default SettingContainer;
