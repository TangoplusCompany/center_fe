import React from "react";
import UserAddContainer from "../_components/UserAddContainer";

const UserAddPage = () => {
  return (
    <div className="w-full flex flex-col gap-5">
      <h1 className="text-2xl w-full">센터 사용자 추가</h1>
      <UserAddContainer />
    </div>
  );
};

export default UserAddPage;
