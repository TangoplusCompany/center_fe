import { IUserDetailStatic } from "@/types/user";
import React, { useEffect, useRef, useState } from "react";
import ResultGraph from "../ResultGraph";
import Image from "next/image";
import { useMeasureJson } from "@/hooks/user";

const MeasureStaticThird = ({
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
          data.pose_landmark[11].sx * scaleWidth,
          data.pose_landmark[11].sy * scaleHeight,
        );
        contextWhite.lineTo(
          data.pose_landmark[23].sx * scaleWidth,
          data.pose_landmark[23].sy * scaleHeight,
        );
        contextWhite.lineTo(
          data.pose_landmark[25].sx * scaleWidth,
          data.pose_landmark[25].sy * scaleHeight,
        );
        contextWhite.lineTo(
          data.pose_landmark[27].sx * scaleWidth,
          data.pose_landmark[27].sy * scaleHeight,
        );
        contextWhite.stroke();

        contextWhite.beginPath();
        contextWhite.moveTo(
          data.pose_landmark[27].sx * scaleWidth,
          data.pose_landmark[27].sy * scaleHeight,
        );
        contextWhite.lineTo(
          data.pose_landmark[29].sx * scaleWidth,
          data.pose_landmark[29].sy * scaleHeight,
        );
        contextWhite.moveTo(
          data.pose_landmark[27].sx * scaleWidth,
          data.pose_landmark[27].sy * scaleHeight,
        );
        contextWhite.lineTo(
          data.pose_landmark[31].sx * scaleWidth,
          data.pose_landmark[31].sy * scaleHeight,
        );
        contextWhite.stroke();
      });

      clearAndDraw(contextGreen, "#00FF00", () => {
        contextGreen.beginPath();
        contextGreen.moveTo(
          data.pose_landmark[0].sx * scaleWidth,
          data.pose_landmark[0].sy * scaleHeight,
        );
        contextGreen.lineTo(
          data.pose_landmark[11].sx * scaleWidth,
          data.pose_landmark[11].sy * scaleHeight,
        );
        contextGreen.stroke();

        contextGreen.beginPath();
        contextGreen.moveTo(
          data.pose_landmark[15].sx * scaleWidth,
          data.pose_landmark[15].sy * scaleHeight,
        );
        contextGreen.lineTo(
          data.pose_landmark[27].sx * scaleWidth,
          data.pose_landmark[15].sy * scaleHeight,
        );
        contextGreen.stroke();

        contextGreen.beginPath();
        contextGreen.moveTo(
          data.pose_landmark[23].sx * scaleWidth,
          data.pose_landmark[23].sy * scaleHeight,
        );
        contextGreen.lineTo(
          data.pose_landmark[27].sx * scaleWidth,
          data.pose_landmark[23].sy * scaleHeight,
        );
        contextGreen.stroke();

        contextGreen.beginPath();
        contextGreen.moveTo(
          data.pose_landmark[25].sx * scaleWidth,
          data.pose_landmark[25].sy * scaleHeight,
        );
        contextGreen.lineTo(
          data.pose_landmark[27].sx * scaleWidth,
          data.pose_landmark[25].sy * scaleHeight,
        );
        contextGreen.stroke();
      });

      clearAndDraw(contextRed, "#FF0000", () => {
        contextRed.beginPath();
        contextRed.moveTo(
          data.pose_landmark[11].sx * scaleWidth,
          data.pose_landmark[0].sy * scaleHeight - 100,
        );
        contextRed.lineTo(
          data.pose_landmark[27].sx * scaleWidth,
          data.pose_landmark[27].sy * scaleHeight + 100,
        );
        contextRed.stroke();

        contextRed.beginPath();
        contextRed.moveTo(
          data.pose_landmark[11].sx * scaleWidth - 100,
          data.pose_landmark[11].sy * scaleHeight,
        );
        contextRed.lineTo(
          data.pose_landmark[11].sx * scaleWidth + 100,
          data.pose_landmark[11].sy * scaleHeight,
        );
        contextRed.stroke();

        contextRed.beginPath();
        contextRed.moveTo(
          data.pose_landmark[0].sx * scaleWidth - 100,
          data.pose_landmark[0].sy * scaleHeight,
        );
        contextRed.lineTo(
          data.pose_landmark[0].sx * scaleWidth + 100,
          data.pose_landmark[0].sy * scaleHeight,
        );
        contextRed.stroke();
      });
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
        <div className="col-span-12 flex lg:flex-row flex-col items-start gap-5 text-black dark:text-white">
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
        <div className="col-span-12 flex lg:flex-row flex-col items-start gap-5 text-black dark:text-white">
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
        <div className="col-span-12 flex lg:flex-row flex-col items-start gap-5 text-black dark:text-white">
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
};

export default MeasureStaticThird;
