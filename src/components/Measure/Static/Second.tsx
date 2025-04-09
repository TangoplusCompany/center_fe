import { IUserDetailStatic } from "@/types/user";
import React, { useEffect, useRef, useState } from "react";
import ResultGraph from "../ResultGraph";
import Image from "next/image";
import { useMeasureJson } from "@/hooks/user";

const MeasureStaticSecond = ({
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
  const [lineWidth, setLineWidth] = useState(1);
  const [scaleWidth, setScaleWidth] = useState(1);
  const [scaleHeight, setScaleHeight] = useState(1);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const canvasWhiteRef = useRef<HTMLCanvasElement | null>(null);
  const canvasRedRef = useRef<HTMLCanvasElement | null>(null);
  const canvasGreenRef = useRef<HTMLCanvasElement | null>(null);
  const { data, isLoading, isError } = useMeasureJson(
    statics.measure_server_json_name,
  );

  useEffect(() => {
    if (imgRef.current === null) return;
    const updateCanvasScale = () => {
      const imgWidth = imgRef.current!.width;
      const imgHeight = imgRef.current!.height;

      const widthScale = Number((imgWidth / defaultWidth).toFixed(4));
      const heightScale = Number((imgHeight / defaultHeight).toFixed(4));

      setLineWidth(imgWidth > 720 ? 2 : 1.5);
      setNowWidth(imgWidth);
      setNowHeight(imgHeight);
      setScaleWidth(widthScale);
      setScaleHeight(heightScale);
    };

    const drawCanvas = () => {
      const canvasWhite = canvasWhiteRef.current!;
      const canvasRed = canvasRedRef.current!;
      const canvasGreen = canvasGreenRef.current!;

      const contextWhite = canvasWhite.getContext("2d")!;
      const contextRed = canvasRed.getContext("2d")!;
      const contextGreen = canvasGreen.getContext("2d")!;

      const clearAndDraw = (
        context: CanvasRenderingContext2D,
        color: string,
        drawFn: () => void,
      ) => {
        context.clearRect(0, 0, canvasWhite.width, canvasWhite.height);
        context.strokeStyle = color;
        context.lineWidth = lineWidth;
        drawFn();
      };

      clearAndDraw(contextWhite, "#FFF", () => {
        contextWhite.beginPath();
        contextWhite.moveTo(
          data.pose_landmark[7].sx * scaleWidth,
          data.pose_landmark[7].sy * scaleHeight,
        );
        contextWhite.lineTo(
          data.pose_landmark[8].sx * scaleWidth,
          data.pose_landmark[8].sy * scaleHeight,
        );
        contextWhite.stroke();

        contextWhite.beginPath();
        contextWhite.moveTo(
          data.pose_landmark[11].sx * scaleWidth,
          data.pose_landmark[11].sy * scaleHeight,
        );
        contextWhite.lineTo(
          data.pose_landmark[12].sx * scaleWidth,
          data.pose_landmark[12].sy * scaleHeight,
        );
        contextWhite.stroke();

        contextWhite.beginPath();
        contextWhite.moveTo(
          data.pose_landmark[11].sx * scaleWidth,
          data.pose_landmark[11].sy * scaleHeight,
        );
        contextWhite.lineTo(
          data.pose_landmark[13].sx * scaleWidth,
          data.pose_landmark[13].sy * scaleHeight,
        );
        contextWhite.lineTo(
          data.pose_landmark[15].sx * scaleWidth,
          data.pose_landmark[15].sy * scaleHeight,
        );
        contextWhite.stroke();

        contextWhite.beginPath();
        contextWhite.moveTo(
          data.pose_landmark[12].sx * scaleWidth,
          data.pose_landmark[12].sy * scaleHeight,
        );
        contextWhite.lineTo(
          data.pose_landmark[14].sx * scaleWidth,
          data.pose_landmark[14].sy * scaleHeight,
        );
        contextWhite.lineTo(
          data.pose_landmark[16].sx * scaleWidth,
          data.pose_landmark[16].sy * scaleHeight,
        );
        contextWhite.stroke();
      });

      clearAndDraw(contextGreen, "#00FF00", () => {});

      clearAndDraw(contextRed, "#FF0000", () => {});
    };
    updateCanvasScale();
    drawCanvas();
  }, [imgRef.current, data]);

  if (!data) return <div>데이터가 없습니다.</div>;
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>에러가 발생했습니다.</div>;
  return (
    <div className={`${className} flex flex-col gap-4 lg:gap-10`}>
      <div className="relative w-full overflow-hidden">
        <Image
          ref={imgRef}
          src={
            `https://gym.tangoplus.co.kr/data/Results/` +
            statics.measure_server_file_name
          }
          alt="측정 사진"
          width={1500}
          height={844}
          className="lg:w-full lg:relative absolute top-0 left-0 w-[750px] h-[400px] object-cover lg:h-full -scale-x-[1]"
        />
        <canvas
          ref={canvasWhiteRef}
          width={nowWidth}
          height={nowHeight}
          className="absolute bottom-0 left-0 right-0 top-0 z-9"
        />
        <canvas
          ref={canvasGreenRef}
          width={nowWidth}
          height={nowHeight}
          className="absolute bottom-0 left-0 right-0 top-0 z-9"
        />
        <canvas
          ref={canvasRedRef}
          width={nowWidth}
          height={nowHeight}
          className="absolute bottom-0 left-0 right-0 top-0 z-9"
        />
      </div>
      <div className="grid flex-1 grid-cols-12 gap-2 md:gap-5 w-full lg:gap-5">
        <div className="col-span-12 flex lg:flex-row flex-col items-start gap-5 text-black dark:text-white">
          <ResultGraph
            defaultAvg={-6.07}
            sdAvg={42.12}
            title="왼쪽 어깨-팔꿈치-손목 각도"
            userAvg={statics.front_elbow_align_angle_left_shoulder_elbow_wrist}
            unitName="각도"
            unit="°"
          />
          <ResultGraph
            defaultAvg={-9.11}
            sdAvg={41.46}
            title="오른쪽 어깨-팔꿈치-손목 각도"
            unitName="각도"
            userAvg={statics.front_elbow_align_angle_right_shoulder_elbow_wrist}
            unit="°"
          />
        </div>
        <div className="col-span-12 flex lg:flex-row flex-col items-start gap-5 text-black dark:text-white">
          <ResultGraph
            defaultAvg={18.87}
            sdAvg={26.73}
            title="왼쪽 팔꿈치 위-팔꿈치-손목 각도"
            unitName="각도"
            userAvg={
              statics.front_elbow_align_angle_left_upper_elbow_elbow_wrist
            }
            unit="°"
          />
          <ResultGraph
            defaultAvg={17.48}
            sdAvg={28.66}
            unitName="각도"
            title="오른쪽 팔꿈치 위-팔꿈치-손목 각도"
            userAvg={
              statics.front_elbow_align_angle_right_upper_elbow_elbow_wrist
            }
            unit="°"
          />
        </div>
        {/* <div className="col-span-12 flex lg:flex-row flex-col items-start gap-5 text-black dark:text-white">
              <ResultGraph
                defaultAvg={-0.12}
                sdAvg={0.36}
                title="중심점과 왼쪽 손목과의 거리"
                unitName="거리"
                userAvg={statics.front_elbow_align_distance_center_wrist_left}
                unit="cm"
              />
              <ResultGraph
                defaultAvg={-0.12}
                sdAvg={0.36}
                title="중심점과 오른쪽 손목과의 거리"
                unitName="거리"
                userAvg={statics.front_elbow_align_distance_center_wrist_right}
                unit="cm"
              />
            </div> */}
        <div className="col-span-12 flex lg:flex-row flex-col items-start gap-5 text-black dark:text-white">
          <ResultGraph
            defaultAvg={2.34}
            sdAvg={1.89}
            title="왼쪽 손목-어깨 거리"
            unitName="거리"
            userAvg={statics.front_elbow_align_distance_left_wrist_shoulder}
            unit="cm"
          />
          <ResultGraph
            defaultAvg={2.3}
            sdAvg={1.74}
            title="오른쪽 손목-어깨 거리"
            unitName="거리"
            userAvg={statics.front_elbow_align_distance_right_wrist_shoulder}
            unit="cm"
          />
        </div>
        <div className="col-span-12 flex lg:flex-row flex-col items-start gap-5 text-black dark:text-white">
          <ResultGraph
            defaultAvg={-0.14}
            sdAvg={0.84}
            title="양 손목 높이 차이"
            unitName="높이차"
            userAvg={statics.front_elbow_align_distance_wrist_height}
            unit="cm"
          />
          <div className="flex-1"></div>
        </div>
      </div>
    </div>
  );
};
export default MeasureStaticSecond;
