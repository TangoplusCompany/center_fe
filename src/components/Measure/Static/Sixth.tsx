import { IUserDetailStatic } from "@/types/user";
import React, { useEffect, useRef, useState } from "react";
import ResultGraph from "../ResultGraph";
import Image from "next/image";
import { useMeasureJson } from "@/hooks/user";

const MeasureStaticSixth = ({
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
          data.pose_landmark[23].sx * scaleWidth,
          data.pose_landmark[23].sy * scaleHeight,
        );
        contextWhite.lineTo(
          data.pose_landmark[24].sx * scaleWidth,
          data.pose_landmark[24].sy * scaleHeight,
        );
        contextWhite.stroke();

        contextWhite.beginPath();
        contextWhite.moveTo(
          Math.round(
            (data.pose_landmark[7].sx * scaleWidth +
              data.pose_landmark[8].sx * scaleWidth) /
              2,
          ),
          Math.round(
            (data.pose_landmark[7].sy * scaleHeight +
              data.pose_landmark[8].sy * scaleHeight) /
              2,
          ),
        );
        contextWhite.lineTo(
          data.pose_landmark[11].sx * scaleWidth,
          data.pose_landmark[11].sy * scaleHeight,
        );
        contextWhite.lineTo(
          data.pose_landmark[12].sx * scaleWidth,
          data.pose_landmark[12].sy * scaleHeight,
        );
        contextWhite.lineTo(
          Math.round(
            (data.pose_landmark[7].sx * scaleWidth +
              data.pose_landmark[8].sx * scaleWidth) /
              2,
          ),
          Math.round(
            (data.pose_landmark[7].sy * scaleHeight +
              data.pose_landmark[8].sy * scaleHeight) /
              2,
          ),
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
        contextWhite.lineTo(
          Math.round(
            (data.pose_landmark[23].sx * scaleWidth +
              data.pose_landmark[24].sx * scaleWidth) /
              2,
          ),
          Math.round(
            (data.pose_landmark[23].sy * scaleHeight +
              data.pose_landmark[24].sy * scaleHeight) /
              2,
          ),
        );
        contextWhite.lineTo(
          data.pose_landmark[11].sx * scaleWidth,
          data.pose_landmark[11].sy * scaleHeight,
        );
        contextWhite.stroke();
      });

      clearAndDraw(contextGreen, "#00FF00", () => {});

      clearAndDraw(contextRed, "#FF0000", () => {
        contextRed.beginPath();
        contextRed.moveTo(
          Math.round(
            (data.pose_landmark[11].sx * scaleWidth +
              data.pose_landmark[12].sx * scaleWidth) /
              2,
          ),
          data.pose_landmark[27].sy * scaleHeight + 100,
        );
        contextRed.lineTo(
          Math.round(
            (data.pose_landmark[27].sx * scaleWidth +
              data.pose_landmark[28].sx * scaleWidth) /
              2,
          ),
          data.pose_landmark[7].sy * scaleHeight - 100,
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
            defaultAvg={0.04}
            sdAvg={0.29}
            unitName="높이차"
            title="후면-앉은자세 양쪽 귀 높이차"
            userAvg={statics.back_sit_horizontal_distance_sub_ear}
            unit="cm"
          />
          <ResultGraph
            defaultAvg={89.72 * 2}
            sdAvg={2.83 * 2}
            unitName="기울기"
            title="후면-앉은자세 양쪽 귀 기울기"
            userAvg={statics.back_sit_horizontal_angle_ear + 180}
            unit="°"
          />
        </div>
        <div className="col-span-12 flex lg:flex-row flex-col items-start gap-5 text-black dark:text-white">
          <ResultGraph
            defaultAvg={-0.02}
            sdAvg={0.63}
            unitName="높이차"
            title="후면-앉은자세 양쪽 어깨 높이차"
            userAvg={statics.back_sit_horizontal_distance_sub_shoulder}
            unit="cm"
          />
          <ResultGraph
            defaultAvg={90.13 * 2}
            sdAvg={2 * 2}
            unitName="기울기"
            title="후면-앉은자세 양쪽 어깨 기울기"
            userAvg={statics.back_sit_horizontal_angle_shoulder + 180}
            unit="°"
          />
        </div>
        <div className="col-span-12 flex lg:flex-row flex-col items-start gap-5 text-black dark:text-white">
          <ResultGraph
            defaultAvg={0.11}
            sdAvg={0.42}
            unitName="높이차"
            title="후면-앉은자세 양쪽 골반 높이차"
            userAvg={statics.back_sit_horizontal_distance_sub_hip}
            unit="cm"
          />
          <ResultGraph
            defaultAvg={89.42 * 2}
            sdAvg={2.52 * 2}
            unitName="기울기"
            title="후면-앉은자세 양쪽 골반 기울기"
            userAvg={statics.back_sit_horizontal_angle_hip + 180}
            unit="°"
          />
        </div>
        <div className="col-span-12 flex lg:flex-row flex-col items-start gap-5 text-black dark:text-white">
          <ResultGraph
            defaultAvg={90 - 65.63}
            sdAvg={3.94}
            unitName="각도"
            title="후면-앉은자세 골반중앙-오른어깨-왼어깨 각도"
            userAvg={
              statics.back_sit_vertical_angle_center_hip_right_shoulder_left_shoulder
            }
            unit="°"
          />
          <ResultGraph
            defaultAvg={90 - 49.09}
            sdAvg={5.27}
            unitName="각도"
            title="후면-앉은자세 왼어깨-골반중앙-오른어깨 각도"
            userAvg={
              statics.back_sit_vertical_angle_left_shoulder_center_hip_right_shoulder
            }
            unit="°"
          />
        </div>
        <div className="col-span-12 flex lg:flex-row flex-col items-start gap-5 text-black dark:text-white">
          <ResultGraph
            defaultAvg={90 - 43.64}
            sdAvg={4.48}
            unitName="각도"
            title="후면-앉은자세 왼어깨-오른어깨-코 각도"
            userAvg={
              statics.back_sit_vertical_angle_left_shoulder_right_shoulder_nose
            }
            unit="°"
          />
          <ResultGraph
            defaultAvg={90 - 65.28}
            sdAvg={2.52}
            unitName="각도"
            title="후면-앉은자세 오른어깨-왼어깨-골반중앙 각도"
            userAvg={
              statics.back_sit_vertical_angle_right_shoulder_left_shoulder_center_hip
            }
            unit="°"
          />
        </div>
      </div>
    </div>
  );
};

export default MeasureStaticSixth;
