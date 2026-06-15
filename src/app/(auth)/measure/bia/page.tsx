import MeasureDetailQueryContainer from "@/components/Measure/DetailQueryContainer";
import React from "react";

const MeasureBiaPage = () => { 
  return (
    <div className="flex flex-col gap-5 w-full">
      <MeasureDetailQueryContainer firstMeasureType={"bia"} />
    </div>
  );
};

export default MeasureBiaPage;