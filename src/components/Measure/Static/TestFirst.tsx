import { useMeasureJson } from "@/hooks/measure/useMeasureJson";
import { useDrawCanvas, useWindowResize } from "@/hooks/utils";
import { IUserDetailStatic } from "@/types/user";
import React, { useEffect, useRef, useState } from "react";
import DummyStaticContainer from "../DummyStaticContainer";

import Image from "next/image";

const TestFirstMeasurement = React.memo(
  ({
    className,
    statics,
  }: {
    className?: string;
    statics: IUserDetailStatic;
  }) => {
    const defaultWidth = statics.measure_overlay_width as number;
    const defaultHeight = statics.measure_overlay_height as number;
    const [nowWidth, setNowWidth] = useState(defaultWidth);
    const [nowHeight, setNowHeight] = useState(defaultHeight);
    const [scaleWidth, setScaleWidth] = useState(1);
    const [scaleHeight, setScaleHeight] = useState(1);
    const imgRef = useRef<HTMLImageElement | null>(null);
    const canvasWhiteRef = useRef<HTMLCanvasElement | null>(null);
    const canvasRedRef = useRef<HTMLCanvasElement | null>(null);
    const canvasGreenRef = useRef<HTMLCanvasElement | null>(null);
    const clearAndDraw = useDrawCanvas;
    const windowWidth = useWindowResize();
    const {
      data: measureJson,
      isLoading,
      isError,
    } = useMeasureJson(statics.measure_server_json_name);

    useEffect(() => {
      if (imgRef.current === null) return;
      const imgTag = imgRef.current;
      const updateCanvasScale = () => {
        const imgWidth = imgTag.clientWidth;
        const imgHeight = imgTag.clientHeight;
        const widthScale = Number((imgWidth / defaultWidth).toFixed(4));
        const heightScale = Number((imgHeight / defaultHeight).toFixed(4));
        setNowWidth(imgWidth);
        setNowHeight(imgHeight);
        setScaleWidth(widthScale);
        setScaleHeight(heightScale);
      };
      updateCanvasScale();
    }, [measureJson, windowWidth]);

    useEffect(() => {
      if (!measureJson || imgRef.current === null) return;
      const canvasWhite = canvasWhiteRef.current as HTMLCanvasElement;
      const canvasRed = canvasRedRef.current as HTMLCanvasElement;
      const canvasGreen = canvasGreenRef.current as HTMLCanvasElement;
      const contextWhite = canvasWhite.getContext(
        "2d",
      ) as CanvasRenderingContext2D;
      const contextRed = canvasRed.getContext("2d") as CanvasRenderingContext2D;
      const contextGreen = canvasGreen.getContext(
        "2d",
      ) as CanvasRenderingContext2D;
      const adjustX = (sx: number) => sx * scaleWidth;
      const adjustY = (sy: number) => sy * scaleHeight;
      const drawCanvas = () => {
        clearAndDraw(contextWhite, canvasWhite, "#FFF", () => {
          contextWhite.beginPath();
          contextWhite.moveTo(
            adjustX(measureJson.pose_landmark[7].sx),
            adjustY(measureJson.pose_landmark[7].sy),
          );
          contextWhite.lineTo(
            adjustX(measureJson.pose_landmark[8].sx),
            adjustY(measureJson.pose_landmark[8].sy),
          );
          contextWhite.stroke();

          contextWhite.beginPath();
          contextWhite.moveTo(
            adjustX(measureJson.pose_landmark[11].sx),
            adjustY(measureJson.pose_landmark[11].sy),
          );
          contextWhite.lineTo(
            adjustX(measureJson.pose_landmark[23].sx),
            adjustY(measureJson.pose_landmark[23].sy),
          );
          contextWhite.lineTo(
            adjustX(measureJson.pose_landmark[24].sx),
            adjustY(measureJson.pose_landmark[24].sy),
          );
          contextWhite.lineTo(
            adjustX(measureJson.pose_landmark[12].sx),
            adjustY(measureJson.pose_landmark[12].sy),
          );
          contextWhite.stroke();

          contextWhite.beginPath();
          contextWhite.moveTo(
            adjustX(measureJson.pose_landmark[11].sx),
            adjustY(measureJson.pose_landmark[11].sy),
          );
          contextWhite.lineTo(
            adjustX(measureJson.pose_landmark[13].sx),
            adjustY(measureJson.pose_landmark[13].sy),
          );
          contextWhite.lineTo(
            adjustX(measureJson.pose_landmark[15].sx),
            adjustY(measureJson.pose_landmark[15].sy),
          );
          contextWhite.stroke();

          contextWhite.beginPath();
          contextWhite.moveTo(
            adjustX(measureJson.pose_landmark[12].sx),
            adjustY(measureJson.pose_landmark[12].sy),
          );
          contextWhite.lineTo(
            adjustX(measureJson.pose_landmark[14].sx),
            adjustY(measureJson.pose_landmark[14].sy),
          );
          contextWhite.lineTo(
            adjustX(measureJson.pose_landmark[16].sx),
            adjustY(measureJson.pose_landmark[16].sy),
          );
          contextWhite.stroke();

          contextWhite.beginPath();
          contextWhite.moveTo(
            adjustX(measureJson.pose_landmark[23].sx),
            adjustY(measureJson.pose_landmark[23].sy),
          );
          contextWhite.lineTo(
            adjustX(measureJson.pose_landmark[25].sx),
            adjustY(measureJson.pose_landmark[25].sy),
          );
          contextWhite.lineTo(
            adjustX(measureJson.pose_landmark[27].sx),
            adjustY(measureJson.pose_landmark[27].sy),
          );
          contextWhite.stroke();

          contextWhite.beginPath();
          contextWhite.moveTo(
            adjustX(measureJson.pose_landmark[24].sx),
            adjustY(measureJson.pose_landmark[24].sy),
          );
          contextWhite.lineTo(
            adjustX(measureJson.pose_landmark[26].sx),
            adjustY(measureJson.pose_landmark[26].sy),
          );
          contextWhite.lineTo(
            adjustX(measureJson.pose_landmark[28].sx),
            adjustY(measureJson.pose_landmark[28].sy),
          );
          contextWhite.stroke();
        });

        clearAndDraw(contextGreen, canvasGreen, "#00FF00", () => {
          contextGreen.beginPath();
          contextGreen.moveTo(
            adjustX(measureJson.pose_landmark[11].sx),
            adjustY(measureJson.pose_landmark[11].sy),
          );
          contextGreen.lineTo(
            adjustX(measureJson.pose_landmark[12].sx),
            adjustY(measureJson.pose_landmark[12].sy),
          );
          contextGreen.stroke();

          contextGreen.beginPath();
          contextGreen.moveTo(
            adjustX(measureJson.pose_landmark[23].sx),
            adjustY(measureJson.pose_landmark[23].sy),
          );
          contextGreen.lineTo(
            adjustX(measureJson.pose_landmark[24].sx),
            adjustY(measureJson.pose_landmark[24].sy),
          );
          contextGreen.stroke();
        });

        clearAndDraw(contextRed, canvasRed, "#FF0000", () => {
          contextRed.beginPath();
          contextRed.moveTo(
            Math.round(
              (adjustX(measureJson.pose_landmark[11].sx) +
                adjustX(measureJson.pose_landmark[12].sx)) /
                2,
            ),
            adjustY(measureJson.pose_landmark[27].sy) + nowHeight / 10,
          );
          contextRed.lineTo(
            Math.round(
              (adjustX(measureJson.pose_landmark[23].sx) +
                adjustX(measureJson.pose_landmark[24].sx)) /
                2,
            ),
            adjustY(measureJson.pose_landmark[7].sy) - nowHeight / 10,
          );
          contextRed.stroke();
        });
      };

      drawCanvas();
    }, [measureJson, scaleWidth, scaleHeight, nowHeight]);

    if (!measureJson) return <DummyStaticContainer />;
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>에러가 발생했습니다.</div>;

    return (
      <div className={`${className} flex flex-col items-center justify-center gap-4 lg:gap-10 w-full`}>
        <div className="w-full h-screen max-h-[720px] overflow-hidden relative">
          <Image
            ref={imgRef}
            src={
              `https://gym.tangoplus.co.kr/data/Results/` +
              statics.measure_server_file_name
            }
            alt="측정 사진"
            width={defaultWidth}
            height={defaultHeight}
            // className="object-cover z-0 w-[150%] h-full absolute left-[-25%] top-0 max-w-[150%]"
            className="object-cover z-0 h-full absolute -left-[75%] xl:-left-[55%] top-0 max-w-[2000px]"
          />
          <canvas
            ref={canvasWhiteRef}
            width={defaultWidth}
            height={defaultHeight}
            className="absolute top-0 z-[9] -scale-x-[1] -ml-[75%] xl:-ml-[55%]"
          />
          <canvas
            ref={canvasGreenRef}
            width={defaultWidth}
            height={defaultHeight}
            className="absolute top-0 z-[9] -scale-x-[1] -ml-[75%] xl:-ml-[55%]"
          />
          <canvas
            ref={canvasRedRef}
            width={defaultWidth}
            height={defaultHeight}
            className="absolute top-0 z-[9] -scale-x-[1] -ml-[75%] xl:-ml-[55%]"
          />
        </div>
      </div>
    );
  },
);

export default TestFirstMeasurement;
