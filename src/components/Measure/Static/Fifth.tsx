import { IUserMeasureFileData } from "@/types/measure";
import React from "react";
import DummyStaticContainer from "../DummyStaticContainer";
import { useMeasureJson } from "@/hooks/api/measure/useMeasureJson";
import { MeasurementImage } from "../MeasurementImage";

const MeasureStaticFifth = React.memo(
  ({
    className,
    files,
    cameraOrientation,
    onImageReady
  }: {
    className?: string;
    files?: IUserMeasureFileData;
    cameraOrientation: 0 | 1;
    onImageReady?: (idx: 0 | 1, url: string) => void;
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
          step="fifth"
          cameraOrientation={cameraOrientation}
          onImageReady={onImageReady}
          leftRight={0}
        />
      </div>
    );
  },
);

MeasureStaticFifth.displayName = "MeasureStaticFifth";

export default MeasureStaticFifth;
