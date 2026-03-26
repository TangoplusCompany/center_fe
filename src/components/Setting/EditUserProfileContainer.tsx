"use client";

import ManagerEditForm from "@/components/Manager/ManagerEditForm";
import { useGetManagerDetail } from "@/hooks/api/manager/useGetManagerDetail";
import { useAuthStore } from "@/providers/AuthProvider";
import React from "react";
import { ICenterManagerData } from "@/types/manager";

// ManagerEditForm에서 실제로 사용하는 속성만 포함하는 타입
type ManagerEditData = Pick<ICenterManagerData, 'sn' | 'admin_name' | 'mobile' | 'admin_email' | 'admin_role'>;

const EditManagerProfileContainer = () => {
  const { adminSn, adminRole, adminName, adminEmail, adminMobile } = useAuthStore((state) => state);
  const {
    data: managerInformation,
    isLoading,
    isError,
  } = useGetManagerDetail({ managerSn: adminSn.toString() });

  // 주관리자가 아닌 경우에도 개인정보는 수정 가능하도록 처리
  if (isLoading) return <div>Loading...</div>;
  if (isError) {
    // 권한이 낮은 사용자의 경우 기본 정보로 폼 표시
    if (adminRole !== 1) {
      const defaultManagerData: ManagerEditData = {
        sn: adminSn,
        admin_name: adminName,
        mobile: adminMobile,
        admin_email: adminEmail,
        admin_role: adminRole,
      };
      return <ManagerEditForm managerData={defaultManagerData} />;
    }
    return <div>Error loading data</div>;
  }
  if (!managerInformation) {
    // 권한이 낮은 사용자의 경우 기본 정보로 폼 표시
    if (adminRole !== 1) {
      const defaultManagerData: ManagerEditData = {
        sn: adminSn,
        admin_name: adminName,
        mobile: adminMobile,
        admin_email: adminEmail,
        admin_role: adminRole,
      };
      return <ManagerEditForm managerData={defaultManagerData} />;
    }
    return <div>No data available</div>;
  }
  return <ManagerEditForm managerData={managerInformation} />;
};

export default EditManagerProfileContainer;
