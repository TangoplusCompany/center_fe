"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import DynamicDataContainer from "./Dynamic/DataContainer";
import { useMeasureSequence } from "@/hooks/api/measure/useMeasureSequence";
import { IUserMeasureDynamicFileData } from "@/types/measure";
import { useMeasureDynamicJson } from "@/hooks/api/measure/useMeasureDynamicJson";

type Fit = {
  stageW: number;
  stageH: number;
  scale: number;
  offsetX: number;
  offsetY: number;
  dpr: number;
};
type PoseLandmark = {
  sx: number;
  sy: number;
};

type PoseLandmarks = PoseLandmark[];
const DATA_W = 720;   // landmark 좌표계 기준 width
const DATA_H = 1280;  // landmark 좌표계 기준 height

function computeContain(stageW: number, stageH: number, dataW: number, dataH: number) {
  const scale = Math.min(stageW / dataW, stageH / dataH);
  const visualW = dataW * scale;
  const visualH = dataH * scale;
  const offsetX = (stageW - visualW) / 2;
  const offsetY = (stageH - visualH) / 2;
  return { stageW, stageH, scale, offsetX, offsetY };
}

function setupHiDPICanvas(canvas: HTMLCanvasElement, cssW: number, cssH: number) {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.round(cssW * dpr);
  canvas.height = Math.round(cssH * dpr);
  canvas.style.width = `${cssW}px`;
  canvas.style.height = `${cssH}px`;

  const ctx = canvas.getContext("2d");
  if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  return { ctx, dpr };
}


