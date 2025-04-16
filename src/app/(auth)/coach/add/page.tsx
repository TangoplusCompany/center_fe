import React from "react";
import CoachAddContainer from "../_components/CoachAddContainer";

const CoachAddPage = () => {
  return (
    <div className="w-full flex flex-col gap-5">
      <h1 className="text-2xl w-full">센터 코치 추가</h1>
      <CoachAddContainer />
    </div>
  );
};

export default CoachAddPage;
