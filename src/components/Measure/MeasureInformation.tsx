import { IFilterMeasureInfo } from "@/types/user";
import React from "react";

const MeasureInformation = ({ data }: { data: IFilterMeasureInfo }) => {
  return (
    <div className="flex-1">
      <h1 className="text-4xl font-semibold text-[#333]">
        {data.information.user_name}님의 측정 내역
      </h1>
      {Object.entries(data["information"]).map(([key, value]) => {
        return (
          <div key={key} className="flex gap-2">
            <p>{key}</p>
            <p>:</p>
            <p>{value}</p>
          </div>
        );
      })}
      {Object.entries(data["risk"]).map(([key, value]) => {
        return (
          <div key={key} className="flex gap-2">
            <p>{key}</p>
            <p>:</p>
            <p>{value}</p>
          </div>
        );
      })}
    </div>
  );
};

export default MeasureInformation;
