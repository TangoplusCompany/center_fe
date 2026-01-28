import React from "react";
import { useVideoPlayer } from "../hooks/useVideoPlayer";
import { PoseLandmarks, setupHiDPICanvas } from "../../DetailDynamic";
import { drawSkeleton, drawTrailSegment, midPoint } from "../utils/compareUtils";
import { IMeasureJson } from "@/types/measure";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  videoSrc: string | undefined;
  isRotated: boolean;
  isCompare: boolean;
  measureJson: IMeasureJson[] | undefined;
  isLoading: boolean;
  isError: boolean;
  onFrameChange?: (frame: number) => void;
  customCanvasTransform?: string; // 커스텀 canvas transform (선택적)
  videoClassName?: string; // 커스텀 video className (선택적)
  stageClassName?: string; // 커스텀 stage className (선택적)
  containerClassName?: string; // 커스텀 container className (선택적)
  children?: React.ReactNode; // 추가 컨텐츠 (예: DynamicDataContainer)
}
export const compareCropScale = 2.35; 
const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoSrc,
  isRotated,
  isCompare,
  measureJson,
  isLoading,
  isError,
  onFrameChange,
  customCanvasTransform,
  videoClassName,
  stageClassName,
  containerClassName,
  children,
}) => {
  const {
    stageRef,
    videoRef,
    canvasWhiteRef,
    canvasRedRef,
    canvasTrailRef,
    fit,
    canvasTransform,
    frame,
    duration,
    currentTime,
    setIsSeeking,
    setCurrentTime,
    isSeekingRef,
    trailPrevRef,
    toScreen,
  } = useVideoPlayer({
    videoSrc,
    isRotated,
    isCompare,
    measureJson,
    onFrameChange,
  });

  // Update canvas size when fit changes
  React.useEffect(() => {
    const cw = canvasWhiteRef.current;
    const cr = canvasRedRef.current;
    const ct = canvasTrailRef.current;
    if (!cw || !cr || !ct || fit.stageW === 0 || fit.stageH === 0) return;

    // Update canvas size when fit changes
    setupHiDPICanvas(cw, fit.stageW, fit.stageH);
    setupHiDPICanvas(cr, fit.stageW, fit.stageH);
    setupHiDPICanvas(ct, fit.stageW, fit.stageH);
  }, [fit.stageW, fit.stageH, fit.dpr, canvasWhiteRef, canvasRedRef, canvasTrailRef]);

  // Draw skeleton and trail
  React.useEffect(() => {
    if (!measureJson) return;

    const item = measureJson[frame];
    if (!item || !item.pose_landmark) return;

    const lm: PoseLandmarks = item.pose_landmark;

    const cw = canvasWhiteRef.current;
    const cr = canvasRedRef.current;
    const ct = canvasTrailRef.current;
    if (!cw || !cr || !ct || fit.stageW === 0 || fit.stageH === 0) return;

    const ctxW = cw.getContext("2d");
    const ctxR = cr.getContext("2d");
    const ctxT = ct.getContext("2d");
    if (!ctxW || !ctxR || !ctxT) return;

    // Trail
    ctxT.lineWidth = 1;
    ctxT.strokeStyle = "#00FF00";

    const p15 = toScreen(lm[15].sx, lm[15].sy);
    const p16 = toScreen(lm[16].sx, lm[16].sy);
    const mid = midPoint(lm[23], lm[24]);
    const pMid = toScreen(mid.sx, mid.sy);
    const p25 = toScreen(lm[25].sx, lm[25].sy);
    const p26 = toScreen(lm[26].sx, lm[26].sy);

    const prev = trailPrevRef.current;
    drawTrailSegment(ctxT, prev.p15, p15);
    drawTrailSegment(ctxT, prev.p16, p16);
    drawTrailSegment(ctxT, prev.pMid, pMid);
    drawTrailSegment(ctxT, prev.p25, p25);
    drawTrailSegment(ctxT, prev.p26, p26);

    trailPrevRef.current = { p15, p16, pMid, p25, p26 };

    // Clear
    ctxW.clearRect(0, 0, fit.stageW, fit.stageH);
    ctxR.clearRect(0, 0, fit.stageW, fit.stageH);

    // Draw skeleton
    drawSkeleton(ctxW, ctxR, lm, toScreen);
  }, [measureJson, frame, fit, toScreen, canvasWhiteRef, canvasRedRef, canvasTrailRef, trailPrevRef]);

  const handlePlayPause = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  };

  const handleSeekStart = () => {
    setIsSeeking(true);
    isSeekingRef.current = true;
  };

  const handleSeekEnd = (value: number) => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = value;
    setIsSeeking(false);
    isSeekingRef.current = false;
  };

  const finalCanvasTransform = customCanvasTransform ?? canvasTransform;
  const isCompareCrop = isCompare && !isRotated;
  // 기본 video className과 커스텀 className 병합 (cn 사용으로 tailwind 충돌 방지)
  const defaultVideoBaseClasses = isRotated 
    ? "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0" 
    : isCompareCrop
      ? "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 h-full w-auto scale-[2.35]" // 좌우 crop을 위한 확대
      : "w-full h-full";
  const defaultVideoRotatedClasses = isRotated 
    ? "-rotate-90 h-full w-auto scale-[1.75]" 
    : "w-full h-full";
  const finalVideoClassName = cn(
    defaultVideoBaseClasses,
    videoClassName ?? defaultVideoRotatedClasses
  );
  
  // 기본 stage className과 커스텀 className 병합
  const defaultStageClasses = "relative mx-auto w-full h-[480px] md:h-[560px] lg:h-[680px] overflow-hidden";
  const finalStageClassName = cn(defaultStageClasses, stageClassName);
  
  // 기본 container className과 커스텀 className 병합
  const defaultContainerClasses = "flex flex-col justify-between gap-2 lg:gap-4";
  const finalContainerClassName = cn(defaultContainerClasses, containerClassName);

  
  return (
    <div className={finalContainerClassName}>
      <div
        ref={stageRef}
        className={finalStageClassName}
      >
        <video
          ref={videoRef}
          muted
          playsInline
          webkit-playsinline="true"
          src={videoSrc ? `https://gym.tangoplus.co.kr/data/Results/${videoSrc}` : undefined}
          className={finalVideoClassName}
        />

        <canvas
          ref={canvasTrailRef}
          className="absolute inset-0 z-[9] origin-center pointer-events-none"
          style={{ transform: finalCanvasTransform }}
          // style={isRotated ? { transform: finalCanvasTransform } : {}}
        />
        <canvas
          ref={canvasWhiteRef}
          className="absolute inset-0 z-[9] origin-center pointer-events-none"
          style={{ transform: finalCanvasTransform }}
        />
        <canvas
          ref={canvasRedRef}
          className="absolute inset-0 z-[10] origin-center pointer-events-none"
          style={{ transform: finalCanvasTransform }}
        />

        {isLoading && (
          <div className="absolute inset-0 z-[50] flex items-center justify-center bg-black/20">
            <p className="text-white">로딩중...</p>
          </div>
        )}

        {isError && (
          <div className="absolute inset-0 z-[50] flex items-center justify-center bg-black/20">
            <p className="text-white">오류가 발생했습니다</p>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="px-3 py-2 rounded-xl bg-sub100 hover:bg-sub300 transition"
          onClick={handlePlayPause}
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
            background: `linear-gradient(to right, #7E7E7E 0%, #7E7E7E ${(currentTime / (duration || 1)) * 100}%, #F5F5F5 ${(currentTime / (duration || 1)) * 100}%, #F5F5F5 100%)`,
          }}
          onMouseDown={handleSeekStart}
          onTouchStart={handleSeekStart}
          onChange={(e) => {
            setCurrentTime(Number(e.target.value));
          }}
          onMouseUp={(e) => {
            handleSeekEnd(Number(e.currentTarget.value));
          }}
          onTouchEnd={(e) => {
            handleSeekEnd(Number(e.currentTarget.value));
          }}
        />
      </div>
      {children}
    </div>
  );
};

export default VideoPlayer;
