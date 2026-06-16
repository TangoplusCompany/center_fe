import { IUserMeasureFileData } from "@/types/measure";
import React from "react";
import { useMeasureJson } from "@/hooks/api/measure/useMeasureJson";
import DummyStaticContainer from "../DummyStaticContainer";
import { MeasurementImage } from "../MeasurementImage";

const MeasureStaticSixth = React.memo(
  ({
    className,
    files,
    cameraOrientation,
    onImageReady
  }: {
    className?: string;
    files?: IUserMeasureFileData;
    cameraOrientation: 0 | 1;
    onImageReady?: (step: string, url: string) => void;
  }) => {
    const {
      data: measureJson,
      isLoading,
      isError,
    } = useMeasureJson(files?.measure_server_json_name);

    if (!measureJson) return <DummyStaticContainer />;
    if (isLoading) return <DummyStaticContainer />;
    if (isError) return <div>에러가 발생했습니다.</div>;

    return (
      <div className={`${className ?? ""} flex flex-col gap-4 lg:gap-10`}>
        <MeasurementImage
          imageUrl={`${process.env.NEXT_PUBLIC_FILE_URL ?? ""}/${files?.measure_server_file_name}`}
          measureJson={measureJson}
          step="sixth"
          cameraOrientation={cameraOrientation}
          onImageReady={onImageReady}
        />
      </div>
    );
  },
);

MeasureStaticSixth.displayName = "MeasureStaticSixth";

export default MeasureStaticSixth;
