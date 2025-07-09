"use client";

import React from "react";
import EditCenterProfileContainer from "./EditCenterProfileContainer";
import EditManagerProfileContainer from "./EditManagerProfileContainer";
import EditManagerPasswordForm from "@/components/Manager/EditManagerPasswordForm";
import { Separator } from "@/components/ui/separator";

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
