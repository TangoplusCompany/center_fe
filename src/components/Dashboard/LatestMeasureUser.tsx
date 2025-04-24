"use client";

import { useGetLatestMeasureUser } from "@/hooks/user/useGetLatestMeasureUser";
import { IUserData } from "@/types/user";
import React from "react";
import { MainUserList } from "./MainUserList";

const LatestMeasureUser = () => {
  const { data: latestMeasureUser, isLoading } =
    useGetLatestMeasureUser<IUserData[]>();
  if (isLoading) {
    return <div className="col-span-1">Loading...</div>;
  }
  if (!latestMeasureUser || latestMeasureUser.length === 0) {
    return <div className="col-span-1">No data available</div>;
  }
  // 이름, 전화번호, 이메일, 상세보기(측정조회쪽)
  return <MainUserList users={latestMeasureUser} path="measure" />;
};

export default LatestMeasureUser;
