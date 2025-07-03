"use client";

import { useGetLatestMeasureUser } from "@/hooks/api/user/useGetLatestMeasureUser";
import React from "react";
import { MainUserList } from "./MainUserList";
import { IMeasureList } from "@/types/measure";

const LatestMeasureUser = () => {
  const { data: latestMeasureUser, isLoading } =
    useGetLatestMeasureUser<IMeasureList[]>();
  if (isLoading) {
    return <div className="col-span-1">Loading...</div>;
  }
  if (!latestMeasureUser || latestMeasureUser.length === 0) {
    return <div className="col-span-1">No data available</div>;
  }
  return <MainUserList users={latestMeasureUser} path="measure" />;
};

export default LatestMeasureUser;
