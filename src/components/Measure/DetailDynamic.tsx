"use client";

import DynamicDataContainer from "./Dynamic/DataContainer";
import { useMeasureSequence } from "@/hooks/api/measure/useMeasureSequence";
import { IUserMeasureDynamicFileData } from "@/types/measure";
import { useMeasureDynamicJson } from "@/hooks/api/measure/useMeasureDynamicJson";
import VideoPlayer from "./Compare/components/VideoPlayer";

export type Fit = {
  stageW: number;
  stageH: number;
  scale: number;
  offsetX: number;
  offsetY: number;
  dpr: number;
};
export type PoseLandmark = {
  sx: number;
  sy: number;
};

export type PoseLandmarks = PoseLandmark[];

export function computeContain(stageW: number, stageH: number, dataW: number, dataH: number) {
  const scale = Math.min(stageW / dataW, stageH / dataH);
  const visualW = dataW * scale;
  const visualH = dataH * scale;
  const offsetX = (stageW - visualW) / 2;
  const offsetY = (stageH - visualH) / 2;
  return { stageW, stageH, scale, offsetX, offsetY };
}

export function setupHiDPICanvas(canvas: HTMLCanvasElement, cssW: number, cssH: number) {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.round(cssW * dpr);
  canvas.height = Math.round(cssH * dpr);
  canvas.style.width = `${cssW}px`;
  canvas.style.height = `${cssH}px`;

  const ctx = canvas.getContext("2d");
  if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  return { ctx, dpr };
}


const MeasureDetailDynamic = ({
  className,
  sns,
  cameraOrientation,
  isCompare,
  isResultPage = false,
}: {
  className?: string;
  sns: { measureSn: string; userSn: string };
  cameraOrientation: number;
  isCompare: 0 | 1;
  isResultPage: boolean;
}) => {
  const { data: measureDynamic, isLoading: seq7Loading, isError: seq7Error } =
    useMeasureSequence({ measure_sn: sns.measureSn, user_sn: sns.userSn, sequence_number: 6, isResultPage });

  const data = measureDynamic?.file_data;
  const fileData = measureDynamic?.file_data as IUserMeasureDynamicFileData;

  const { data: measureJson, isLoading, isError } = useMeasureDynamicJson(
    data?.measure_server_json_name
  );

  const isRotated = cameraOrientation === 1;

  return (
    <div className={className}>
      <VideoPlayer
        videoSrc={data?.measure_server_file_name}
        isRotated={isRotated}
        measureJson={measureJson}
        isLoading={seq7Loading || isLoading}
        isError={!!(seq7Error || isError)}
        customCanvasTransform="scaleX(-1.3) scaleY(1.35)"
        videoClassName={isRotated ? "-rotate-90 w-[75%] h-full object-contain" : "w-full h-full"}
        stageClassName="relative mx-auto w-full h-[300px] sm:h-[400px] md:h-[480px] lg:h-[560px] xl:h-[680px] overflow-hidden"
        containerClassName="flex flex-col gap-4 lg:gap-10"
      >
        {!seq7Loading && !isLoading && !seq7Error && !isError && measureJson && (
          <DynamicDataContainer
            fileData={fileData}
            detailData={measureDynamic?.detail_data ?? []}
            isCompare={isCompare}
          />
        )}
      </VideoPlayer>
    </div>
  );
};

export default MeasureDetailDynamic;
