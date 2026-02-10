import React from "react";
import { CenterMainContainer } from "@/components/Center/CenterMainContainer";

const CenterPage = () => {
  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex gap-2 items-center">
        <div className="w-1 h-12 bg-toggleAccent rounded-full"></div>
        <h2 className="text-3xl font-semibold text-sub700">
          센터 목록
        </h2>
      </div>
      <CenterMainContainer />
    </div>
  );
};

export default CenterPage;
