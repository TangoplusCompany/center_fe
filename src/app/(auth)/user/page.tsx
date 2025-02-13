import React from "react";
import { CenterUserList } from "./_components/CenterUserList";

const UserHome = () => {
  return (
    <div className="grid grid-cols-12 gap-5">
      <h1 className="text-2xl col-span-12">센터 사용자 관리</h1>
      <CenterUserList className="col-span-12" />
    </div>
  );
};

export default UserHome;
