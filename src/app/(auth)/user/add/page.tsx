import React from "react";
import CenterUserAddContainer from "@/components/User/CenterUserAddContainer";

const UserAddPage = () => {
  return (
    <div className="w-full flex flex-col gap-5">
      <h1 className="text-2xl w-full">센터 사용자 추가</h1>
      <CenterUserAddContainer />
    </div>
  );
};

export default UserAddPage;
