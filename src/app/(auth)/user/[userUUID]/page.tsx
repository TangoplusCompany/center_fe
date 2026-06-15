import React from "react";
import UserDetail from "@/components/User/Detail";
import { notFound } from "next/navigation";
import { actionUserDecrypt } from "@/app/actions/getCrypto";

interface UserDetailPageProps {
  params: Promise<{ userUUID: string }>;
  searchParams: Promise<{ key?: string; name?: string; subTab?: string }>;
}

const UserDetailPage = async ({ params, searchParams }: UserDetailPageProps) => {
  const { userUUID: encryptedParam } = await params;
  const { key, subTab } = await searchParams; // subTab 추출

  // 암호화된 파라미터 복호화 시도
  const decryptedData = await actionUserDecrypt(encryptedParam);
  const currentTab = subTab || "latest";
  // 복호화 성공 시 암호화된 URL 사용
  if (decryptedData) {
    const { user_uuid: userUUID, user_sn: userSn } = decryptedData;

    return (
      <UserDetail userUUID={userUUID} userSn={userSn} currentTab={currentTab} />
    );
  }

  // 복호화 실패 시 기존 URL 형식 지원 (하위 호환성)
  if (key) {
    const userSn = Number(key);
    if (!Number.isNaN(userSn)) {
      return (
        <UserDetail userUUID={encryptedParam} userSn={userSn} currentTab={currentTab} />
      );
    }
  }

  return notFound();
};

export default UserDetailPage;