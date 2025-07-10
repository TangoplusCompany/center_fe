import React from "react";
import CenterUserDetail from "@/components/User/CenterUserDetail";

const UserDetailPage = async ({
  params,
}: {
  params: Promise<{ userUUID: string }>;
}) => {
  const userUUID = (await params).userUUID;
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl w-full">센터 사용자 상세 조회</h1>
      <CenterUserDetail userUUID={userUUID} />
    </div>
  );
};

export default UserDetailPage;
