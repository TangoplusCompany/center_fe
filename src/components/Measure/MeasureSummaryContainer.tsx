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
}


const MeasureSummaryContainer = ({ 
  ment,
  risk_level,
  range_level,
  summaryData,
  handleLegendClick,
  dCase
 }: MeasureSummaryProps 
) => {
  return (
    <div className="rounded-3xl border-2 border-sub200 p-4">
      <div className="grid grid-cols-2 gap-4">
        <MeasureSummaryUnit 
          ment={ment} 
          risk_level={risk_level} 
          range_level={range_level}
        />
        <MeasureSummaryGraph data={summaryData} legendClick={handleLegendClick} dCase={dCase}/>      
      </div>
    </div>
  );
};

export default MeasureSummaryContainer;
