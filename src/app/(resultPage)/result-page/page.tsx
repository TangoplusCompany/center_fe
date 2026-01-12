import React from "react";
import CenterUserDetail from "@/components/User/CenterUserDetail";
import { notFound } from "next/navigation";

const ResultPage = async () => {
  // 임시 값
  const userUUID = "17PRWCXV743ZAEKQ";
  const key = "2225";
  const name = "1601";

  // const { userUUID, key, name } = await searchParams;

  if (!key || !userUUID) {
    notFound();
  }

  const userSn = Number(key);

  if (Number.isNaN(userSn)) {
    notFound();
  }

  return (
    <div className="w-full max-w-[1300px] mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-6 lg:py-8">
      <div className="flex flex-col gap-4 md:gap-5">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-1 h-8 md:h-10 lg:h-12 bg-toggleAccent rounded-full"></div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#333] dark:text-white">
            {name ? `${name}님` : "사용자"} 측정 결과
          </h2>
        </div>

        <CenterUserDetail userUUID={userUUID} userSn={userSn} />
      </div>
    </div>
  );
};

export default ResultPage;

