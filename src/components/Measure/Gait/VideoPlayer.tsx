'use client';

import { Skeleton } from "@/components/ui/skeleton";
import { IGaitMeasureJson } from "@/types/measure";
import React, { useRef, useState, useEffect } from "react";
import { midPoint2D } from "../Compare/utils/compareUtils";
import { drawSkeleton } from "../Compare/utils/DrawSkeleton";

interface VideoPlayerProps {
  videoSrc?: string;
  measureJson?: IGaitMeasureJson[] | undefined;
  isLoading?: boolean;
  isError?: boolean;
  cropScale?: number;
  fps?: number; // 기본값 30fps
  romType?: number;
}

export default function VideoPlayer({
  videoSrc,
  measureJson,
  isLoading = false,
  isError = false,
  cropScale = 1.0,
  fps = 30,
  romType,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasWhiteRef = useRef<HTMLCanvasElement>(null);
  const canvasRedRef = useRef<HTMLCanvasElement>(null);

  const [frame, setFrame] = useState(0);
  const [fit, setFit] = useState({ stageW: 0, stageH: 0 });

  const trailPrevRef = useRef<{
    p15?: { x: number; y: number };
    p16?: { x: number; y: number };
    pMid?: { x: number; y: number };
    p25?: { x: number; y: number };
    p26?: { x: number; y: number };
  }>({});

  // 1. 비디오 시간 변경 시 현재 프레임 계산
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const currentFrame = Math.floor(videoRef.current.currentTime * fps);
    setFrame(currentFrame);
  };

  // 2. 캔버스 해상도를 컨테이너 크기에 맞춤
  useEffect(() => {
    const updateSize = () => {
      if (!videoRef.current) return;
      const { clientWidth, clientHeight } = videoRef.current;
      setFit({ stageW: clientWidth, stageH: clientHeight });

      [canvasWhiteRef, canvasRedRef].forEach((ref) => {
        if (ref.current) {
          ref.current.width = clientWidth;
          ref.current.height = clientHeight;
        }
      });
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [isLoading, videoSrc]);

  // 3. 랜드마크 그려주는 Effect
  useEffect(() => {
    if (!measureJson) return;

    const item = measureJson[frame];
    if (!item || !item.screen_landmarks) return;

    const lm = item.screen_landmarks;
    const cw = canvasWhiteRef.current;
    const cr = canvasRedRef.current;

    if (!cw || !cr || fit.stageW === 0 || fit.stageH === 0) return;

    // 💡 스케일링 없이 원데이터 절대 좌표(x, y) 그대로 사용
    const toScreen = (sx: number, sy: number) => {
      const baseScale = fit.stageH / 720;

      // 1) object-cover 기준 좌표 (크롭 반영, 줌 반영 전)
      const xCovered = sx * baseScale - (1280 * baseScale - fit.stageW) / 2;
      const yCovered = sy * baseScale;

      // 2) 중심 기준으로 cropScale 만큼 추가 확대
      const x = fit.stageW / 2 + (xCovered - fit.stageW / 2) * cropScale;
      const y = fit.stageH / 2 + (yCovered - fit.stageH / 2) * cropScale;
      console.log(`${cropScale} ${baseScale} ${fit.stageW} ${fit.stageH}`)
      return { x, y };
    };
    
    const ctxW = cw.getContext("2d");
    const ctxR = cr.getContext("2d");
    if (!ctxW || !ctxR) return;

    const p15 = { x: lm[15].x, y: lm[15].y };
    const p16 = { x: lm[16].x, y: lm[16].y };
    const mid = midPoint2D(lm[23], lm[24]);
    const pMid = { x: mid.x, y: mid.y };
    const p25 = { x: lm[25].x, y: lm[25].y };
    const p26 = { x: lm[26].x, y: lm[26].y };


    trailPrevRef.current = { p15, p16, pMid, p25, p26 };

    // Clear
    ctxW.clearRect(0, 0, fit.stageW, fit.stageH);
    ctxR.clearRect(0, 0, fit.stageW, fit.stageH);

    // Draw skeleton
    drawSkeleton(ctxW, ctxR, lm, toScreen);
  }, [measureJson, frame, fit, romType, cropScale]);

  // custom Player를 위한 
  const [, setIsSeeking] = useState(false);
  const isSeekingRef = useRef(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
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
useEffect(() => {
    const v = videoRef.current;
    if (!v || !videoSrc) return;

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

    if (v.readyState >= 1) onLoadedMetadata();

    return () => {
      v.removeEventListener("loadedmetadata", onLoadedMetadata);
      v.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [videoSrc]);
  if (isLoading) {
    return (
      <div className="w-full aspect-[3/4] mx-auto rounded-xl overflow-hidden">
        <Skeleton className="w-full h-full" />
      </div>
    );
  }

  if (isError || !videoSrc) {
    return (
      <div className="w-full aspect-[3/4] mx-auto rounded-xl bg-gray-100 flex flex-col items-center justify-center text-gray-400 gap-2 border border-sub200">
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        <span className="text-sm font-medium">영상을 불러올 수 없습니다.</span>
      </div>
    );
  }
    return (
    <div className="relative w-full aspect-[3/4] overflow-hidden flex flex-col items-center justify-center">
      {/* video + canvas wrapper: 좌우반전 적용 */}
      <div className="relative w-full flex-1" >
        <video
          ref={videoRef}
          src={videoSrc ? `https://gym.tangoplus.co.kr/data/Results/${videoSrc}` : undefined}
          controlsList="nodownload"
          playsInline
          onTimeUpdate={handleTimeUpdate}
          className="w-full h-full object-cover transition-transform duration-200 z-0"
          style={{
            transform: `scaleX(-1) scale(${cropScale})`,
            transformOrigin: "center center",
          }}
        />
        <canvas ref={canvasWhiteRef} className="absolute inset-0 w-full h-full pointer-events-none z-20" />
        <canvas ref={canvasRedRef} className="absolute inset-0 w-full h-full pointer-events-none z-30" />
      </div>

      {/* 커스텀 컨트롤바: 반전 영향 없음 */}
      <div className="flex items-center gap-3 w-full px-1 py-2 z-40">
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
          className="flex-1 bg-sub700"
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
    </div>
  );
}