import { IUserDetailStatic } from "@/types/user";
import React, { useEffect, useMemo, useRef, useState } from "react";
import ResultGraph from "../ResultGraph";
import Image from "next/image";
import { useMeasureJson } from "@/hooks/measure/useMeasureJson";
import DummyStaticContainer from "../DummyStaticContainer";
import { useDrawCanvas, useWindowResize } from "@/hooks/utils";

const MeasureStaticFourth = React.memo(
  ({ className, statics }: { className?: string; statics: IUserDetailStatic }) => {
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
    const {data: measureJson, isLoading, isError} = useMeasureJson(statics.measure_server_json_name);
    const clearAndDraw = useDrawCanvas;
    const windowWidth = useWindowResize();

    useEffect(() => {
      if (imgRef.current === null) return;
      const imgTag = imgRef.current;
      const updateCanvasScale = () => {
        const imgWidth = imgTag.width;
        const imgHeight = imgTag.height;

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

      const contextWhite = canvasWhite.getContext("2d") as CanvasRenderingContext2D;
      const contextRed = canvasRed.getContext("2d") as CanvasRenderingContext2D;
      const contextGreen = canvasGreen.getContext("2d") as CanvasRenderingContext2D;

      const drawCanvas = () => {
        clearAndDraw(contextWhite, canvasWhite, "#FFF", () => {
          contextWhite.beginPath();
          contextWhite.moveTo(
            measureJson.pose_landmark[12].sx * scaleWidth,
            measureJson.pose_landmark[12].sy * scaleHeight,
          );
          contextWhite.lineTo(
            measureJson.pose_landmark[14].sx * scaleWidth,
            measureJson.pose_landmark[14].sy * scaleHeight,
          );
          contextWhite.lineTo(
            measureJson.pose_landmark[16].sx * scaleWidth,
            measureJson.pose_landmark[16].sy * scaleHeight,
          );
          contextWhite.stroke();

          contextWhite.beginPath();
          contextWhite.moveTo(
            measureJson.pose_landmark[12].sx * scaleWidth,
            measureJson.pose_landmark[11].sy * scaleHeight,
          );
          contextWhite.lineTo(
            measureJson.pose_landmark[24].sx * scaleWidth,
            measureJson.pose_landmark[24].sy * scaleHeight,
          );
          contextWhite.lineTo(
            measureJson.pose_landmark[26].sx * scaleWidth,
            measureJson.pose_landmark[26].sy * scaleHeight,
          );
          contextWhite.lineTo(
            measureJson.pose_landmark[28].sx * scaleWidth,
            measureJson.pose_landmark[28].sy * scaleHeight,
          );
          contextWhite.stroke();

          contextWhite.beginPath();
          contextWhite.moveTo(
            measureJson.pose_landmark[28].sx * scaleWidth,
            measureJson.pose_landmark[28].sy * scaleHeight,
          );
          contextWhite.lineTo(
            measureJson.pose_landmark[30].sx * scaleWidth,
            measureJson.pose_landmark[30].sy * scaleHeight,
          );
          contextWhite.moveTo(
            measureJson.pose_landmark[28].sx * scaleWidth,
            measureJson.pose_landmark[28].sy * scaleHeight,
          );
          contextWhite.lineTo(
            measureJson.pose_landmark[32].sx * scaleWidth,
            measureJson.pose_landmark[32].sy * scaleHeight,
          );
          contextWhite.stroke();
        });

        clearAndDraw(contextGreen, canvasGreen, "#00FF00", () => {
          contextGreen.beginPath();
          contextGreen.moveTo(
            measureJson.pose_landmark[0].sx * scaleWidth,
            measureJson.pose_landmark[0].sy * scaleHeight,
          );
          contextGreen.lineTo(
            measureJson.pose_landmark[12].sx * scaleWidth,
            measureJson.pose_landmark[12].sy * scaleHeight,
          );
          contextGreen.stroke();

          contextGreen.beginPath();
          contextGreen.moveTo(
            measureJson.pose_landmark[16].sx * scaleWidth,
            measureJson.pose_landmark[16].sy * scaleHeight,
          );
          contextGreen.lineTo(
            measureJson.pose_landmark[28].sx * scaleWidth,
            measureJson.pose_landmark[16].sy * scaleHeight,
          );
          contextGreen.stroke();

          contextGreen.beginPath();
          contextGreen.moveTo(
            measureJson.pose_landmark[24].sx * scaleWidth,
            measureJson.pose_landmark[24].sy * scaleHeight,
          );
          contextGreen.lineTo(
            measureJson.pose_landmark[28].sx * scaleWidth,
            measureJson.pose_landmark[24].sy * scaleHeight,
          );
          contextGreen.stroke();

          contextGreen.beginPath();
          contextGreen.moveTo(
            measureJson.pose_landmark[26].sx * scaleWidth,
            measureJson.pose_landmark[26].sy * scaleHeight,
          );
          contextGreen.lineTo(
            measureJson.pose_landmark[28].sx * scaleWidth,
            measureJson.pose_landmark[26].sy * scaleHeight,
          );
          contextGreen.stroke();
        });

        clearAndDraw(contextRed, canvasRed, "#FF0000", () => {
          contextRed.beginPath();
          contextRed.moveTo(
            measureJson.pose_landmark[12].sx * scaleWidth,
            measureJson.pose_landmark[0].sy * scaleHeight - 100,
          );
          contextRed.lineTo(
            measureJson.pose_landmark[28].sx * scaleWidth,
            measureJson.pose_landmark[28].sy * scaleHeight + 100,
          );
          contextRed.stroke();

          contextRed.beginPath();
          contextRed.moveTo(
            measureJson.pose_landmark[12].sx * scaleWidth - 100,
            measureJson.pose_landmark[12].sy * scaleHeight,
          );
          contextRed.lineTo(
            measureJson.pose_landmark[12].sx * scaleWidth + 100,
            measureJson.pose_landmark[12].sy * scaleHeight,
          );
          contextRed.stroke();

          contextRed.beginPath();
          contextRed.moveTo(
            measureJson.pose_landmark[0].sx * scaleWidth - 100,
            measureJson.pose_landmark[0].sy * scaleHeight,
          );
          contextRed.lineTo(
            measureJson.pose_landmark[0].sx * scaleWidth + 100,
            measureJson.pose_landmark[0].sy * scaleHeight,
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
      <div className={`${className} flex flex-col gap-4 lg:gap-10`}>
        <div className="relative w-full overflow-hidden">
          
          <Image
            ref={imgRef}
            src={`https://gym.tangoplus.co.kr/data/Results/` + statics.measure_server_file_name}
            alt="측정 사진"
            width={1500}
            height={844}
            className="lg:w-full lg:relative absolute top-0 left-0 w-[750px] h-[400px] object-cover lg:h-full"
          />
          <canvas
            ref={canvasWhiteRef}
            width={nowWidth}
            height={nowHeight}
            className="absolute bottom-0 left-0 right-0 top-0 z-9 -scale-x-[1]"
          />
          <canvas
            ref={canvasGreenRef}
            width={nowWidth}
            height={nowHeight}
            className="absolute bottom-0 left-0 right-0 top-0 z-9 -scale-x-[1]"
          />
          <canvas
            ref={canvasRedRef}
            width={nowWidth}
            height={nowHeight}
            className="absolute bottom-0 left-0 right-0 top-0 z-9 -scale-x-[1]"
          />
        </div>
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

export default MeasureStaticFourth;
