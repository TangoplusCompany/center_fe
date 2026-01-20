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
      <div className="flex flex-col gap-5 ">
        <div className="flex items-center gap-3">
          <div className="w-1 h-12 bg-toggleAccent rounded-full"></div>
          <h2 className="text-3xl font-semibold text-[#333] dark:text-white">
            {userName ? `${userName}님` : "사용자"} 측정 결과
          </h2>
        </div>

        <CenterUserDetail userUUID={userUUID} userSn={userSn} />
      </div>
    );
  }

  // 복호화 실패 시 기존 URL 형식 지원 (하위 호환성)
  if (key) {
    const userSn = Number(key);
    if (!Number.isNaN(userSn)) {
      return (
        <div className="flex flex-col gap-5 ">
          <div className="flex items-center gap-3">
            <div className="w-1 h-12 bg-toggleAccent rounded-full"></div>
            <h2 className="text-3xl font-semibold text-[#333] dark:text-white">
              {name ? `${name}님` : "사용자"} 측정 결과
            </h2>
          </div>

          <CenterUserDetail userUUID={encryptedParam} userSn={userSn} />
        </div>
      );
    }
  }

  return notFound();
};

export default UserDetailPage;