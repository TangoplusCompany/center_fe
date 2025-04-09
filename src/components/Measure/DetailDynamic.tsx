import { IUserDetailDynamic } from "@/types/user";
import React from "react";
import ResultGraph from "./ResultGraph";

const MeasureDetailDynamic = ({
  dynamic,
  className,
}: {
  dynamic: IUserDetailDynamic;
  className?: string;
}) => {
  return (
    <div className={`${className} flex flex-col gap-4 lg:gap-10`}>
      <div className="relative w-full overflow-hidden">
        <div className="overflow-hidden w-full relative h-auto md:h-auto">
          <div className="relative -left-[50%] w-[200vw] h-full overflow-hidden md:relative md:w-auto md:h-auto md:left-0">
            <video
              muted
              playsInline
              controls={true}
              webkit-playsinline="true"
              // style={{ transform: "scaleX(-1)" }}
            >
              <source
                src={`https://gym.tangoplus.co.kr/data/Results/${dynamic.measure_server_file_name}`}
                type="video/mp4"
              />
            </video>
          </div>
        </div>
      </div>
      <div className="grid flex-1 grid-cols-12 gap-2 md:gap-5 w-full lg:gap-10 p-5 lg:p-0">
        <div className="col-span-12 flex lg:flex-row flex-col items-start gap-5 text-black dark:text-white">
          <ResultGraph
            defaultAvg={0.01}
            sdAvg={0.51}
            title="오버헤드스쿼트 양쪽 어깨 높이차"
            userAvg={dynamic.ohs_front_horizontal_distance_shoulder}
            unit="cm"
            unitName="높이차"
          />
          <ResultGraph
            defaultAvg={89.9 * 2}
            sdAvg={1.93 * 2}
            unitName="기울기"
            title="오버헤드스쿼트 양쪽 어깨 기울기"
            userAvg={Math.abs(dynamic.ohs_front_horizontal_angle_shoulder)}
            unit="°"
          />
        </div>
        <div className="col-span-12 flex lg:flex-row flex-col items-start gap-5 text-black dark:text-white">
          <ResultGraph
            defaultAvg={-0.23}
            sdAvg={1.16}
            title="오버헤드스쿼트 양쪽 팔꿉 높이차"
            userAvg={dynamic.ohs_front_horizontal_distance_elbow}
            unitName="높이차"
            unit="cm"
          />
          <ResultGraph
            defaultAvg={90.39 * 2}
            sdAvg={2.44 * 2}
            unitName="기울기"
            title="오버헤드스쿼트 양쪽 팔꿉 기울기"
            userAvg={Math.abs(dynamic.ohs_front_horizontal_angle_elbow)}
            unit="°"
          />
        </div>
        <div className="col-span-12 flex lg:flex-row flex-col items-start gap-5 text-black dark:text-white">
          <ResultGraph
            defaultAvg={0.5}
            sdAvg={1.52}
            title="오버헤드스쿼트 양쪽 손목 높이차"
            unitName="높이차"
            userAvg={dynamic.ohs_front_horizontal_distance_wrist}
            unit="cm"
          />
          <ResultGraph
            defaultAvg={89.89 * 2}
            sdAvg={2.98 * 2}
            unitName="기울기"
            title="오버헤드스쿼트 양쪽 손목 기울기"
            userAvg={Math.abs(dynamic.ohs_front_horizontal_angle_wrist)}
            unit="°"
          />
        </div>
        <div className="col-span-12 flex lg:flex-row flex-col items-start gap-5 text-black dark:text-white">
          <ResultGraph
            defaultAvg={-0.18}
            sdAvg={0.28}
            unitName="높이차"
            title="오버헤드스쿼트 양쪽 골반 높이차"
            userAvg={dynamic.ohs_front_horizontal_distance_hip}
            unit="cm"
          />
          <ResultGraph
            defaultAvg={90.99 * 2}
            sdAvg={1.56 * 2}
            unitName="기울기"
            title="오버헤드스쿼트 양쪽 골반 기울기"
            userAvg={Math.abs(dynamic.ohs_front_horizontal_angle_hip)}
            unit="°"
          />
        </div>
        <div className="col-span-12 flex lg:flex-row flex-col items-start gap-5 text-black dark:text-white">
          <ResultGraph
            defaultAvg={-0.22}
            sdAvg={0.54}
            unitName="높이차"
            title="오버헤드스쿼트 양쪽 무릎 높이차"
            userAvg={dynamic.ohs_front_horizontal_distance_knee}
            unit="cm"
          />
          <ResultGraph
            defaultAvg={91.02 * 2}
            sdAvg={2.57 * 2}
            unitName="기울기"
            title="오버헤드스쿼트 양쪽 무릎 기울기"
            userAvg={Math.abs(dynamic.ohs_front_horizontal_angle_knee)}
            unit="°"
          />
        </div>
      </div>
    </div>
  );
};

export default MeasureDetailDynamic;
