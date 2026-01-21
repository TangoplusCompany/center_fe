import React from "react";
import CenterUserDetail from "@/components/User/CenterUserDetail";
import { notFound } from "next/navigation";

type ResultPageProps = {
  searchParams: Promise<{ userUUID?: string; key?: string; name?: string }>;
};

const ResultPage = async ({ searchParams }: ResultPageProps) => {
  const params = await searchParams;
  
  // 임시 값 (기본값으로 사용)
  const userUUID = params.userUUID || "17PRWCXV743ZAEKQ";
  const key = params.key || "2225";
  const name = params.name || "1601";

  if (!key) {
    notFound();
  }

  const userSn = Number(key);

  if (Number.isNaN(userSn)) {
    notFound();
  }

  return (
    <div className="w-full max-w-[1300px] mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-6 lg:py-8">
      <CenterUserDetail userUUID={userUUID} userSn={userSn} userName={name} />
    </div>
  );
};

export default ResultPage;

