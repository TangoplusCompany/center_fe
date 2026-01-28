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
  selectedMeasureSn?: number;
}


const MeasureSummaryContainer = ({ 
  ment,
  risk_level,
  range_level,
  summaryData,
  handleLegendClick,
  dCase,
  title,
  selectedMeasureSn,
}: MeasureSummaryProps 
) => {
  const latestMeasureDate =
    summaryData && summaryData.length > 0
      ? summaryData.reduce<string | undefined>((latest, cur) => {
          if (!latest) return cur.measure_date;
          return new Date(cur.measure_date).getTime() > new Date(latest).getTime()
            ? cur.measure_date
            : latest;
        }, undefined)
      : undefined;

  const selectedMeasureDate = selectedMeasureSn
    ? summaryData.find((x) => x.measure_sn === selectedMeasureSn)?.measure_date
    : undefined;

  const displayMeasureDate = selectedMeasureDate ?? latestMeasureDate;

  return (
    <div className="rounded-3xl border-2 border-sub200 p-3 sm:p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 transition-all duration-300 ease-in-out">
        <div className="transition-all duration-300 ease-in-out">
          <MeasureSummaryUnit 
            ment={ment} 
            risk_level={risk_level} 
            range_level={range_level}
            title={title}
            measureDate={displayMeasureDate}
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
