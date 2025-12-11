import { IUserDetailStatic } from "@/types/user";
import React from "react";
import MeasureStaticFirst from "./First";
import MeasureStaticSecond from "./Second";
import RawDataResult, { IStaticRawDataProps } from "./RawDataResult";

const FrontMeasurement = ({
  statics_1,
  statics_2,
}: {
  statics_1: IUserDetailStatic;
  statics_2: IUserDetailStatic;
}) => {
  const dummyCardDatas : IStaticRawDataProps[] = [
    {
        title: "거북목 검사",
        comment: "설명은 충분합니다.",
        level: 2,
        value0: 179.99,
        value0Subtitle: "왼쪽",
        value1: 1.99,
        value1SubTitle: "오른쪽"
      },
      {
        title: "어깨 팔꿈치 손목 각도",
        comment: "설명은 충분합니다.",
        level: 1,
        value0: 91.99,
        value0Subtitle: "좌우 쏠림",
        value1: null,
        value1SubTitle: null
      },
      {
        title: "골반 무릎 각도",
        comment: "설명은 충분합니다.설명은 충분합니다.설명은 충분합니다.설명은 충분합니다.",
        level: 0,
        value0: 66.66,
        value0Subtitle: "왼쪽",
        value1: 72.72,
        value1SubTitle: "오른쪽"
      }
  ];

  return (
    <div className="flex flex-col gap-5">
      {/* 상단: 이미지 2개 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1">
          <MeasureStaticFirst statics={statics_1} />
        </div>
        <div className="col-span-1">
          <MeasureStaticSecond statics={statics_2} />
        </div>
      </div>

      {/* 하단: RawDataCard 3개 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {dummyCardDatas.map((data, idx) => (
          <RawDataResult key={idx} data={data} />
        ))}
      </div>
    </div>
  );
};

export default FrontMeasurement;
