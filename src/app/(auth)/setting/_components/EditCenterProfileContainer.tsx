"use client";

import CenterEditForm from "@/components/Center/CenterEditForm";
import { useGetCenterInformation } from "@/hooks/center/useGetCenterInformation";
import React from "react";

const EditCenterProfileContainer = () => {
  const {
    data: centerInformation,
    isLoading,
    isError,
  } = useGetCenterInformation();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;
  if (!centerInformation) return <div>No data available</div>;
  return <CenterEditForm centerData={centerInformation} />;
};

export default EditCenterProfileContainer;