const MeasureDetailDynamic = ({
  className,
  sns,
  cameraOrientation,
  isCompare,
}: {
  className?: string;
  sns: { measureSn: string; userSn: string };
  cameraOrientation: number;
  isCompare: 0 | 1;
}) => {
  const { data: measureDynamic, isLoading: seq7Loading, isError: seq7Error } =
    useMeasureSequence(sns.measureSn, sns.userSn, 6);

  const data = measureDynamic?.file_data;
  const fileData = measureDynamic?.file_data as IUserMeasureDynamicFileData;

  const { data: measureJson, isLoading, isError } = useMeasureDynamicJson(
    data?.measure_server_json_name
  );

  const isRotated = cameraOrientation === 1;

  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasWhiteRef = useRef<HTMLCanvasElement | null>(null);
  const canvasRedRef = useRef<HTMLCanvasElement | null>(null);
  const canvasTrailRef = useRef<HTMLCanvasElement | null>(null);

  const [fit, setFit] = useState<Fit>({
    stageW: 0,
    stageH: 0,
    scale: 1,
    offsetX: 0,
    offsetY: 0,
    dpr: 1,
  });

  const [frame, setFrame] = useState(0);
  const frameLoopActive = useRef(false);

  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [, setIsSeeking] = useState(false);
  const isSeekingRef = useRef(false);

  const trailPrevRef = useRef<{
    p15?: { x:number; y:number };
    p16?: { x:number; y:number };
    pMid?: { x:number; y:number };
    p25?: { x:number; y:number };
    p26?: { x:number; y:number };
  }>({});
  const midPoint = (a: { sx:number; sy:number }, b: { sx:number; sy:number }) => ({
    sx: (a.sx + b.sx) / 2,
    sy: (a.sy + b.sy) / 2,
  });
  const drawTrailSegment = (
    ctx: CanvasRenderingContext2D,
    prev: { x:number; y:number } | undefined,
    curr: { x:number; y:number },
  ) => {
    if (!prev) return;
    ctx.beginPath();
    ctx.moveTo(prev.x, prev.y);
    ctx.lineTo(curr.x, curr.y);
    ctx.stroke();
  };

  /**
   * ✅ 1) stage 기준으로 크기 측정 + fit(scale/offset) 계산 + canvas DPR 세팅
   * - ResizeObserver는 video가 아니라 stageRef에 붙입니다.
   */
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const update = () => {
      const rect = stage.getBoundingClientRect();
      const base = computeContain(rect.width, rect.height, DATA_W, DATA_H);

      // 캔버스 DPI 세팅
      const cw = canvasWhiteRef.current;
      const cr = canvasRedRef.current;
      const ct = canvasTrailRef.current;
      let dpr = 1;
      if (cw) dpr = setupHiDPICanvas(cw, rect.width, rect.height).dpr;
      if (cr) setupHiDPICanvas(cr, rect.width, rect.height);
      if (ct) setupHiDPICanvas(ct, rect.width, rect.height);
      setFit({ ...base, dpr });
    };

    const ro = new ResizeObserver(() => update());
    ro.observe(stage);

    update();
    return () => ro.disconnect();
  }, []);

  /**
   * ✅ 2) frame tracking: requestVideoFrameCallback 기반
   * - 이벤트 등록은 measureJson이 아니라 video에만 의존하게 분리
   */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const sync = () => setFrame(Math.floor(v.currentTime * 30));

    const start = () => {
      if (!("requestVideoFrameCallback" in v)) return;
      sync();
      frameLoopActive.current = true;

      const loop = () => {
        if (!frameLoopActive.current) return;
        setFrame(Math.floor(v.currentTime * 30));
        v.requestVideoFrameCallback(loop);
      };
      v.requestVideoFrameCallback(loop);
    };

    const pause = () => {
      frameLoopActive.current = false;
      sync();
    };

    const ended = () => {
      frameLoopActive.current = false;
      sync();
    };

    const seeked = () => {
      frameLoopActive.current = false;
      sync();
      if (!v.paused) start();
    };

    v.addEventListener("play", start);
    v.addEventListener("pause", pause);
    v.addEventListener("ended", ended);
    v.addEventListener("seeked", seeked);
    v.addEventListener("loadedmetadata", seeked);

    return () => {
      v.removeEventListener("play", start);
      v.removeEventListener("pause", pause);
      v.removeEventListener("ended", ended);
      v.removeEventListener("seeked", seeked);
      v.removeEventListener("loadedmetadata", seeked);
    };
  }, []);

  /**
   * ✅ 3) duration/currentTime 동기화
   */
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !data) return;

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
  }, [data]);

  /**
   * ✅ 4) draw: toScreen()으로 일괄 변환 (offset/scale 누락 방지)
   */
  const toScreen = useMemo(() => {
    return (sx: number, sy: number) => ({
      x: sx * fit.scale + fit.offsetX,
      y: sy * fit.scale + fit.offsetY,
    });
  }, [fit]);

  const drawLine = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      lm: PoseLandmarks,
      a: number,
      b: number,
      extendAx: number = 0,
      extendAy: number = 0,
      extendBx: number = 0,
      extendBy: number = 0
    ) => {
      const A = lm[a];
      const B = lm[b];
      if (!A || !B) return;

      const p1 = toScreen(A.sx + extendAx, A.sy + extendAy);
      const p2 = toScreen(B.sx + extendBx, B.sy + extendBy);

      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    },
    [toScreen] // ✅ drawLine은 toScreen에만 의존
  );

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const update = () => {
      const rect = stage.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return; // ✅ 0이면 스킵
      const base = computeContain(rect.width, rect.height, DATA_W, DATA_H);

      const cw = canvasWhiteRef.current;
      const cr = canvasRedRef.current;

      let dpr = 1;
      if (cw) dpr = setupHiDPICanvas(cw, rect.width, rect.height).dpr;
      if (cr) setupHiDPICanvas(cr, rect.width, rect.height);
      setFit({ ...base, dpr });
    };

    const ro = new ResizeObserver(update);
    ro.observe(stage);
    update();

    return () => ro.disconnect();
  }, [isRotated]);

  useEffect(() => {
    if (!measureJson) return;
    const item = measureJson[frame];
    const lm = item.pose_landmark;
    if (!item?.pose_landmark) return;

    const cw = canvasWhiteRef.current;
    const cr = canvasRedRef.current;
    const ct = canvasTrailRef.current;
    if (!cw || !cr || !ct) return;


    const ctxW = cw.getContext("2d");
    const ctxR = cr.getContext("2d");
    const ctxT = ct.getContext("2d");
    if (!ctxW || !ctxR || !ctxT) return;

    // trajectory
    ctxT.lineWidth = 2;
    ctxT.strokeStyle = "#00ffea"; // 원하는 색/투명도

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


    // clear
    ctxW.clearRect(0, 0, fit.stageW, fit.stageH);
    ctxR.clearRect(0, 0, fit.stageW, fit.stageH);

    // white
    ctxW.strokeStyle = "#FFF";
    ctxW.lineWidth = 1;

    // ✅ 여기부터는 “좌표 변환 누락 없이” 라인만 정의하면 됨
    drawLine(ctxW, lm, 7, 8);

    drawLine(ctxW, lm, 16, 18);
    drawLine(ctxW, lm, 16, 20);
    drawLine(ctxW, lm, 16, 22);

    drawLine(ctxW, lm, 15, 19);
    drawLine(ctxW, lm, 15, 21);
    drawLine(ctxW, lm, 15, 17);

    // torso/hip box
    drawLine(ctxW, lm, 11, 23);
    drawLine(ctxW, lm, 23, 24);
    drawLine(ctxW, lm, 24, 12);
    drawLine(ctxW, lm, 12, 11);

    // arms
    drawLine(ctxW, lm, 11, 13);
    drawLine(ctxW, lm, 13, 15);

    drawLine(ctxW, lm, 12, 14);
    drawLine(ctxW, lm, 14, 16);

    // legs
    drawLine(ctxW, lm, 23, 25);
    drawLine(ctxW, lm, 25, 27);
    drawLine(ctxW, lm, 27, 31);
    drawLine(ctxW, lm, 27, 29);

    drawLine(ctxW, lm, 24, 26);
    drawLine(ctxW, lm, 26, 28);
    drawLine(ctxW, lm, 28, 30);
    drawLine(ctxW, lm, 28, 32);

    // red
    ctxR.strokeStyle = "#FF0000";
    ctxR.lineWidth = 1;

    drawLine(ctxR, lm, 20, 19, -100, 0, 100 ,0);
    drawLine(ctxR, lm, 23, 24);
    drawLine(ctxR, lm, 25, 26);

    
  }, [measureJson, frame, fit, toScreen, drawLine]);

  return (
    <div className={`${className} flex flex-col gap-4 lg:gap-10`}>
      {/* stage: scale/offset 계산 기준 */}
      <div ref={stageRef} className="relative mx-auto w-full aspect-video overflow-hidden">
        {/* Video (시각적으로만 회전) */}
        <video
          ref={videoRef}
          muted
          playsInline
          webkit-playsinline="true"
          src={`https://gym.tangoplus.co.kr/data/Results/${data?.measure_server_file_name}`}
          className={`
            absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0
            ${isRotated ? "-rotate-90 w-[75%] h-full object-contain" : "w-full h-full"}
          `}
        />

        {/* Canvas overlay (회전 금지, stage에 딱 맞춤) */}
        <canvas
          ref={canvasTrailRef}
          className="absolute inset-0 z-[9] origin-center pointer-events-none"
          style={{ transform: "scaleX(-1.3) scaleY(1.35)" }}
        />
        <canvas
          ref={canvasWhiteRef}
          className="absolute inset-0 z-[9] origin-center pointer-events-none"
          style={{ transform: "scaleX(-1.3) scaleY(1.35)" }}
        />

        <canvas
          ref={canvasRedRef}
          className="absolute inset-0 z-[10] origin-center pointer-events-none"
          style={{ transform: "scaleX(-1.3) scaleY(1.35)" }}
        />

        {(seq7Loading || isLoading) && (
          <div className="absolute inset-0 z-[50] flex items-center justify-center bg-black/20">
            <p className="text-white">로딩중...</p>
          </div>
        )}

        {(seq7Error || isError) && (
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
            background: `linear-gradient(to right, #7E7E7E 0%, #7E7E7E ${(currentTime / (duration || 1)) * 100}%, #F5F5F5 ${(currentTime / (duration || 1)) * 100}%, #F5F5F5 100%)`,
          }}
          onMouseDown={() => {
            setIsSeeking(true);
            isSeekingRef.current = true;
          }}
          onTouchStart={() => {
            setIsSeeking(true);
            isSeekingRef.current = true;
          }}
          onChange={(e) => {
            setCurrentTime(Number(e.target.value));
          }}
          onMouseUp={(e) => {
            const v = videoRef.current;
            if (!v) return;
            v.currentTime = Number(e.currentTarget.value);
            setIsSeeking(false);
            isSeekingRef.current = false;
          }}
          onTouchEnd={(e) => {
            const v = videoRef.current;
            if (!v) return;
            v.currentTime = Number(e.currentTarget.value);
            setIsSeeking(false);
            isSeekingRef.current = false;
          }}
        />
      </div>
      {!seq7Loading && !isLoading && !seq7Error && !isError && measureJson && (
        <>
          <DynamicDataContainer
          fileData={fileData}
          detailData={measureDynamic?.detail_data ?? []}
          isCompare={isCompare}
        />
        </>
      )}
    </div>
  );
};

export default MeasureDetailDynamic;
