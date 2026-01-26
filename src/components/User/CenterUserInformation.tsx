"use client";

import { useGetUserDetail } from "@/hooks/api/user/useGetUserDetail";
import { useAuthStoreOptional } from "@/providers/AuthProvider";
import React from "react";
import UserDetailForm from "./UserDetailForm";
import DataError from "../Util/DataError";

interface CenterUserInformationProps {
  userSn: number;
  isResultPage: boolean;
}

const CenterUserInformation = ({ userSn, isResultPage }: CenterUserInformationProps) => {
  const {
    data: userDetailData,
    isLoading: userDetailDataLoading,
    isError: userDetailError,
  } = useGetUserDetail({ userSn: userSn.toString(), isResultPage });

  // result-page에서는 AuthStoreProvider가 없으므로 optional하게 사용
  const adminRole = useAuthStoreOptional((state) => state.adminRole, 0);

  if (userDetailDataLoading) {
    return (
      <div className="w-full px-2 sm:px-4 md:px-0">
        <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400">
          사용자 정보 불러오는중...
        </p>
      </div>
    );
  }
  if (userDetailError) return <DataError></DataError>;
  if (!userDetailData) return <></>;

  return (
    <div className="w-full px-2 sm:px-4 md:px-0">
      <UserDetailForm userData={userDetailData} isResultPage={isResultPage} adminRole={adminRole} />
    </div>
  );
};

export default CenterUserInformation;
