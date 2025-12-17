import React from "react";
import MeasureMainContainer from "@/components/Measure/MeasureMainContainer";

const MeasurePage = () => {
  return (
    <div className="flex flex-col justify-center w-full gap-5">
      {/* <div className="flex items-center gap-3">
        <div className="w-1 h-12 bg-toggleAccent rounded-full"></div>
        <h2 className="text-3xl font-semibold text-[#333] dark:text-white">
          검색 결과 {}
        </h2>
      </div> */}
      <MeasureMainContainer />
    </div>
  );
};

export default MeasurePage;
