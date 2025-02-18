import React from "react";
import UserPage from "./_components/UserPage";
import TestComponent from "./_components/TestComponent";

const UserHome = () => {
  return (
    <div className="grid grid-cols-12 gap-5">
      <h1 className="text-2xl col-span-12">센터 사용자 관리</h1>
      <UserPage />
      <TestComponent />
    </div>
  );
};

export default UserHome;
