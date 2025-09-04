"use client";

import React from "react";
import EditCenterProfileContainer from "./EditCenterProfileContainer";
import EditManagerProfileContainer from "./EditManagerProfileContainer";
import EditManagerPasswordForm from "@/components/Manager/EditManagerPasswordForm";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/providers/AuthProvider";

const SettingContainer = () => {
  const { adminRole } = useAuthStore((state) => state);
  const isMainAdmin = adminRole === 1;

  return (
    <div className="w-full flex flex-col gap-5">
      {/* 센터정보는 주관리자만 표시 */}
      {isMainAdmin && (
        <>
          <EditCenterProfileContainer />
          <Separator />
        </>
      )}
      {/* 개인정보는 모든 관리자가 수정 가능 */}
      <EditManagerProfileContainer />
      <Separator />
      {/* 비밀번호 수정은 모든 관리자가 수정 가능 */}
      <EditManagerPasswordForm />
    </div>
  );
};

export default SettingContainer;
