import { IUserDetailStatic } from "@/types/user";
import React from "react";
import ResultGraph from "../ResultGraph";
import { useMeasureJson } from "@/hooks/api/measure/useMeasureJson";
import DummyStaticContainer from "../DummyStaticContainer";
import { MeasurementImage } from "../MeasurementImage";

const MeasureStaticThird = React.memo(
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
          step="third"
        />
        <div className="grid flex-1 grid-cols-12 gap-2 md:gap-5 w-full lg:gap-5 px-2">
          <div className="col-span-12 flex flex-col gap-5 text-black dark:text-white">
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
          <div className="col-span-12 flex flex-col gap-5 text-black dark:text-white">
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
          <div className="col-span-12 flex flex-col gap-5 text-black dark:text-white">
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
          <div className="col-span-12 flex flex-col gap-5 text-black dark:text-white">
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
  },
);

MeasureStaticThird.displayName = "MeasureStaticThird";

export default MeasureStaticThird;
