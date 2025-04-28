"use client";

import CenterManagerList from "@/components/Center/CenterManagerList";
import CustomPagination from "@/components/Custom/Pagination";
import { useGetManagerList } from "@/hooks/auth/useGetManagerList";
import { useSearchParams } from "next/navigation";

import React from "react";

const ManagerContainer = () => {
  const params = useSearchParams();
  const page = parseInt(params.get("page") || "1");
  const limit = parseInt(params.get("limit") || "20");
  const { data: managerList, isLoading, isError } = useGetManagerList({page, limit});
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;
  if (!managerList) return <div>No data available</div>;
  return (
    <>
      <CenterManagerList managerList={managerList} />
      <CustomPagination total={1} last_page={1} limit={20} page={1} />
    </>
  );
};

export default ManagerContainer;
