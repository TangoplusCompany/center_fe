import { IUserDetailStatic } from "@/types/user";
import React from "react";
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
      </div>
    );
  },
);

MeasureStaticThird.displayName = "MeasureStaticThird";

export default MeasureStaticThird;
