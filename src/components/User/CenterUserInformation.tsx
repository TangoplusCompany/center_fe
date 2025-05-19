"use client";

import { useGetUserDetail } from "@/hooks/user";
import { useGetQuery } from "@/hooks/utils/useGetQuery";
import React from "react";
import UserDetailForm from "./UserDetailForm";
import DataError from "../Util/DataError";

const CenterUserInformation = () => {
  const { query } = useGetQuery();
  const { key } = query as { key: string };
  const {
    data: userDetailData,
    isLoading: userDetailDataLoading,
    isError: userDetailError,
  } = useGetUserDetail({ userSn: key });

  if (userDetailDataLoading) return <p>사용자 정보 불러오는중...</p>;
  if (userDetailError) return <DataError></DataError>;
  if (!userDetailData) return <></>;

  return (
    <>
      <UserDetailForm userData={userDetailData} />
    </>
  );
};

export default CenterUserInformation;
