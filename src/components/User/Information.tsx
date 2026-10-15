"use client";

import { useGetUserDetail } from "@/hooks/api/user/useGetUserDetail";
import { useAuthStoreOptional } from "@/providers/AuthProvider";
import React from "react";
import UserDetailForm from "./DetailForm";
import DataError from "../Util/DataError";
import { useTranslations } from "next-intl";

interface CenterUserInformationProps {
  userSn: number;
  isMyPage: boolean;
}

const CenterUserInformation = ({ userSn, isMyPage }: CenterUserInformationProps) => {
  const t = useTranslations("Index");
  const {
    data: userDetailData,
    isLoading: userDetailDataLoading,
    isError: userDetailError,
  } = useGetUserDetail({ userSn: userSn.toString(), isMyPage });

  // result-page에서는 AuthStoreProvider가 없으므로 optional하게 사용
  const adminRole = useAuthStoreOptional((state) => state.adminRole, 0);

  if (userDetailDataLoading) {
    return (
      <div className="w-full px-2 sm:px-4 md:px-0">
        <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400">
          {t("user_info_loading")}
        </p>
      </div>
    );
  }
  if (userDetailError) return <DataError></DataError>;
  if (!userDetailData) return <></>;

  return (
    <div className="w-full px-2 sm:px-4 md:px-0">
      <UserDetailForm userData={userDetailData} isMyPage={isMyPage} adminRole={adminRole} />
    </div>
  );
};

export default CenterUserInformation;
