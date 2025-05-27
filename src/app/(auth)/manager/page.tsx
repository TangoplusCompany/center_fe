import React from "react";
import ManagerContainer from "./_components/ManagerContainer";

const CenterManagerPage = () => {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl">매니저 관리</h1>
      <ManagerContainer />
    </div>
  );
};

export default CenterManagerPage;
