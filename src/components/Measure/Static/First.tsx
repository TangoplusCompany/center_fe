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
              defaultAvg={-0.1}
              sdAvg={0.23}
              title="정면 양쪽 귀 높이차"
              userAvg={statics.front_horizontal_distance_sub_ear}
              unit="cm"
            />
            <ResultGraph
              defaultAvg={90.11 * 2}
              sdAvg={2.51 * 2}
              title="정면 양쪽 귀 기울기"
              userAvg={Math.abs(statics.front_horizontal_angle_ear)}
              unit="°"
            />
          </div>
          <div className="col-span-12 flex flex-col gap-5 text-black dark:text-white">
            <ResultGraph
              defaultAvg={-0.1}
              sdAvg={0.45}
              title="정면 양쪽 어깨 높이차"
              userAvg={statics.front_horizontal_distance_sub_shoulder}
              unit="cm"
            />
            <ResultGraph
              defaultAvg={90.35 * 2}
              sdAvg={1.55 * 2}
              title="정면 양쪽 어깨 기울기"
              userAvg={Math.abs(statics.front_horizontal_angle_shoulder)}
              unit="°"
            />
          </div>
          <div className="col-span-12 flex flex-col gap-5 text-black dark:text-white">
            <ResultGraph
              defaultAvg={-0.17}
              sdAvg={0.58}
              title="정면 양쪽 팔꿉 높이차"
              userAvg={statics.front_horizontal_distance_sub_elbow}
              unit="cm"
            />
            <ResultGraph
              defaultAvg={90.47 * 2}
              sdAvg={1.58 * 2}
              title="정면 양쪽 팔꿉 기울기"
              userAvg={statics.front_horizontal_angle_elbow}
              unit="°"
            />
          </div>

          <div className="col-span-12 flex flex-col gap-5 text-black dark:text-white">
            <ResultGraph
              defaultAvg={-0.25}
              sdAvg={0.67}
              title="정면 양쪽 손목 높이차"
              userAvg={statics.front_horizontal_distance_sub_wrist}
              unit="cm"
            />
            <ResultGraph
              defaultAvg={88.07}
              sdAvg={14.86}
              title="정면 양쪽 손목 기울기"
              userAvg={Math.abs(statics.front_horizontal_angle_wrist)}
              unit="°"
            />
          </div>

          <div className="col-span-12 flex flex-col gap-5 text-black dark:text-white">
            <ResultGraph
              defaultAvg={0}
              sdAvg={0.22}
              title="정면 양쪽 골반 높이차"
              userAvg={statics.front_horizontal_distance_sub_hip}
              unit="cm"
            />
            <ResultGraph
              defaultAvg={89.98 * 2}
              sdAvg={1.36 * 2}
              title="정면 양쪽 골반 기울기"
              userAvg={Math.abs(statics.front_horizontal_angle_hip)}
              unit="°"
            />
          </div>
          <div className="col-span-12 flex flex-col gap-5 text-black dark:text-white">
            <ResultGraph
              defaultAvg={-0.12}
              sdAvg={0.36}
              title="정면 양쪽 무릎 높이차"
              userAvg={statics.front_horizontal_distance_sub_knee}
              unit="cm"
            />
            <ResultGraph
              defaultAvg={90.81 * 2}
              sdAvg={2.22 * 2}
              title="정면 양쪽 무릎 기울기"
              userAvg={Math.abs(statics.front_horizontal_angle_knee)}
              unit="°"
            />
          </div>
          <div className="col-span-12 flex flex-col gap-5 text-black dark:text-white">
            <ResultGraph
              defaultAvg={0.01}
              sdAvg={0.46}
              title="정면 양쪽 발목 높이차"
              userAvg={statics.front_horizontal_distance_sub_ankle}
              unit="cm"
            />
            <ResultGraph
              defaultAvg={89.94 * 2}
              sdAvg={3.89 * 2}
              title="정면 양쪽 발목 기울기"
              userAvg={Math.abs(statics.front_horizontal_angle_ankle)}
              unit="°"
            />
          </div>
{/*           <div className="col-span-12 flex flex-col gap-5 text-black dark:text-white">
            <ResultGraph
              defaultAvg={89.94 * 2}
              sdAvg={3.89 * 2}
              title="정면 양쪽 발목 기울기"
              userAvg={Math.abs(statics.front_horizontal_angle_ankle)}
              unit="°"
            />
            <ResultGraph
              defaultAvg={-20.82}
              sdAvg={175.28}
              title="정면 코-골반-중심점 각도"
              userAvg={statics.back_vertical_angle_nose_center_hip - 90}
              unit="°"
            />
          </div>
          <div className="col-span-12 flex flex-col gap-5 text-black dark:text-white">
            <ResultGraph
              defaultAvg={3.85}
              sdAvg={1.5}
              title="정면 중심점-발뒤꿈치 거리"
              userAvg={statics.back_horizontal_distance_heel_left}
              unit="cm"
            />
            <ResultGraph
              defaultAvg={3.82}
              sdAvg={1.62}
              title="정면 오른쪽 무릎-뒤꿈치 거리"
              userAvg={statics.back_horizontal_distance_heel_right}
              unit="cm"
            />
          </div> */}
        </div>
      </div>
    );
  },
);

MeasureStaticFirst.displayName = "MeasureStaticFirst";

export default MeasureStaticFirst;
