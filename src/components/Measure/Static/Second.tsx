import { IUserDetailStatic } from "@/types/user";
import React from "react";
import ResultGraph from "../ResultGraph";
import Image from "next/image";

const MeasureStaticSecond = ({
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
            defaultAvg={-6.07}
            sdAvg={42.12}
            title="왼쪽 어깨-팔꿈치-손목 각도"
            userAvg={statics.front_elbow_align_angle_left_shoulder_elbow_wrist}
            unitName="각도"
            unit="°"
          />
          <ResultGraph
            defaultAvg={-9.11}
            sdAvg={41.46}
            title="오른쪽 어깨-팔꿈치-손목 각도"
            unitName="각도"
            userAvg={statics.front_elbow_align_angle_right_shoulder_elbow_wrist}
            unit="°"
          />
        </div>
        <div className="col-span-12 flex lg:flex-row flex-col items-start gap-5 text-black dark:text-white">
          <ResultGraph
            defaultAvg={18.87}
            sdAvg={26.73}
            title="왼쪽 팔꿈치 위-팔꿈치-손목 각도"
            unitName="각도"
            userAvg={
              statics.front_elbow_align_angle_left_upper_elbow_elbow_wrist
            }
            unit="°"
          />
          <ResultGraph
            defaultAvg={17.48}
            sdAvg={28.66}
            unitName="각도"
            title="오른쪽 팔꿈치 위-팔꿈치-손목 각도"
            userAvg={
              statics.front_elbow_align_angle_right_upper_elbow_elbow_wrist
            }
            unit="°"
          />
        </div>
        {/* <div className="col-span-12 flex lg:flex-row flex-col items-start gap-5 text-black dark:text-white">
              <ResultGraph
                defaultAvg={-0.12}
                sdAvg={0.36}
                title="중심점과 왼쪽 손목과의 거리"
                unitName="거리"
                userAvg={statics.front_elbow_align_distance_center_wrist_left}
                unit="cm"
              />
              <ResultGraph
                defaultAvg={-0.12}
                sdAvg={0.36}
                title="중심점과 오른쪽 손목과의 거리"
                unitName="거리"
                userAvg={statics.front_elbow_align_distance_center_wrist_right}
                unit="cm"
              />
            </div> */}
        <div className="col-span-12 flex lg:flex-row flex-col items-start gap-5 text-black dark:text-white">
          <ResultGraph
            defaultAvg={2.34}
            sdAvg={1.89}
            title="왼쪽 손목-어깨 거리"
            unitName="거리"
            userAvg={statics.front_elbow_align_distance_left_wrist_shoulder}
            unit="cm"
          />
          <ResultGraph
            defaultAvg={2.3}
            sdAvg={1.74}
            title="오른쪽 손목-어깨 거리"
            unitName="거리"
            userAvg={statics.front_elbow_align_distance_right_wrist_shoulder}
            unit="cm"
          />
        </div>
        <div className="col-span-12 flex lg:flex-row flex-col items-start gap-5 text-black dark:text-white">
          <ResultGraph
            defaultAvg={-0.14}
            sdAvg={0.84}
            title="양 손목 높이 차이"
            unitName="높이차"
            userAvg={statics.front_elbow_align_distance_wrist_height}
            unit="cm"
          />
          <div className="flex-1"></div>
        </div>
      </div>
    </div>
  );
};

export default MeasureStaticSecond;
