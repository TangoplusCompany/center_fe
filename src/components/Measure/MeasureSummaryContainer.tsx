"use client";

import { UpperAndLowerMeasureHistory } from "@/types/measure";
import React from "react";
import MeasureSummaryGraph from "./MeasureSummaryGraph";
import MeasureSummaryUnit from "./MeasureSummaryUnit";

export interface MeasureSummaryProps {
  ment: string;
  risk_level: string;
  range_level: string;
  summaryData: UpperAndLowerMeasureHistory[];
  handleLegendClick: (measureSn: number) => void;
  dCase: 0 | 1;
  title: string;
}


const MeasureSummaryContainer = ({ 
  ment,
  risk_level,
  range_level,
  summaryData,
  handleLegendClick,
  dCase,
  title,
}: MeasureSummaryProps 
) => {
  return (
    <div className="rounded-3xl border-2 border-sub200 p-3 sm:p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 transition-all duration-300 ease-in-out">
        <div className="transition-all duration-300 ease-in-out">
          <MeasureSummaryUnit 
            ment={ment} 
            risk_level={risk_level} 
            range_level={range_level}
            title={title}
          />
        </div>
        <div className="transition-all duration-300 ease-in-out">
          <MeasureSummaryGraph data={summaryData} legendClick={handleLegendClick} dCase={dCase}/>      
        </div>
      </div>
    </div>
  );
};

export default MeasureSummaryContainer;
