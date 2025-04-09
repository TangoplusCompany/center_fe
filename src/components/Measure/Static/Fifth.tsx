import { IUserDetailStatic } from "@/types/user";
import React, { useEffect, useRef, useState } from "react";
import ResultGraph from "../ResultGraph";
import Image from "next/image";
import { useMeasureJson } from "@/hooks/user";

const MeasureStaticFifth = ({
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
          data.pose_landmark[23].sx * scaleWidth,
          data.pose_landmark[23].sy * scaleHeight,
        );
        contextWhite.lineTo(
          data.pose_landmark[24].sx * scaleWidth,
          data.pose_landmark[24].sy * scaleHeight,
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

        contextWhite.beginPath();
        contextWhite.moveTo(
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
          data.pose_landmark[24].sx * scaleWidth,
          data.pose_landmark[24].sy * scaleHeight,
        );
        contextWhite.lineTo(
          data.pose_landmark[26].sx * scaleWidth,
          data.pose_landmark[26].sy * scaleHeight,
        );
        contextWhite.lineTo(
          data.pose_landmark[28].sx * scaleWidth,
          data.pose_landmark[28].sy * scaleHeight,
        );
        contextWhite.stroke();
      });

      clearAndDraw(contextGreen, "#00FF00", () => {
        contextGreen.beginPath();
        contextGreen.moveTo(
          data.pose_landmark[11].sx * scaleWidth,
          data.pose_landmark[11].sy * scaleHeight,
        );
        contextGreen.lineTo(
          data.pose_landmark[12].sx * scaleWidth,
          data.pose_landmark[12].sy * scaleHeight,
        );
        contextGreen.stroke();

        contextGreen.beginPath();
        contextGreen.moveTo(
          data.pose_landmark[15].sx * scaleWidth,
          data.pose_landmark[15].sy * scaleHeight,
        );
        contextGreen.lineTo(
          data.pose_landmark[16].sx * scaleWidth,
          data.pose_landmark[16].sy * scaleHeight,
        );
        contextGreen.stroke();

        contextGreen.beginPath();
        contextGreen.moveTo(
          data.pose_landmark[25].sx * scaleWidth,
          data.pose_landmark[25].sy * scaleHeight,
        );
        contextGreen.lineTo(
          data.pose_landmark[26].sx * scaleWidth,
          data.pose_landmark[26].sy * scaleHeight,
        );
        contextGreen.stroke();

        contextGreen.beginPath();
        contextGreen.moveTo(
          data.pose_landmark[0].sx * scaleWidth,
          data.pose_landmark[0].sy * scaleHeight,
        );
        contextGreen.lineTo(
          Math.round(
            (data.pose_landmark[11].sx * scaleWidth +
              data.pose_landmark[12].sx * scaleWidth) /
              2,
          ),
          Math.round(
            (data.pose_landmark[11].sy * scaleHeight +
              data.pose_landmark[12].sy * scaleHeight) /
              2,
          ),
        );
        contextGreen.stroke();
      });

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
            defaultAvg={0.1}
            sdAvg={0.23}
            unitName="높이차"
            title="후면 양쪽 귀 높이차"
            userAvg={statics.back_horizontal_distance_sub_ear}
            unit="cm"
          />
          <ResultGraph
            defaultAvg={86.5}
            sdAvg={21.14}
            unitName="기울기"
            title="후면 양쪽 귀 기울기"
            userAvg={90 - statics.back_horizontal_angle_ear}
            unit="°"
          />
        </div>
        <div className="col-span-12 flex lg:flex-row flex-col items-start gap-5 text-black dark:text-white">
          <ResultGraph
            defaultAvg={-0.13}
            sdAvg={0.51}
            unitName="높이차"
            title="후면 양쪽 어깨 높이차"
            userAvg={statics.back_horizontal_distance_sub_shoulder}
            unit="cm"
          />
          <ResultGraph
            defaultAvg={89.27}
            sdAvg={14.88}
            unitName="기울기"
            title="후면 양쪽 어깨 기울기"
            userAvg={90 - statics.back_horizontal_angle_shoulder}
            unit="°"
          />
        </div>
        <div className="col-span-12 flex lg:flex-row flex-col items-start gap-5 text-black dark:text-white">
          <ResultGraph
            defaultAvg={-0.14}
            sdAvg={0.83}
            unitName="높이차"
            title="후면 양쪽 팔꿉 높이차"
            userAvg={statics.back_horizontal_distance_sub_elbow}
            unit="cm"
          />
          <ResultGraph
            defaultAvg={89.16}
            sdAvg={15.15}
            unitName="기울기"
            title="후면 양쪽 팔꿉 기울기"
            userAvg={90 - statics.back_horizontal_angle_elbow}
            unit="°"
          />
        </div>
        <div className="col-span-12 flex lg:flex-row flex-col items-start gap-5 text-black dark:text-white">
          <ResultGraph
            defaultAvg={0.12}
            sdAvg={0.21}
            unitName="높이차"
            title="후면 양쪽 골반 높이차"
            userAvg={statics.back_horizontal_distance_sub_hip}
            unit="cm"
          />
          <ResultGraph
            defaultAvg={88.07}
            sdAvg={14.86}
            unitName="기울기"
            title="후면 양쪽 골반 기울기"
            userAvg={90 - statics.back_horizontal_angle_hip}
            unit="°"
          />
        </div>
        <div className="col-span-12 flex lg:flex-row flex-col items-start gap-5 text-black dark:text-white">
          <ResultGraph
            defaultAvg={-0.01}
            sdAvg={0.57}
            unitName="높이차"
            title="후면 양쪽 발목 높이차"
            userAvg={statics.back_horizontal_distance_sub_ankle}
            unit="cm"
          />
          <ResultGraph
            defaultAvg={88.85}
            sdAvg={15.51}
            unitName="기울기"
            title="후면 양쪽 발목 기울기"
            userAvg={90 - statics.back_horizontal_angle_ankle}
            unit="°"
          />
        </div>
        <div className="col-span-12 flex lg:flex-row flex-col items-start gap-5 text-black dark:text-white">
          <ResultGraph
            defaultAvg={5.03}
            sdAvg={1.27}
            unitName="높이차"
            title="후면 왼쪽 무릎 거리"
            userAvg={statics.back_horizontal_distance_knee_left}
            unit="cm"
          />
          <ResultGraph
            defaultAvg={4.79}
            sdAvg={1.24}
            unitName="높이차"
            title="후면 오른쪽 무릎 거리"
            userAvg={statics.back_horizontal_distance_knee_right}
            unit="cm"
          />
        </div>
        <div className="col-span-12 flex lg:flex-row flex-col items-start gap-5 text-black dark:text-white">
          <ResultGraph
            defaultAvg={-27.35}
            sdAvg={174.14}
            unitName="각도"
            title="후면 왼쪽 무릎-뒤꿈치 각도"
            userAvg={statics.back_vertical_angle_knee_heel_left - 90}
            unit="°"
          />
          <ResultGraph
            defaultAvg={8.49}
            sdAvg={176.42}
            unitName="각도"
            title="후면 오른쪽 무릎-뒤꿈치 각도"
            userAvg={statics.back_vertical_angle_knee_heel_right - 90}
            unit="°"
          />
        </div>
        <div className="col-span-12 flex lg:flex-row flex-col items-start gap-5 text-black dark:text-white">
          <ResultGraph
            defaultAvg={-39.92}
            sdAvg={174.14}
            unitName="각도"
            title="후면 코-어깨-중심점 각도"
            userAvg={statics.back_vertical_angle_nose_center_shoulder - 90}
            unit="°"
          />
          <ResultGraph
            defaultAvg={-20.82}
            sdAvg={175.28}
            unitName="각도"
            title="후면 코-골반-중심점 각도"
            userAvg={statics.back_vertical_angle_nose_center_hip - 90}
            unit="°"
          />
        </div>
        <div className="col-span-12 flex lg:flex-row flex-col items-start gap-5 text-black dark:text-white">
          <ResultGraph
            defaultAvg={3.85}
            sdAvg={1.5}
            unitName="거리"
            title="후면 중심점-발뒤꿈치 거리"
            userAvg={statics.back_horizontal_distance_heel_left}
            unit="cm"
          />
          <ResultGraph
            defaultAvg={3.82}
            sdAvg={1.62}
            unitName="거리"
            title="후면 오른쪽 무릎-뒤꿈치 거리"
            userAvg={statics.back_horizontal_distance_heel_right}
            unit="cm"
          />
        </div>
      </div>
    </div>
  );
};

export default MeasureStaticFifth;
