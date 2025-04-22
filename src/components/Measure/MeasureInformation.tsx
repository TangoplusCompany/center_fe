import { IUserDetailMeasureInfo } from "@/types/user";
import { parseString } from "@/utils/parseString";
import React from "react";

const MeasureInformation = ({ data }: { data: IUserDetailMeasureInfo }) => {
  return (
    <div className="flex-1">
      <h1 className="text-4xl font-semibold text-[#333]">
        {data.user_name}님의 측정 내역
      </h1>
      <div className="flex flex-col gap-2">
        <p>측정점수 : {data.t_score}점</p>
        <div>
          {parseString(data.risk_result_ment).map((el, key) => {
            return el === "" ? <br key={key} /> : <p key={key}>{el}</p>;
          })}
        </div>
      </div>
    </div>
  );
};

export default MeasureInformation;
