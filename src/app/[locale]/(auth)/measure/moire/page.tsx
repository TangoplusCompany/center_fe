import MeasureDetailQueryContainer from "@/components/Measure/DetailQueryContainer";
import React from "react";

const MeasureMoirePage = () => { 
  return (
    <div className="flex flex-col gap-5 w-full">
      <MeasureDetailQueryContainer firstMeasureType={"moire"} />
    </div>
  );
};

export default MeasureMoirePage;