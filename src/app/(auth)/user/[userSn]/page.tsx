import React from "react";
import CenterUserDetail from "../_components/CenterUserDetail";

const UserDetailPage = () => {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl w-full">센터 사용자 상세 조회</h1>
      <CenterUserDetail />
    </div>
  );
};

export default UserDetailPage;