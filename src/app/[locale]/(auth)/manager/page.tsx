import React from "react";
import ManagerContainer from "@/components/Manager/ManagerContainer";
import { ManagerPageHeader } from "@/components/Manager/ManagerPageHeader";

const CenterManagerPage = () => {
  return (
    <div className="flex flex-col gap-5">
      <ManagerPageHeader />
      <ManagerContainer />
    </div>
  );
};

export default CenterManagerPage;
