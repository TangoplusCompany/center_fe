import { IUserDetailStatic } from "@/types/user";
import React from "react";
import ResultGraph from "../ResultGraph";
import { useMeasureJson } from "@/hooks/measure/useMeasureJson";
import DummyStaticContainer from "../DummyStaticContainer";
import { MeasurementImage } from "../MeasurementImage";

const MeasureStaticSixth = React.memo(
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
          step="sixth"
        />
        <div className="grid flex-1 grid-cols-12 gap-2 md:gap-5 w-full lg:gap-5 px-2">
          <div className="col-span-12 flex flex-col gap-5 text-black dark:text-white">
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
          <div className="col-span-12 flex flex-col gap-5 text-black dark:text-white">
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
          <div className="col-span-12 flex flex-col gap-5 text-black dark:text-white">
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
          <div className="col-span-12 flex flex-col gap-5 text-black dark:text-white">
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
          <div className="col-span-12 flex flex-col gap-5 text-black dark:text-white">
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
  },
);

MeasureStaticSixth.displayName = "MeasureStaticSixth";

export default MeasureStaticSixth;
