import { IUserDetailStatic } from "@/types/user";
import React from "react";
import ResultGraph from "../ResultGraph";
import { useMeasureJson } from "@/hooks/measure/useMeasureJson";
import DummyStaticContainer from "../DummyStaticContainer";
import { MeasurementImage } from "../MeasurementImage";

const MeasureStaticSecond = React.memo(
  ({
    className,
    statics,
  }: {
    className?: string;
    statics: IUserDetailStatic;
  }) => {
    const {
      data: measureJson,
      isLoading,
      isError,
    } = useMeasureJson(statics.measure_server_json_name);

    if (!measureJson) return <DummyStaticContainer />;
    if (isLoading) return <DummyStaticContainer />;
    if (isError) return <div>에러가 발생했습니다.</div>;

    return (
      <div className={`${className ?? ""} flex flex-col gap-4 lg:gap-10`}>
        <MeasurementImage
          imageUrl={
            `https://gym.tangoplus.co.kr/data/Results/` +
            statics.measure_server_file_name
          }
          measureJson={measureJson}
          step="second"
        />
        <div className="grid flex-1 grid-cols-12 gap-2 md:gap-5 w-full lg:gap-5 px-2">
          <div className="col-span-12 flex flex-col gap-5 text-black dark:text-white">
            <ResultGraph
              defaultAvg={-6.07}
              sdAvg={42.12}
              title="왼쪽 어깨-팔꿈치-손목 각도"
              userAvg={
                statics.front_elbow_align_angle_left_shoulder_elbow_wrist
              }
              unitName="각도"
              unit="°"
            />
            <ResultGraph
              defaultAvg={-9.11}
              sdAvg={41.46}
              title="오른쪽 어깨-팔꿈치-손목 각도"
              unitName="각도"
              userAvg={
                statics.front_elbow_align_angle_right_shoulder_elbow_wrist
              }
              unit="°"
            />
          </div>
          <div className="col-span-12 flex flex-col gap-5 text-black dark:text-white">
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
          {/* <div className="col-span-12 flex flex-col gap-5 text-black dark:text-white">
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
          <div className="col-span-12 flex flex-col gap-5 text-black dark:text-white">
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
          <div className="col-span-12 flex flex-col gap-5 text-black dark:text-white">
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
  },
);

MeasureStaticSecond.displayName = "MeasureStaticSecond";

export default MeasureStaticSecond;
