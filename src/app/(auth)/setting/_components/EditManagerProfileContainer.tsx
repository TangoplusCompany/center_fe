"use client";

import ManagerEditForm from "@/components/Manager/ManagerEditForm";
import { useGetManagerDetail } from "@/hooks/auth/useGetManagerDetail";
import { useAuthStore } from "@/providers/AuthProvider";
import React from "react";

const EditManagerProfileContainer = () => {
  const { adminSn } = useAuthStore((state) => state);
  const {
    data: managerInformation,
    isLoading,
    isError,
  } = useGetManagerDetail({ managerSn: adminSn.toString() });
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;
  if (!managerInformation) return <div>No data available</div>;
  return <ManagerEditForm managerData={managerInformation} />;
};

export default EditManagerProfileContainer;
