"use client";

import { useGetLatestAddUser } from "@/hooks/api/user/useGetLatestAddUser";
import { IUserData } from "@/types/user";
import React from "react";
import { MainUserList } from "./MainUserList";
import { Skeleton } from "../ui/skeleton";

const LatestAddUser = () => {
  const { data: latestAddUser, isLoading } = useGetLatestAddUser<IUserData[]>();
  if (isLoading) {
    return <Skeleton className="w-full h-[400px]" />;
  }
  if (!latestAddUser || latestAddUser?.length === 0) {
    return <div className="col-span-1">No data available</div>;
  }
  // 이름, 전화번호, 이메일, 상세보기(사용자조회쪽)
  return <MainUserList users={latestAddUser} path="user" />;
};

export default LatestAddUser;
