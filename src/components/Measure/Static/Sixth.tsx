import { IUserDetailStatic } from "@/types/user";
import React from "react";
import ResultGraph from "../ResultGraph";
import Image from "next/image";

const MeasureStaticSixth = ({
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
            defaultAvg={0.04}
            sdAvg={0.29}
            unitName="높이차"
            title="후면-앉은자세 양쪽 귀 높이차"
            userAvg={statics.back_sit_horizontal_distance_sub_ear}
            unit="cm"
          />
          <ResultGraph
            defaultAvg={89.72 * 2}
            sdAvg={2.83 * 2}
            unitName="기울기"
            title="후면-앉은자세 양쪽 귀 기울기"
            userAvg={statics.back_sit_horizontal_angle_ear + 180}
            unit="°"
          />
        </div>
        <div className="col-span-12 flex lg:flex-row flex-col items-start gap-5 text-black dark:text-white">
          <ResultGraph
            defaultAvg={-0.02}
            sdAvg={0.63}
            unitName="높이차"
            title="후면-앉은자세 양쪽 어깨 높이차"
            userAvg={statics.back_sit_horizontal_distance_sub_shoulder}
            unit="cm"
          />
          <ResultGraph
            defaultAvg={90.13 * 2}
            sdAvg={2 * 2}
            unitName="기울기"
            title="후면-앉은자세 양쪽 어깨 기울기"
            userAvg={statics.back_sit_horizontal_angle_shoulder + 180}
            unit="°"
          />
        </div>
        <div className="col-span-12 flex lg:flex-row flex-col items-start gap-5 text-black dark:text-white">
          <ResultGraph
            defaultAvg={0.11}
            sdAvg={0.42}
            unitName="높이차"
            title="후면-앉은자세 양쪽 골반 높이차"
            userAvg={statics.back_sit_horizontal_distance_sub_hip}
            unit="cm"
          />
          <ResultGraph
            defaultAvg={89.42 * 2}
            sdAvg={2.52 * 2}
            unitName="기울기"
            title="후면-앉은자세 양쪽 골반 기울기"
            userAvg={statics.back_sit_horizontal_angle_hip + 180}
            unit="°"
          />
        </div>
        <div className="col-span-12 flex lg:flex-row flex-col items-start gap-5 text-black dark:text-white">
          <ResultGraph
            defaultAvg={90 - 65.63}
            sdAvg={3.94}
            unitName="각도"
            title="후면-앉은자세 골반중앙-오른어깨-왼어깨 각도"
            userAvg={
              statics.back_sit_vertical_angle_center_hip_right_shoulder_left_shoulder
            }
            unit="°"
          />
          <ResultGraph
            defaultAvg={90 - 49.09}
            sdAvg={5.27}
            unitName="각도"
            title="후면-앉은자세 왼어깨-골반중앙-오른어깨 각도"
            userAvg={
              statics.back_sit_vertical_angle_left_shoulder_center_hip_right_shoulder
            }
            unit="°"
          />
        </div>
        <div className="col-span-12 flex lg:flex-row flex-col items-start gap-5 text-black dark:text-white">
          <ResultGraph
            defaultAvg={90 - 43.64}
            sdAvg={4.48}
            unitName="각도"
            title="후면-앉은자세 왼어깨-오른어깨-코 각도"
            userAvg={
              statics.back_sit_vertical_angle_left_shoulder_right_shoulder_nose
            }
            unit="°"
          />
          <ResultGraph
            defaultAvg={90 - 65.28}
            sdAvg={2.52}
            unitName="각도"
            title="후면-앉은자세 오른어깨-왼어깨-골반중앙 각도"
            userAvg={
              statics.back_sit_vertical_angle_right_shoulder_left_shoulder_center_hip
            }
            unit="°"
          />
        </div>
      </div>
    </div>
  );
};

export default MeasureStaticSixth;
