
import React, { useEffect, useRef, useState } from "react";
// import { useDrawCanvas } from "@/hooks/utils";
// import { useMeasureDynamicJson } from "@/hooks/api/measure/useMeasureDynamicJson";
// import DataError from "../Util/DataError";
import { useMeasureSequence } from "@/hooks/api/measure/useMeasureSequence";
import RawDataContainer from "./RawDataContainer";
// import MeasureIntroFooter2, { IMatOhsPressure } from "./MeasureIntroFooter2";
// import MeasureIntroFooter3 from "./MeasureIntroFooter3";
// import { IUserMeasureDynamicFileData } from "@/types/measure";

const MeasureDetailDynamic = ({
  className,
  sns,
  cameraOrientation
}: {
  className? : string;
  sns: {
    measureSn: string;
    userSn: string;
  };
  cameraOrientation: number;
}) => {
  const {
      data: measureDynamic,
      isLoading: seq7Loading,
      isError: seq7Error,
    } = useMeasureSequence(
      sns.measureSn,
      sns.userSn,
      6
    );
  
  const data = measureDynamic?.file_data
  // const fileData = measureDynamic?.file_data as IUserMeasureDynamicFileData;
  //   const {
  //   mat_hip_down_image_name,
  //   mat_hip_trajectory_image_name,
  //   mat_left_knee_trajectory_image_name,
  //   mat_right_knee_trajectory_image_name,
  //   // measure_server_file_name,
  //   // measure_server_json_name,
  // } = fileData
  // const ohsFourCorners: IMatOhsPressure = {
  //     leftTopPressure: 0,
  //     leftBottomPressure: 0,
  //     rightTopPressure: 0,
  //     rightBottomPressure: 0,
  //     leftPressure: 0,
  //     rightPressure: 0,
  //     topPressure: 0,
  //     bottomPressure: 0,
  //   };
  // const isRotated = cameraOrientation === 1;

  // // 원본(데이터/JSON) 기준
  // const srcWidth = (data?.measure_overlay_width as number) ?? 1280;
  // const srcHeight = (data?.measure_overlay_height as number) ?? 720;


  const videoRef = useRef<HTMLVideoElement>(null);
  // const [nowWidth, setNowWidth] = useState(srcWidth);
  // const [nowHeight, setNowHeight] = useState(srcHeight);
  // const [scaleWidth, setScaleWidth] = useState(1);
  // const [scaleHeight, setScaleHeight] = useState(1);
  // const canvasWhiteRef = useRef<HTMLCanvasElement | null>(null);
  // const canvasRedRef = useRef<HTMLCanvasElement | null>(null);
  // const {
  //   data: measureJson,
  //   isLoading,
  //   isError,
  // } = useMeasureDynamicJson(data?.measure_server_json_name);
  // const clearAndDraw = useDrawCanvas;
  // const [frame, setFrame] = useState(0);
  // const frameLoopActive = useRef(false);

  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [, setIsSeeking] = useState(false);
  const isSeekingRef = useRef(false);
  useEffect(() => {
  
  const v = videoRef.current;
    if (!v || !data) {
      return;
    }
    

    const onLoadedMetadata = () => {
      setDuration(v.duration || 0);
      setCurrentTime(v.currentTime || 0);
    };

    const onTimeUpdate = () => {
      if (!isSeekingRef.current) {
        setCurrentTime(v.currentTime || 0);
      }
    };

    v.addEventListener("loadedmetadata", onLoadedMetadata);
    v.addEventListener("timeupdate", onTimeUpdate);

    if (v.readyState >= 1) {
      onLoadedMetadata();
    }

    return () => {
      v.removeEventListener("loadedmetadata", onLoadedMetadata);
      v.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [data]); // data를 dependency에 추가

  // useEffect(() => {
  //   const video = videoRef.current;
  //   if (!video) return;
  //   const handleResize = (entries: ResizeObserverEntry[]) => {
  //     const entry = entries[0];
  //     const { width, height } = entry.contentRect; // 비디오 엘리먼트의 현재 CSS 크기 (w-[75%] 등이 반영된 값)

  //       let sWidth, sHeight;

  //       if (isRotated) {
  //         sWidth = Number((height / 720).toFixed(4));
  //         sHeight = Number((width / 1280).toFixed(4));
  //       } else {
  //         sWidth = Number((width / srcWidth).toFixed(4));
  //         sHeight = Number((height / srcHeight).toFixed(4));
  //       }
  //     const finalScale = Math.min(sWidth, sHeight);
  //     setScaleWidth(finalScale);
  //     setScaleHeight(finalScale);
  //     setNowWidth(width);
  //     setNowHeight(height);
  //   };

  //   const observer = new ResizeObserver(handleResize);
  //   observer.observe(video);

  //   // 초기에 강제 측정
  //   handleResize([
  //     { contentRect: video.getBoundingClientRect() } as ResizeObserverEntry,
  //   ]);

  //   const startFrameTracking = () => {
  //     const video = videoRef.current;
  //     if (!video || !("requestVideoFrameCallback" in video)) return;

  //     syncFrameToCurrentTime(); // 🎯 여기가 중요!

  //     const loop = () => {
  //       if (!frameLoopActive.current) return;
  //       const frame = Math.floor(video.currentTime * 30);
  //       setFrame(frame);

  //       video.requestVideoFrameCallback(loop);
  //     };

  //     frameLoopActive.current = true;
  //     video.requestVideoFrameCallback(loop);
  //   };
  //   const syncFrameToCurrentTime = () => {
  //     const video = videoRef.current;
  //     if (!video) return;
  //     const currentFrame = Math.floor(video.currentTime * 30);
  //     setFrame(currentFrame);
  //   };

  //   const pauseFrameTracking = () => {
  //     frameLoopActive.current = false;
  //     syncFrameToCurrentTime();
  //   };
  //   const stopFrameTracking = () => {
  //     setFrame(0);
  //     frameLoopActive.current = false;
  //   };
  //   const endedFrameTracking = () => {
  //     frameLoopActive.current = false;
  //   };

  //   const handlePlay = () => startFrameTracking();
  //   const handlePause = () => pauseFrameTracking();
  //   const handleEnded = () => endedFrameTracking();
  //   const handleSeeked = () => {
  //     stopFrameTracking(); // 기존 루프 제거
  //     syncFrameToCurrentTime(); // ← currentTime 기반 frame 보정
  //     if (!videoRef.current?.paused) {
  //       startFrameTracking(); // 재생 중이면 루프 재시작
  //     }
  //   };

  //   video.addEventListener("play", handlePlay);
  //   video.addEventListener("pause", handlePause);
  //   video.addEventListener("ended", handleEnded);
  //   video.addEventListener("seeked", handleSeeked);
  //   video.addEventListener("loadedmetadata", handleSeeked);
  //   return () => {
  //     observer.disconnect();
  //     video.removeEventListener("play", handlePlay);
  //     video.removeEventListener("pause", handlePause);
  //     video.removeEventListener("ended", handleEnded);
  //     video.removeEventListener("seeked", handleSeeked);
  //     video.removeEventListener("loadedmetadata", handleSeeked);
  //   };
  // }, [measureJson, srcWidth, srcHeight]);

  // useEffect(() => {
    // if (!measureJson || videoRef.current === null) return;
    // if (measureJson[frame] === undefined) return;
    // if (measureJson[frame].pose_landmark === undefined) return;
    // const canvasWhite = canvasWhiteRef.current as HTMLCanvasElement;
    // const canvasRed = canvasRedRef.current as HTMLCanvasElement;

    // const contextWhite = canvasWhite.getContext(
    //   "2d",
    // ) as CanvasRenderingContext2D;
    // const contextRed = canvasRed.getContext("2d") as CanvasRenderingContext2D;

    // const drawCanvas = () => {
    //   clearAndDraw(contextWhite, canvasWhite, "#FFF", () => {
    //     contextWhite.beginPath();
    //     contextWhite.moveTo(
    //       measureJson[frame].pose_landmark[7].sx * scaleWidth,
    //       measureJson[frame].pose_landmark[7].sy * scaleHeight,
    //     );
    //     contextWhite.lineTo(
    //       measureJson[frame].pose_landmark[8].sx * scaleWidth,
    //       measureJson[frame].pose_landmark[8].sy * scaleHeight,
    //     );
    //     contextWhite.stroke();

    //     contextWhite.beginPath();
    //     contextWhite.moveTo(
    //       measureJson[frame].pose_landmark[16].sx * scaleWidth,
    //       measureJson[frame].pose_landmark[16].sy * scaleHeight,
    //     );
    //     contextWhite.lineTo(
    //       measureJson[frame].pose_landmark[18].sx * scaleWidth,
    //       measureJson[frame].pose_landmark[18].sy * scaleHeight,
    //     );
    //     contextWhite.stroke();

    //     contextWhite.beginPath();
    //     contextWhite.moveTo(
    //       measureJson[frame].pose_landmark[16].sx * scaleWidth,
    //       measureJson[frame].pose_landmark[16].sy * scaleHeight,
    //     );
    //     contextWhite.lineTo(
    //       measureJson[frame].pose_landmark[20].sx * scaleWidth,
    //       measureJson[frame].pose_landmark[20].sy * scaleHeight,
    //     );
    //     contextWhite.stroke();

    //     contextWhite.beginPath();
    //     contextWhite.moveTo(
    //       measureJson[frame].pose_landmark[16].sx * scaleWidth,
    //       measureJson[frame].pose_landmark[16].sy * scaleHeight,
    //     );
    //     contextWhite.lineTo(
    //       measureJson[frame].pose_landmark[22].sx * scaleWidth,
    //       measureJson[frame].pose_landmark[22].sy * scaleHeight,
    //     );
    //     contextWhite.stroke();

    //     contextWhite.beginPath();
    //     contextWhite.moveTo(
    //       measureJson[frame].pose_landmark[15].sx * scaleWidth,
    //       measureJson[frame].pose_landmark[15].sy * scaleHeight,
    //     );
    //     contextWhite.lineTo(
    //       measureJson[frame].pose_landmark[19].sx * scaleWidth,
    //       measureJson[frame].pose_landmark[19].sy * scaleHeight,
    //     );
    //     contextWhite.stroke();

    //     contextWhite.beginPath();
    //     contextWhite.moveTo(
    //       measureJson[frame].pose_landmark[15].sx * scaleWidth,
    //       measureJson[frame].pose_landmark[15].sy * scaleHeight,
    //     );
    //     contextWhite.lineTo(
    //       measureJson[frame].pose_landmark[21].sx * scaleWidth,
    //       measureJson[frame].pose_landmark[21].sy * scaleHeight,
    //     );
    //     contextWhite.stroke();

    //     contextWhite.beginPath();
    //     contextWhite.moveTo(
    //       measureJson[frame].pose_landmark[15].sx * scaleWidth,
    //       measureJson[frame].pose_landmark[15].sy * scaleHeight,
    //     );
    //     contextWhite.lineTo(
    //       measureJson[frame].pose_landmark[17].sx * scaleWidth,
    //       measureJson[frame].pose_landmark[17].sy * scaleHeight,
    //     );
    //     contextWhite.stroke();

    //     contextWhite.beginPath();
    //     contextWhite.moveTo(
    //       measureJson[frame].pose_landmark[11].sx * scaleWidth,
    //       measureJson[frame].pose_landmark[11].sy * scaleHeight,
    //     );
    //     contextWhite.lineTo(
    //       measureJson[frame].pose_landmark[23].sx * scaleWidth,
    //       measureJson[frame].pose_landmark[23].sy * scaleHeight,
    //     );
    //     contextWhite.lineTo(
    //       measureJson[frame].pose_landmark[24].sx * scaleWidth,
    //       measureJson[frame].pose_landmark[24].sy * scaleHeight,
    //     );
    //     contextWhite.lineTo(
    //       measureJson[frame].pose_landmark[12].sx * scaleWidth,
    //       measureJson[frame].pose_landmark[12].sy * scaleHeight,
    //     );
    //     contextWhite.lineTo(
    //       measureJson[frame].pose_landmark[11].sx * scaleWidth,
    //       measureJson[frame].pose_landmark[11].sy * scaleHeight,
    //     );
    //     contextWhite.stroke();

    //     contextWhite.beginPath();
    //     contextWhite.moveTo(
    //       measureJson[frame].pose_landmark[11].sx * scaleWidth,
    //       measureJson[frame].pose_landmark[11].sy * scaleHeight,
    //     );
    //     contextWhite.lineTo(
    //       measureJson[frame].pose_landmark[13].sx * scaleWidth,
    //       measureJson[frame].pose_landmark[13].sy * scaleHeight,
    //     );
    //     contextWhite.lineTo(
    //       measureJson[frame].pose_landmark[15].sx * scaleWidth,
    //       measureJson[frame].pose_landmark[15].sy * scaleHeight,
    //     );
    //     contextWhite.stroke();

    //     contextWhite.beginPath();
    //     contextWhite.moveTo(
    //       measureJson[frame].pose_landmark[12].sx * scaleWidth,
    //       measureJson[frame].pose_landmark[12].sy * scaleHeight,
    //     );
    //     contextWhite.lineTo(
    //       measureJson[frame].pose_landmark[14].sx * scaleWidth,
    //       measureJson[frame].pose_landmark[14].sy * scaleHeight,
    //     );
    //     contextWhite.lineTo(
    //       measureJson[frame].pose_landmark[16].sx * scaleWidth,
    //       measureJson[frame].pose_landmark[16].sy * scaleHeight,
    //     );
    //     contextWhite.stroke();

    //     contextWhite.beginPath();
    //     contextWhite.moveTo(
    //       measureJson[frame].pose_landmark[23].sx * scaleWidth,
    //       measureJson[frame].pose_landmark[23].sy * scaleHeight,
    //     );
    //     contextWhite.lineTo(
    //       measureJson[frame].pose_landmark[25].sx * scaleWidth,
    //       measureJson[frame].pose_landmark[25].sy * scaleHeight,
    //     );
    //     contextWhite.lineTo(
    //       measureJson[frame].pose_landmark[27].sx * scaleWidth,
    //       measureJson[frame].pose_landmark[27].sy * scaleHeight,
    //     );
    //     contextWhite.stroke();

    //     contextWhite.beginPath();
    //     contextWhite.moveTo(
    //       measureJson[frame].pose_landmark[31].sx * scaleWidth,
    //       measureJson[frame].pose_landmark[31].sy * scaleHeight,
    //     );
    //     contextWhite.lineTo(
    //       measureJson[frame].pose_landmark[27].sx * scaleWidth,
    //       measureJson[frame].pose_landmark[27].sy * scaleHeight,
    //     );
    //     contextWhite.stroke();

    //     contextWhite.beginPath();
    //     contextWhite.moveTo(
    //       measureJson[frame].pose_landmark[29].sx * scaleWidth,
    //       measureJson[frame].pose_landmark[29].sy * scaleHeight,
    //     );
    //     contextWhite.lineTo(
    //       measureJson[frame].pose_landmark[27].sx * scaleWidth,
    //       measureJson[frame].pose_landmark[27].sy * scaleHeight,
    //     );
    //     contextWhite.stroke();

    //     contextWhite.beginPath();
    //     contextWhite.moveTo(
    //       measureJson[frame].pose_landmark[24].sx * scaleWidth,
    //       measureJson[frame].pose_landmark[24].sy * scaleHeight,
    //     );
    //     contextWhite.lineTo(
    //       measureJson[frame].pose_landmark[26].sx * scaleWidth,
    //       measureJson[frame].pose_landmark[26].sy * scaleHeight,
    //     );
    //     contextWhite.lineTo(
    //       measureJson[frame].pose_landmark[28].sx * scaleWidth,
    //       measureJson[frame].pose_landmark[28].sy * scaleHeight,
    //     );
    //     contextWhite.stroke();

    //     contextWhite.beginPath();
    //     contextWhite.moveTo(
    //       measureJson[frame].pose_landmark[30].sx * scaleWidth,
    //       measureJson[frame].pose_landmark[30].sy * scaleHeight,
    //     );
    //     contextWhite.lineTo(
    //       measureJson[frame].pose_landmark[28].sx * scaleWidth,
    //       measureJson[frame].pose_landmark[28].sy * scaleHeight,
    //     );
    //     contextWhite.stroke();

    //     contextWhite.beginPath();
    //     contextWhite.moveTo(
    //       measureJson[frame].pose_landmark[28].sx * scaleWidth,
    //       measureJson[frame].pose_landmark[28].sy * scaleHeight,
    //     );
    //     contextWhite.lineTo(
    //       measureJson[frame].pose_landmark[32].sx * scaleWidth,
    //       measureJson[frame].pose_landmark[32].sy * scaleHeight,
    //     );
    //     contextWhite.stroke();
    //   });

    //   clearAndDraw(contextRed, canvasRed, "#FF0000", () => {
    //     contextRed.beginPath();
    //     contextRed.moveTo(
    //       measureJson[frame].pose_landmark[20].sx * scaleWidth,
    //       measureJson[frame].pose_landmark[20].sy * scaleHeight,
    //     );
    //     contextRed.lineTo(
    //       measureJson[frame].pose_landmark[19].sx * scaleWidth,
    //       measureJson[frame].pose_landmark[19].sy * scaleHeight,
    //     );
    //     contextRed.stroke();

    //     contextRed.beginPath();
    //     contextRed.moveTo(
    //       measureJson[frame].pose_landmark[23].sx * scaleWidth,
    //       measureJson[frame].pose_landmark[23].sy * scaleHeight,
    //     );
    //     contextRed.lineTo(
    //       measureJson[frame].pose_landmark[24].sx * scaleWidth,
    //       measureJson[frame].pose_landmark[24].sy * scaleHeight,
    //     );
    //     contextRed.stroke();

    //     contextRed.beginPath();
    //     contextRed.moveTo(
    //       measureJson[frame].pose_landmark[25].sx * scaleWidth,
    //       measureJson[frame].pose_landmark[25].sy * scaleHeight,
    //     );
    //     contextRed.lineTo(
    //       measureJson[frame].pose_landmark[26].sx * scaleWidth,
    //       measureJson[frame].pose_landmark[26].sy * scaleHeight,
    //     );
    //     contextRed.stroke();
    //   });
    // };

    // drawCanvas();
  // }, [measureJson, scaleWidth, scaleHeight, nowHeight, frame, clearAndDraw]);

  // if (!measureJson) return <div></div>;
  // if (isLoading) return <div>Loading...</div>;
  // if (isError) return <DataError />;
  if (seq7Loading) {
    return (
      <div className="col-span-12">
        <p>로딩중...</p>
      </div>
    );
  }
  if (seq7Error) {
    return (
      <div className="col-span-12">
        <p>오류가 발생했습니다</p>
      </div>
    );
  }


  return (
    <div className={`${className} flex flex-col gap-4 lg:gap-10`}>
      {/* 🎯 회전 대응 컨테이너 */}
      <div className="relative mx-auto w-full aspect-video overflow-hidden">
        {/* 🎥 Video */}
        <video
          ref={videoRef}
          muted
          playsInline
          webkit-playsinline="true"
          src={`https://gym.tangoplus.co.kr/data/Results/${data?.measure_server_file_name}`}
          className={`
            absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0
            ${cameraOrientation === 1 
              ? "-rotate-90 w-[75%] h-auto" 
              : "w-full h-full object-contain"
            }
          `}
        />

        {/* ⚪ White Skeleton Canvas */}
        {/* <canvas
          ref={canvasWhiteRef}
          width={nowWidth}
          height={nowHeight}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9] pointer-events-none"
        /> */}

        {/* 🔴 Red Highlight Canvas */}
        {/* <canvas
          ref={canvasRedRef}
          width={nowWidth}
          height={nowHeight}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9] pointer-events-none"
        /> */}
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="px-3 py-2 rounded-xl bg-sub100 hover:bg-sub300 transition"
          onClick={() => {
            const v = videoRef.current;
            if (!v) return;
            if (v.paused) v.play();
            else v.pause();
          }}
        >
          ▶❚❚
        </button>

        <input
          type="range"
          min={0}
          max={duration || 0}
          step={0.01}
          value={Math.min(currentTime, duration || 0)}
          className="flex-1 bg-sub100 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 
            [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full 
            [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:border-0
            [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 
            [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-500
            [&::-moz-range-thumb]:border-0"
          style={{
            background: `linear-gradient(to right, #7E7E7E 0%, #7E7E7E ${(currentTime / (duration || 1)) * 100}%, #F5F5F5 ${(currentTime / (duration || 1)) * 100}%, #F5F5F5 100%)`
          }}
          onMouseDown={() => {
            setIsSeeking(true);
            isSeekingRef.current = true; // ✅ ref도 업데이트
          }}
          onTouchStart={() => {
            setIsSeeking(true);
            isSeekingRef.current = true; // ✅ ref도 업데이트
          }}
          onChange={(e) => {
            setCurrentTime(Number(e.target.value));
          }}
          onMouseUp={(e) => {
            const v = videoRef.current;
            if (!v) return;
            v.currentTime = Number(e.currentTarget.value);
            setIsSeeking(false);
            isSeekingRef.current = false; // ✅ ref도 업데이트
          }}
          onTouchEnd={(e) => {
            const v = videoRef.current;
            if (!v) return;
            v.currentTime = Number(e.currentTarget.value);
            setIsSeeking(false);
            isSeekingRef.current = false; // ✅ ref도 업데이트
          }}
        />
      </div>
      {/* <div className="flex border border-sub300 rounded-3xl gap-4">
        <div className="flex-1 p-4">
          <MeasureIntroFooter2
            comment={
              ""
            }
            footFileName={mat_hip_down_image_name}
            hipFileName={mat_hip_trajectory_image_name}
            matOhs={ohsFourCorners}
          />
        </div>
        <div className="flex-1 p-4">
          <MeasureIntroFooter3
            comment={""}
            leftKneeFileName={mat_left_knee_trajectory_image_name}
            rightKneeFileName={mat_right_knee_trajectory_image_name}
          />
        </div>
      </div> */}
      <RawDataContainer mergedDetailData={measureDynamic?.detail_data ?? []} isCompare={0}/>
    </div>
  );

};

export default MeasureDetailDynamic;
