import MeasureDetailQueryContainer from "@/components/Measure/DetailQueryContainer";
import React from "react";

const MeasureGaitPage = () => { 
  return (
    <div className="flex flex-col gap-5 w-full">
      <MeasureDetailQueryContainer firstMeasureType={"gait"} />
    </div>
  );
};

export default MeasureGaitPage;