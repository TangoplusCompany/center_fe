import React from "react";
import CenterUserDetail from "@/components/User/CenterUserDetail";

type UserDetailPageProps = {
  params: Promise<{ userUUID: string }>;
  searchParams: Promise<{ key?: string; name?: string }>;
};

const UserDetailPage = async ({ params, searchParams }: UserDetailPageProps) => {
  // ✅ Next가 넘겨주는 Promise를 먼저 await
  const { userUUID } = await params;
  const { name } = await searchParams;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <div className="w-1 h-12 bg-toggleAccent rounded-full"></div>
        <h2 className="text-3xl font-semibold text-[#333] dark:text-white">
          {name ? `${name}님` : "사용자"} 측정 결과
        </h2>
      </div>

      <CenterUserDetail userUUID={userUUID} />
    </div>
  );
};

export default UserDetailPage;