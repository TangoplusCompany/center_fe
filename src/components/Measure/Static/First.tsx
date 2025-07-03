import { IUserDetailStatic } from "@/types/user";
import React from "react";
import ResultGraph from "../ResultGraph";
import DummyStaticContainer from "../DummyStaticContainer";
import { useMeasureJson } from "@/hooks/api/measure/useMeasureJson";
import { MeasurementImage } from "../MeasurementImage";

const MeasureStaticFirst = React.memo(
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
          step="first"
        />
        <div className="grid flex-1 grid-cols-12 gap-2 md:gap-5 w-full lg:gap-5 px-2">
          <div className="col-span-12 flex flex-col gap-5 text-black dark:text-white">
            <ResultGraph
              defaultAvg={0.1}
              sdAvg={0.23}
              unitName="높이차"
              title="후면 양쪽 귀 높이차"
              userAvg={statics.back_horizontal_distance_sub_ear}
              unit="cm"
            />
            <ResultGraph
              defaultAvg={86.5}
              sdAvg={21.14}
              unitName="기울기"
              title="후면 양쪽 귀 기울기"
              userAvg={90 - statics.back_horizontal_angle_ear}
              unit="°"
            />
          </div>
          <div className="col-span-12 flex flex-col gap-5 text-black dark:text-white">
            <ResultGraph
              defaultAvg={-0.13}
              sdAvg={0.51}
              unitName="높이차"
              title="후면 양쪽 어깨 높이차"
              userAvg={statics.back_horizontal_distance_sub_shoulder}
              unit="cm"
            />
            <ResultGraph
              defaultAvg={89.27}
              sdAvg={14.88}
              unitName="기울기"
              title="후면 양쪽 어깨 기울기"
              userAvg={90 - statics.back_horizontal_angle_shoulder}
              unit="°"
            />
          </div>
          <div className="col-span-12 flex flex-col gap-5 text-black dark:text-white">
            <ResultGraph
              defaultAvg={-0.14}
              sdAvg={0.83}
              unitName="높이차"
              title="후면 양쪽 팔꿉 높이차"
              userAvg={statics.back_horizontal_distance_sub_elbow}
              unit="cm"
            />
            <ResultGraph
              defaultAvg={89.16}
              sdAvg={15.15}
              unitName="기울기"
              title="후면 양쪽 팔꿉 기울기"
              userAvg={90 - statics.back_horizontal_angle_elbow}
              unit="°"
            />
          </div>

          <div className="col-span-12 flex flex-col gap-5 text-black dark:text-white">
            <ResultGraph
              defaultAvg={0.12}
              sdAvg={0.21}
              unitName="높이차"
              title="후면 양쪽 골반 높이차"
              userAvg={statics.back_horizontal_distance_sub_hip}
              unit="cm"
            />
            <ResultGraph
              defaultAvg={88.07}
              sdAvg={14.86}
              unitName="기울기"
              title="후면 양쪽 골반 기울기"
              userAvg={90 - statics.back_horizontal_angle_hip}
              unit="°"
            />
          </div>

          <div className="col-span-12 flex flex-col gap-5 text-black dark:text-white">
            <ResultGraph
              defaultAvg={-0.01}
              sdAvg={0.57}
              unitName="높이차"
              title="후면 양쪽 발목 높이차"
              userAvg={statics.back_horizontal_distance_sub_ankle}
              unit="cm"
            />
            <ResultGraph
              defaultAvg={88.85}
              sdAvg={15.51}
              unitName="기울기"
              title="후면 양쪽 발목 기울기"
              userAvg={90 - statics.back_horizontal_angle_ankle}
              unit="°"
            />
          </div>
          <div className="col-span-12 flex flex-col gap-5 text-black dark:text-white">
            <ResultGraph
              defaultAvg={5.03}
              sdAvg={1.27}
              unitName="높이차"
              title="후면 왼쪽 무릎 거리"
              userAvg={statics.back_horizontal_distance_knee_left}
              unit="cm"
            />
            <ResultGraph
              defaultAvg={4.79}
              sdAvg={1.24}
              unitName="높이차"
              title="후면 오른쪽 무릎 거리"
              userAvg={statics.back_horizontal_distance_knee_right}
              unit="cm"
            />
          </div>
          <div className="col-span-12 flex flex-col gap-5 text-black dark:text-white">
            <ResultGraph
              defaultAvg={-27.35}
              sdAvg={174.14}
              unitName="각도"
              title="후면 왼쪽 무릎-뒤꿈치 각도"
              userAvg={statics.back_vertical_angle_knee_heel_left - 90}
              unit="°"
            />
            <ResultGraph
              defaultAvg={8.49}
              sdAvg={176.42}
              unitName="각도"
              title="후면 오른쪽 무릎-뒤꿈치 각도"
              userAvg={statics.back_vertical_angle_knee_heel_right - 90}
              unit="°"
            />
          </div>
          <div className="col-span-12 flex flex-col gap-5 text-black dark:text-white">
            <ResultGraph
              defaultAvg={-39.92}
              sdAvg={174.14}
              unitName="각도"
              title="후면 코-어깨-중심점 각도"
              userAvg={statics.back_vertical_angle_nose_center_shoulder - 90}
              unit="°"
            />
            <ResultGraph
              defaultAvg={-20.82}
              sdAvg={175.28}
              unitName="각도"
              title="후면 코-골반-중심점 각도"
              userAvg={statics.back_vertical_angle_nose_center_hip - 90}
              unit="°"
            />
          </div>
          <div className="col-span-12 flex flex-col gap-5 text-black dark:text-white">
            <ResultGraph
              defaultAvg={3.85}
              sdAvg={1.5}
              unitName="거리"
              title="후면 중심점-발뒤꿈치 거리"
              userAvg={statics.back_horizontal_distance_heel_left}
              unit="cm"
            />
            <ResultGraph
              defaultAvg={3.82}
              sdAvg={1.62}
              unitName="거리"
              title="후면 오른쪽 무릎-뒤꿈치 거리"
              userAvg={statics.back_horizontal_distance_heel_right}
              unit="cm"
            />
          </div>
        </div>
      </div>
    );
  },
);

MeasureStaticFirst.displayName = "MeasureStaticFirst";

export default MeasureStaticFirst;
