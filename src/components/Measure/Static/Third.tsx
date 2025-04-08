import { IUserDetailStatic } from "@/types/user";
import React from "react";
import ResultGraph from "../ResultGraph";
import Image from "next/image";

const MeasureStaticThird = ({
  className,
  statics,
}: {
  className?: string;
  statics: IUserDetailStatic;
}) => {
  return (
    <div className={`${className} flex flex-col gap-4`}>
      <div className="relative w-full h-[400px] overflow-hidden lg:h-[600px]">
        <Image
          src={
            `https://gym.tangoplus.co.kr/data/Results/` +
            statics.measure_server_file_name
          }
          alt="측정 사진"
          width={1500}
          height={422}
          className="lg:w-full lg:relative absolute top-0 left-0 w-[750px] h-[400px] object-cover lg:h-full"
        />
      </div>
      <div className="grid flex-1 grid-cols-12 gap-2 md:gap-5 w-full lg:gap-10">
        <div className="col-span-12 flex lg:flex-row flex-col items-start gap-5 text-black dark:text-white">
          <ResultGraph
            defaultAvg={32.55}
            sdAvg={163.01}
            unitName="각도"
            title="왼쪽 어깨-팔꿈치 각도"
            userAvg={statics.side_left_vertical_angle_shoulder_elbow}
            unit="°"
          />
          <ResultGraph
            defaultAvg={129.93}
            sdAvg={71.34}
            unitName="각도"
            title="왼쪽 팔꿈치-손목 각도"
            userAvg={statics.side_left_vertical_angle_elbow_wrist}
            unit="°"
          />
        </div>
        <div className="col-span-12 flex lg:flex-row flex-col items-start gap-5 text-black dark:text-white">
          <ResultGraph
            defaultAvg={-77.54}
            sdAvg={158.71}
            unitName="각도"
            title="왼쪽 골반-무릎 각도"
            userAvg={statics.side_left_vertical_angle_hip_knee - 180}
            unit="°"
          />
          <ResultGraph
            defaultAvg={84.91}
            sdAvg={138.33}
            unitName="각도"
            title="왼쪽 귀-어깨 각도"
            userAvg={statics.side_left_vertical_angle_ear_shoulder}
            unit="°"
          />
        </div>
        <div className="col-span-12 flex lg:flex-row flex-col items-start gap-5 text-black dark:text-white">
          <ResultGraph
            defaultAvg={78.81}
            sdAvg={111.75}
            unitName="각도"
            title="왼쪽 코-어깨 각도"
            userAvg={statics.side_left_vertical_angle_nose_shoulder}
            unit="°"
          />
          <ResultGraph
            defaultAvg={1.93}
            sdAvg={1.29}
            unitName="거리"
            title="중심점과 어깨와의 거리"
            userAvg={statics.side_left_horizontal_distance_shoulder}
            unit="cm"
          />
        </div>
        <div className="col-span-12 flex lg:flex-row flex-col items-start gap-5 text-black dark:text-white">
          <ResultGraph
            defaultAvg={2.16}
            sdAvg={1.28}
            unitName="거리"
            title="중심점과 골반과의 거리"
            userAvg={statics.side_left_horizontal_distance_hip}
            unit="cm"
          />
          <div className="flex-1"></div>
        </div>
      </div>
    </div>
  );
};

export default MeasureStaticThird;
