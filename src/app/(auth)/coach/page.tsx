import React from "react";
import CoachPage from "./_components/CoachPage";

const CoachHome = () => {
  return (
    <div className="grid grid-cols-12 gap-5">
      <h1 className="text-2xl col-span-12">센터 코치 관리</h1>
      <CoachPage />
    </div>
  );
};

export default CoachHome;
