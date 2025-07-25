import { IUserDetailStatic } from "@/types/user";
import React from "react";
import ResultGraph from "../ResultGraph";
import { useMeasureJson } from "@/hooks/api/measure/useMeasureJson";
import DummyStaticContainer from "../DummyStaticContainer";
import { MeasurementImage } from "../MeasurementImage";

const MeasureStaticFourth = React.memo(
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
          step="fourth"
        />
        <div className="grid flex-1 grid-cols-12 gap-2 md:gap-5 w-full lg:gap-5 px-2">
          <div className="col-span-12 flex flex-col gap-5 text-black dark:text-white">
            <ResultGraph
              defaultAvg={15.26}
              sdAvg={163.25}
              unitName="각도"
              title="오른쪽 어깨-팔꿈치 각도"
              userAvg={statics.side_right_vertical_angle_shoulder_elbow}
              unit="°"
            />
            <ResultGraph
              defaultAvg={136.37}
              sdAvg={57.53}
              unitName="각도"
              title="오른쪽 팔꿈치-손목 각도"
              userAvg={statics.side_right_vertical_angle_elbow_wrist}
              unit="°"
            />
          </div>
          <div className="col-span-12 flex flex-col gap-5 text-black dark:text-white">
            <ResultGraph
              defaultAvg={-22.63}
              sdAvg={175.7}
              unitName="각도"
              title="오른쪽 골반-무릎 각도"
              userAvg={-statics.side_right_vertical_angle_hip_knee}
              unit="°"
            />
            <ResultGraph
              defaultAvg={85.36}
              sdAvg={139.1}
              unitName="각도"
              title="오른쪽 귀-어깨 각도"
              userAvg={statics.side_right_vertical_angle_ear_shoulder}
              unit="°"
            />
          </div>
          <div className="col-span-12 flex flex-col gap-5 text-black dark:text-white">
            <ResultGraph
              defaultAvg={74.88}
              sdAvg={114.72}
              unitName="각도"
              title="오른쪽 코-어깨 각도"
              userAvg={statics.side_right_vertical_angle_nose_shoulder}
              unit="°"
            />
            <ResultGraph
              defaultAvg={1.65}
              sdAvg={1.23}
              unitName="거리"
              title="중심점과 어깨와의 거리"
              userAvg={statics.side_right_horizontal_distance_shoulder}
              unit="cm"
            />
          </div>
          <div className="col-span-12 flex flex-col gap-5 text-black dark:text-white">
            <ResultGraph
              defaultAvg={1.63}
              sdAvg={1.2}
              unitName="거리"
              title="중심점과 골반과의 거리"
              userAvg={statics.side_right_horizontal_distance_hip}
              unit="cm"
            />
            <div className="flex-1"></div>
            {/* <ResultGraph
              defaultAvg={5.01}
              sdAvg={3.43}
              unitName="거리"
                title="중심점과 새끼손가락과의 거리"
                userAvg={statics.side_right_horizontal_distance_pinky}
                unit="cm"
              /> */}
          </div>
        </div>
      </div>
    );
  },
);

MeasureStaticFourth.displayName = "MeasureStaticFourth";

export default MeasureStaticFourth;
