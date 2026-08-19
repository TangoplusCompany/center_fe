import MeasureDetailQueryContainer from "@/components/Measure/DetailQueryContainer";
import React from "react";

const MeasureROMPage = () => { 
  return (
    <div className="flex flex-col gap-5 w-full">
      <MeasureDetailQueryContainer firstMeasureType={"rom"} />
    </div>
  );
};

export default MeasureROMPage;