import React from "react";
import CenterUserDetail from "@/components/User/CenterUserDetail";
import { notFound } from "next/navigation";

type UserDetailPageProps = {
  params: Promise<{ userUUID: string }>;
  searchParams: Promise<{ key?: string; name?: string }>;
};

const UserDetailPage = async ({ params, searchParams }: UserDetailPageProps) => {
  const { userUUID } = await params;
  const { key, name } = await searchParams;

  if (!key) {
    notFound(); // 또는 redirect(...)
  }

  const userSn = Number(key);

  if (Number.isNaN(userSn)) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-5 ">
      <div className="flex items-center gap-3">
        <div className="w-1 h-12 bg-toggleAccent rounded-full"></div>
        <h2 className="text-3xl font-semibold text-[#333] dark:text-white">
          {name ? `${name}님` : "사용자"} 측정 결과
        </h2>
      </div>

      <CenterUserDetail userUUID={userUUID} userSn={userSn} />
    </div>
  );
};

export default UserDetailPage;