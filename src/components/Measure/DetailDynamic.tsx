import { IUserDetailDynamic } from "@/types/user";
import React, { useEffect, useRef, useState } from "react";
import ResultGraph from "./ResultGraph";

import { useDrawCanvas } from "@/hooks/utils";
import { useMeasureDynamicJson } from "@/hooks/measure/useMeasureDynamicJson";
import DataError from "../Util/DataError";
import ShoulderMoveLine from "./Dynamic/ShoulderMoveLine";
import KneeMoveLine from "./Dynamic/KneeMoveLine";

const MeasureDetailDynamic = ({
  dynamic,
  className,
}: {
  dynamic: IUserDetailDynamic;
  className?: string;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const defaultWidth = dynamic.measure_overlay_width as number;
  const defaultHeight = dynamic.measure_overlay_height as number;
  const [nowWidth, setNowWidth] = useState(defaultWidth);
  const [nowHeight, setNowHeight] = useState(defaultHeight);
  const [scaleWidth, setScaleWidth] = useState(1);
  const [scaleHeight, setScaleHeight] = useState(1);
  const canvasWhiteRef = useRef<HTMLCanvasElement | null>(null);
  const canvasRedRef = useRef<HTMLCanvasElement | null>(null);
  const {
    data: measureJson,
    isLoading,
    isError,
  } = useMeasureDynamicJson(dynamic.measure_server_json_name);
  const clearAndDraw = useDrawCanvas;
  const [frame, setFrame] = useState(0);
  const frameLoopActive = useRef(false);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleResize = (entries: ResizeObserverEntry[]) => {
      const entry = entries[0];
      const { width, height } = entry.contentRect;

      const widthScale = Number((width / defaultWidth).toFixed(4));
      const heightScale = Number((height / defaultHeight).toFixed(4));

      setScaleWidth(widthScale);
      setScaleHeight(heightScale);
      setNowWidth(width);
      setNowHeight(height);
    };

    const observer = new ResizeObserver(handleResize);
    observer.observe(video);

    // 초기에 강제 측정
    handleResize([
      { contentRect: video.getBoundingClientRect() } as ResizeObserverEntry,
    ]);

    const startFrameTracking = () => {
      const video = videoRef.current;
      if (!video || !("requestVideoFrameCallback" in video)) return;

      syncFrameToCurrentTime(); // 🎯 여기가 중요!

      const loop = (_: number) => {
        if (!frameLoopActive.current) return;

        const frame = Math.floor(video.currentTime * 30);
        setFrame(frame);

        video.requestVideoFrameCallback(loop);
      };

      frameLoopActive.current = true;
      video.requestVideoFrameCallback(loop);
    };
    const syncFrameToCurrentTime = () => {
      const video = videoRef.current;
      if (!video) return;
      const currentFrame = Math.floor(video.currentTime * 30);
      setFrame(currentFrame);
    };

    const pauseFrameTracking = () => {
      frameLoopActive.current = false;
      syncFrameToCurrentTime();
    };
    const stopFrameTracking = () => {
      setFrame(0);
      frameLoopActive.current = false;
    };
    const endedFrameTracking = () => {
      frameLoopActive.current = false;
    };

    const handlePlay = () => startFrameTracking();
    const handlePause = () => pauseFrameTracking();
    const handleEnded = () => endedFrameTracking();
    const handleSeeked = () => {
      stopFrameTracking(); // 기존 루프 제거
      syncFrameToCurrentTime(); // ← currentTime 기반 frame 보정
      if (!videoRef.current?.paused) {
        startFrameTracking(); // 재생 중이면 루프 재시작
      }
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("seeked", handleSeeked);
    video.addEventListener("loadedmetadata", handleSeeked);
    return () => {
      observer.disconnect();
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("seeked", handleSeeked);
      video.removeEventListener("loadedmetadata", handleSeeked);
    };
  }, [measureJson]);

  useEffect(() => {
    if (!measureJson || videoRef.current === null) return;
    if (measureJson[frame] === undefined) return;
    if (measureJson[frame].pose_landmark === undefined) return;
    const canvasWhite = canvasWhiteRef.current as HTMLCanvasElement;
    const canvasRed = canvasRedRef.current as HTMLCanvasElement;

    const contextWhite = canvasWhite.getContext(
      "2d",
    ) as CanvasRenderingContext2D;
    const contextRed = canvasRed.getContext("2d") as CanvasRenderingContext2D;

    const drawCanvas = () => {
      clearAndDraw(contextWhite, canvasWhite, "#FFF", () => {
        contextWhite.beginPath();
        contextWhite.moveTo(
          measureJson[frame].pose_landmark[7].sx * scaleWidth,
          measureJson[frame].pose_landmark[7].sy * scaleHeight,
        );
        contextWhite.lineTo(
          measureJson[frame].pose_landmark[8].sx * scaleWidth,
          measureJson[frame].pose_landmark[8].sy * scaleHeight,
        );
        contextWhite.stroke();

        contextWhite.beginPath();
        contextWhite.moveTo(
          measureJson[frame].pose_landmark[16].sx * scaleWidth,
          measureJson[frame].pose_landmark[16].sy * scaleHeight,
        );
        contextWhite.lineTo(
          measureJson[frame].pose_landmark[18].sx * scaleWidth,
          measureJson[frame].pose_landmark[18].sy * scaleHeight,
        );
        contextWhite.stroke();

        contextWhite.beginPath();
        contextWhite.moveTo(
          measureJson[frame].pose_landmark[16].sx * scaleWidth,
          measureJson[frame].pose_landmark[16].sy * scaleHeight,
        );
        contextWhite.lineTo(
          measureJson[frame].pose_landmark[20].sx * scaleWidth,
          measureJson[frame].pose_landmark[20].sy * scaleHeight,
        );
        contextWhite.stroke();

        contextWhite.beginPath();
        contextWhite.moveTo(
          measureJson[frame].pose_landmark[16].sx * scaleWidth,
          measureJson[frame].pose_landmark[16].sy * scaleHeight,
        );
        contextWhite.lineTo(
          measureJson[frame].pose_landmark[22].sx * scaleWidth,
          measureJson[frame].pose_landmark[22].sy * scaleHeight,
        );
        contextWhite.stroke();

        contextWhite.beginPath();
        contextWhite.moveTo(
          measureJson[frame].pose_landmark[15].sx * scaleWidth,
          measureJson[frame].pose_landmark[15].sy * scaleHeight,
        );
        contextWhite.lineTo(
          measureJson[frame].pose_landmark[19].sx * scaleWidth,
          measureJson[frame].pose_landmark[19].sy * scaleHeight,
        );
        contextWhite.stroke();

        contextWhite.beginPath();
        contextWhite.moveTo(
          measureJson[frame].pose_landmark[15].sx * scaleWidth,
          measureJson[frame].pose_landmark[15].sy * scaleHeight,
        );
        contextWhite.lineTo(
          measureJson[frame].pose_landmark[21].sx * scaleWidth,
          measureJson[frame].pose_landmark[21].sy * scaleHeight,
        );
        contextWhite.stroke();

        contextWhite.beginPath();
        contextWhite.moveTo(
          measureJson[frame].pose_landmark[15].sx * scaleWidth,
          measureJson[frame].pose_landmark[15].sy * scaleHeight,
        );
        contextWhite.lineTo(
          measureJson[frame].pose_landmark[17].sx * scaleWidth,
          measureJson[frame].pose_landmark[17].sy * scaleHeight,
        );
        contextWhite.stroke();

        contextWhite.beginPath();
        contextWhite.moveTo(
          measureJson[frame].pose_landmark[11].sx * scaleWidth,
          measureJson[frame].pose_landmark[11].sy * scaleHeight,
        );
        contextWhite.lineTo(
          measureJson[frame].pose_landmark[23].sx * scaleWidth,
          measureJson[frame].pose_landmark[23].sy * scaleHeight,
        );
        contextWhite.lineTo(
          measureJson[frame].pose_landmark[24].sx * scaleWidth,
          measureJson[frame].pose_landmark[24].sy * scaleHeight,
        );
        contextWhite.lineTo(
          measureJson[frame].pose_landmark[12].sx * scaleWidth,
          measureJson[frame].pose_landmark[12].sy * scaleHeight,
        );
        contextWhite.lineTo(
          measureJson[frame].pose_landmark[11].sx * scaleWidth,
          measureJson[frame].pose_landmark[11].sy * scaleHeight,
        );
        contextWhite.stroke();

        contextWhite.beginPath();
        contextWhite.moveTo(
          measureJson[frame].pose_landmark[11].sx * scaleWidth,
          measureJson[frame].pose_landmark[11].sy * scaleHeight,
        );
        contextWhite.lineTo(
          measureJson[frame].pose_landmark[13].sx * scaleWidth,
          measureJson[frame].pose_landmark[13].sy * scaleHeight,
        );
        contextWhite.lineTo(
          measureJson[frame].pose_landmark[15].sx * scaleWidth,
          measureJson[frame].pose_landmark[15].sy * scaleHeight,
        );
        contextWhite.stroke();

        contextWhite.beginPath();
        contextWhite.moveTo(
          measureJson[frame].pose_landmark[12].sx * scaleWidth,
          measureJson[frame].pose_landmark[12].sy * scaleHeight,
        );
        contextWhite.lineTo(
          measureJson[frame].pose_landmark[14].sx * scaleWidth,
          measureJson[frame].pose_landmark[14].sy * scaleHeight,
        );
        contextWhite.lineTo(
          measureJson[frame].pose_landmark[16].sx * scaleWidth,
          measureJson[frame].pose_landmark[16].sy * scaleHeight,
        );
        contextWhite.stroke();

        contextWhite.beginPath();
        contextWhite.moveTo(
          measureJson[frame].pose_landmark[23].sx * scaleWidth,
          measureJson[frame].pose_landmark[23].sy * scaleHeight,
        );
        contextWhite.lineTo(
          measureJson[frame].pose_landmark[25].sx * scaleWidth,
          measureJson[frame].pose_landmark[25].sy * scaleHeight,
        );
        contextWhite.lineTo(
          measureJson[frame].pose_landmark[27].sx * scaleWidth,
          measureJson[frame].pose_landmark[27].sy * scaleHeight,
        );
        contextWhite.stroke();

        contextWhite.beginPath();
        contextWhite.moveTo(
          measureJson[frame].pose_landmark[31].sx * scaleWidth,
          measureJson[frame].pose_landmark[31].sy * scaleHeight,
        );
        contextWhite.lineTo(
          measureJson[frame].pose_landmark[27].sx * scaleWidth,
          measureJson[frame].pose_landmark[27].sy * scaleHeight,
        );
        contextWhite.stroke();

        contextWhite.beginPath();
        contextWhite.moveTo(
          measureJson[frame].pose_landmark[29].sx * scaleWidth,
          measureJson[frame].pose_landmark[29].sy * scaleHeight,
        );
        contextWhite.lineTo(
          measureJson[frame].pose_landmark[27].sx * scaleWidth,
          measureJson[frame].pose_landmark[27].sy * scaleHeight,
        );
        contextWhite.stroke();

        contextWhite.beginPath();
        contextWhite.moveTo(
          measureJson[frame].pose_landmark[24].sx * scaleWidth,
          measureJson[frame].pose_landmark[24].sy * scaleHeight,
        );
        contextWhite.lineTo(
          measureJson[frame].pose_landmark[26].sx * scaleWidth,
          measureJson[frame].pose_landmark[26].sy * scaleHeight,
        );
        contextWhite.lineTo(
          measureJson[frame].pose_landmark[28].sx * scaleWidth,
          measureJson[frame].pose_landmark[28].sy * scaleHeight,
        );
        contextWhite.stroke();

        contextWhite.beginPath();
        contextWhite.moveTo(
          measureJson[frame].pose_landmark[30].sx * scaleWidth,
          measureJson[frame].pose_landmark[30].sy * scaleHeight,
        );
        contextWhite.lineTo(
          measureJson[frame].pose_landmark[28].sx * scaleWidth,
          measureJson[frame].pose_landmark[28].sy * scaleHeight,
        );
        contextWhite.stroke();

        contextWhite.beginPath();
        contextWhite.moveTo(
          measureJson[frame].pose_landmark[28].sx * scaleWidth,
          measureJson[frame].pose_landmark[28].sy * scaleHeight,
        );
        contextWhite.lineTo(
          measureJson[frame].pose_landmark[32].sx * scaleWidth,
          measureJson[frame].pose_landmark[32].sy * scaleHeight,
        );
        contextWhite.stroke();
      });

      clearAndDraw(contextRed, canvasRed, "#FF0000", () => {
        contextRed.beginPath();
        contextRed.moveTo(
          measureJson[frame].pose_landmark[20].sx * scaleWidth,
          measureJson[frame].pose_landmark[20].sy * scaleHeight,
        );
        contextRed.lineTo(
          measureJson[frame].pose_landmark[19].sx * scaleWidth,
          measureJson[frame].pose_landmark[19].sy * scaleHeight,
        );
        contextRed.stroke();

        contextRed.beginPath();
        contextRed.moveTo(
          measureJson[frame].pose_landmark[23].sx * scaleWidth,
          measureJson[frame].pose_landmark[23].sy * scaleHeight,
        );
        contextRed.lineTo(
          measureJson[frame].pose_landmark[24].sx * scaleWidth,
          measureJson[frame].pose_landmark[24].sy * scaleHeight,
        );
        contextRed.stroke();

        contextRed.beginPath();
        contextRed.moveTo(
          measureJson[frame].pose_landmark[25].sx * scaleWidth,
          measureJson[frame].pose_landmark[25].sy * scaleHeight,
        );
        contextRed.lineTo(
          measureJson[frame].pose_landmark[26].sx * scaleWidth,
          measureJson[frame].pose_landmark[26].sy * scaleHeight,
        );
        contextRed.stroke();
      });
    };

    drawCanvas();
  }, [measureJson, scaleWidth, scaleHeight, nowHeight, frame]);

  if (!measureJson) return <div></div>;
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <DataError />;
  return (
    <div className={`${className} flex flex-col gap-4 lg:gap-10`}>
      <div className="relative w-full overflow-hidden">
        <video
          ref={videoRef}
          muted
          playsInline
          controls={true}
          webkit-playsinline="true"
          className="w-full relative z-0"
          src={`https://gym.tangoplus.co.kr/data/Results/${dynamic.measure_server_file_name}`}
        />
        <canvas
          ref={canvasWhiteRef}
          width={nowWidth}
          height={nowHeight}
          className="absolute bottom-0 left-0 right-0 top-0 z-[9] -scale-x-[1] pointer-events-none"
        />
        <canvas
          ref={canvasRedRef}
          width={nowWidth}
          height={nowHeight}
          className="absolute bottom-0 left-0 right-0 top-0 z-[9] -scale-x-[1] pointer-events-none"
        />
      </div>
      <ShoulderMoveLine
        nowWidth={nowWidth}
        nowHeight={nowHeight}
        measureJson={measureJson}
      />
      <KneeMoveLine
        nowWidth={nowWidth}
        nowHeight={nowHeight}
        measureJson={measureJson}
      />
      <div className="grid flex-1 grid-cols-12 gap-2 md:gap-5 w-full lg:gap-10 p-5 lg:p-0">
        <div className="col-span-12 flex lg:flex-row flex-col items-start gap-5 text-black dark:text-white">
          <ResultGraph
            defaultAvg={0.01}
            sdAvg={0.51}
            title="오버헤드스쿼트 양쪽 어깨 높이차"
            userAvg={dynamic.ohs_front_horizontal_distance_shoulder}
            unit="cm"
            unitName="높이차"
          />
          <ResultGraph
            defaultAvg={89.9 * 2}
            sdAvg={1.93 * 2}
            unitName="기울기"
            title="오버헤드스쿼트 양쪽 어깨 기울기"
            userAvg={Math.abs(dynamic.ohs_front_horizontal_angle_shoulder)}
            unit="°"
          />
        </div>
        <div className="col-span-12 flex lg:flex-row flex-col items-start gap-5 text-black dark:text-white">
          <ResultGraph
            defaultAvg={-0.23}
            sdAvg={1.16}
            title="오버헤드스쿼트 양쪽 팔꿉 높이차"
            userAvg={dynamic.ohs_front_horizontal_distance_elbow}
            unitName="높이차"
            unit="cm"
          />
          <ResultGraph
            defaultAvg={90.39 * 2}
            sdAvg={2.44 * 2}
            unitName="기울기"
            title="오버헤드스쿼트 양쪽 팔꿉 기울기"
            userAvg={Math.abs(dynamic.ohs_front_horizontal_angle_elbow)}
            unit="°"
          />
        </div>
        <div className="col-span-12 flex lg:flex-row flex-col items-start gap-5 text-black dark:text-white">
          <ResultGraph
            defaultAvg={0.5}
            sdAvg={1.52}
            title="오버헤드스쿼트 양쪽 손목 높이차"
            unitName="높이차"
            userAvg={dynamic.ohs_front_horizontal_distance_wrist}
            unit="cm"
          />
          <ResultGraph
            defaultAvg={89.89 * 2}
            sdAvg={2.98 * 2}
            unitName="기울기"
            title="오버헤드스쿼트 양쪽 손목 기울기"
            userAvg={Math.abs(dynamic.ohs_front_horizontal_angle_wrist)}
            unit="°"
          />
        </div>
        <div className="col-span-12 flex lg:flex-row flex-col items-start gap-5 text-black dark:text-white">
          <ResultGraph
            defaultAvg={-0.18}
            sdAvg={0.28}
            unitName="높이차"
            title="오버헤드스쿼트 양쪽 골반 높이차"
            userAvg={dynamic.ohs_front_horizontal_distance_hip}
            unit="cm"
          />
          <ResultGraph
            defaultAvg={90.99 * 2}
            sdAvg={1.56 * 2}
            unitName="기울기"
            title="오버헤드스쿼트 양쪽 골반 기울기"
            userAvg={Math.abs(dynamic.ohs_front_horizontal_angle_hip)}
            unit="°"
          />
        </div>
        <div className="col-span-12 flex lg:flex-row flex-col items-start gap-5 text-black dark:text-white">
          <ResultGraph
            defaultAvg={-0.22}
            sdAvg={0.54}
            unitName="높이차"
            title="오버헤드스쿼트 양쪽 무릎 높이차"
            userAvg={dynamic.ohs_front_horizontal_distance_knee}
            unit="cm"
          />
          <ResultGraph
            defaultAvg={91.02 * 2}
            sdAvg={2.57 * 2}
            unitName="기울기"
            title="오버헤드스쿼트 양쪽 무릎 기울기"
            userAvg={Math.abs(dynamic.ohs_front_horizontal_angle_knee)}
            unit="°"
          />
        </div>
      </div>
    </div>
  );
};

export default MeasureDetailDynamic;
