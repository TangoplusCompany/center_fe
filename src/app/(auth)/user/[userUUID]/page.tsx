import React from "react";
import CenterUserDetail from "@/components/User/CenterUserDetail";
import { notFound } from "next/navigation";
import { actionUserDecrypt } from "@/app/actions/getCrypto";

type UserDetailPageProps = {
  params: Promise<{ userUUID: string }>;
  searchParams: Promise<{ key?: string; name?: string }>;
};

const UserDetailPage = async ({ params, searchParams }: UserDetailPageProps) => {
  const { userUUID: encryptedParam } = await params;
  const { key, name } = await searchParams;

  // 암호화된 파라미터 복호화 시도
  const decryptedData = await actionUserDecrypt(encryptedParam);

  // 복호화 성공 시 암호화된 URL 사용
  if (decryptedData) {
    const { user_uuid: userUUID, user_sn: userSn, user_name: userName } = decryptedData;

    return (
      <CenterUserDetail userUUID={userUUID} userSn={userSn} userName={userName} />
    );
  }

  // 복호화 실패 시 기존 URL 형식 지원 (하위 호환성)
  if (key) {
    const userSn = Number(key);
    if (!Number.isNaN(userSn)) {
      return (
        <CenterUserDetail userUUID={encryptedParam} userSn={userSn} userName={name} />
      );
    }
  }

  return notFound();
};

export default UserDetailPage;