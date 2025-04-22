import React from "react";
import MeasureDetailContainer from "../_components/MeasureDetailContainer";

const MeasureDetailPage = () => {
  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-2xl col-span-12">측정 상세 조회</h1>
      <MeasureDetailContainer />
    </div>
  );
};

export default MeasureDetailPage;
