import { useMeasureSequence } from "@/hooks/api/measure/useMeasureSequence";
import { CompareSlot } from "@/types/compare";
// import { IUserMeasureInfoResponse } from "@/types/measure";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import CompareDefault from "./CompareDefault";
import RawDataContainer from "../RawDataContainer";
import { useMeasureDynamicJson } from "@/hooks/api/measure/useMeasureDynamicJson";
import { computeContain, Fit, PoseLandmarks, setupHiDPICanvas } from "../DetailDynamic";

const DATA_W = 720;   // landmark 좌표계 기준 width
const DATA_H = 1280;  // landmark 좌표계 기준 height

const MeasureDynamicCompare = ({
  className,
  sns,
  // measureInfos,
  cameraOrientations,
  measure_dates,
  onCompareDialogOpen,
}: {
  className? : string;
  sns: {
    measureSn0?: string;
    measureSn1?: string;
    userSn: string;
  };
  
  cameraOrientations: {
    orient0 :0 | 1;
    orient1 : 0 | 1;
  };
  measure_dates: {
    measure_date0: string;
    measure_date1: string;
  }
  onCompareDialogOpen? : (slot: CompareSlot) => void;
}) => {
  const {
    data: measure0,
    isLoading: seqLoading0,
    isError: seqError0,
  } = useMeasureSequence(
    sns.measureSn0,
    sns.userSn,
    6
  );

  const {
    data: measure1,
    isLoading: seqLoading1,
    isError: seqError1,
  } = useMeasureSequence(
    sns.measureSn1,
    sns.userSn,
    6
  );
  const data0 = measure0?.file_data
  const data1 = measure1?.file_data
  const { data: measureJson0, isLoading: jsonLoading0, isError: jsonError0 } = useMeasureDynamicJson(
    data0?.measure_server_json_name
  );
  const { data: measureJson1, isLoading: jsonLoading1, isError: jsonError1 } = useMeasureDynamicJson(
    data1?.measure_server_json_name
  );
  const isRotated0 = cameraOrientations.orient0 === 1;
  const isRotated1 = cameraOrientations.orient1 === 1;

  const stageRef0 = useRef<HTMLDivElement>(null);
  const videoRef0 = useRef<HTMLVideoElement>(null);
  const canvasWhiteRef0 = useRef<HTMLCanvasElement | null>(null);
  const canvasRedRef0 = useRef<HTMLCanvasElement | null>(null);
  const canvasTrailRef0 = useRef<HTMLCanvasElement | null>(null);

  const stageRef1 = useRef<HTMLDivElement>(null);
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const canvasWhiteRef1 = useRef<HTMLCanvasElement | null>(null);
  const canvasRedRef1 = useRef<HTMLCanvasElement | null>(null);
  const canvasTrailRef1 = useRef<HTMLCanvasElement | null>(null);

  const VIDEO_SCALE = 1.75; // 지금 고정으로 쓰는 값

  const [canvasTransform0, setCanvasTransform0] = useState<string>(
    `scaleX(${-VIDEO_SCALE}) scaleY(${VIDEO_SCALE})`
  );
  const [canvasTransform1, setCanvasTransform1] = useState<string>(
    `scaleX(${-VIDEO_SCALE}) scaleY(${VIDEO_SCALE})`
  );
  const [fit0, setFit0] = useState<Fit>({
    stageW: 0,
    stageH: 0,
    scale: 1,
    offsetX: 0,
    offsetY: 0,
    dpr: 1,
  });
  const [fit1, setFit1] = useState<Fit>({
    stageW: 0,
    stageH: 0,
    scale: 1,
    offsetX: 0,
    offsetY: 0,
    dpr: 1,
  });

  const [frame0, setFrame0] = useState(0);
  const frameLoopActive0 = useRef(false);
  const [frame1, setFrame1] = useState(0);
  const frameLoopActive1 = useRef(false);

  const [duration0, setDuration0] = useState(0);
  const [currentTime0, setCurrentTime0] = useState(0);
  const [, setIsSeeking0] = useState(false);
  const isSeekingRef0 = useRef(false);

  const [duration1, setDuration1] = useState(0);
  const [currentTime1, setCurrentTime1] = useState(0);
  const [, setIsSeeking1] = useState(false);
  const isSeekingRef1 = useRef(false);

  const trailPrevRef0 = useRef<{
    p15?: { x:number; y:number };
    p16?: { x:number; y:number };
    pMid?: { x:number; y:number };
    p25?: { x:number; y:number };
    p26?: { x:number; y:number };
  }>({});

  const trailPrevRef1 = useRef<{
    p15?: { x:number; y:number };
    p16?: { x:number; y:number };
    pMid?: { x:number; y:number };
    p25?: { x:number; y:number };
    p26?: { x:number; y:number };
  }>({});

  const midPoint0 = (a: { sx:number; sy:number }, b: { sx:number; sy:number }) => ({
    sx: (a.sx + b.sx) / 2,
    sy: (a.sy + b.sy) / 2,
  });
  const midPoint1 = (a: { sx:number; sy:number }, b: { sx:number; sy:number }) => ({
    sx: (a.sx + b.sx) / 2,
    sy: (a.sy + b.sy) / 2,
  });

  const drawTrailSegment0 = (
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
  const drawTrailSegment1 = (
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

  const clearTrail0 = useCallback(() => {
    const ct = canvasTrailRef0.current;
    if (!ct) return;
    const ctxT = ct.getContext("2d");
    if (!ctxT) return;

    ctxT.clearRect(0, 0, fit0.stageW, fit0.stageH);
    trailPrevRef0.current = {}; // 이전 점도 초기화
  }, [fit0.stageW, fit0.stageH]);
  const clearTrail1 = useCallback(() => {
    const ct = canvasTrailRef1.current;
    if (!ct) return;
    const ctxT = ct.getContext("2d");
    if (!ctxT) return;

    ctxT.clearRect(0, 0, fit1.stageW, fit1.stageH);
    trailPrevRef1.current = {}; // 이전 점도 초기화
  }, [fit1.stageW, fit1.stageH]);

  const isNearStart0 = (v: HTMLVideoElement, eps = 0.05) => v.currentTime <= eps;
  const isNearEnd0 = (v: HTMLVideoElement, eps = 0.08) => v.duration > 0 && v.currentTime >= v.duration - eps;
  const isNearStart1 = (v: HTMLVideoElement, eps = 0.05) => v.currentTime <= eps;
  const isNearEnd1 = (v: HTMLVideoElement, eps = 0.08) => v.duration > 0 && v.currentTime >= v.duration - eps;
  
  useEffect(() => {
    const stage = stageRef0.current;
    if (!stage) return;

    const update = () => {
      const rect = stage.getBoundingClientRect();
      const base = computeContain(rect.width, rect.height, DATA_W, DATA_H);

      // 캔버스 DPI 세팅
      const cw = canvasWhiteRef0.current;
      const cr = canvasRedRef0.current;
      const ct = canvasTrailRef0.current;
      let dpr = 1;
      if (cw) dpr = setupHiDPICanvas(cw, rect.width, rect.height).dpr;
      if (cr) setupHiDPICanvas(cr, rect.width, rect.height);
      if (ct) setupHiDPICanvas(ct, rect.width, rect.height);
      setFit0({ ...base, dpr });
    };

    const ro = new ResizeObserver(() => update());
    ro.observe(stage);

    update();
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const stage = stageRef1.current;
    if (!stage) return;

    const update = () => {
      const rect = stage.getBoundingClientRect();
      const base = computeContain(rect.width, rect.height, DATA_W, DATA_H);

      // 캔버스 DPI 세팅
      const cw = canvasWhiteRef1.current;
      const cr = canvasRedRef1.current;
      const ct = canvasTrailRef1.current;
      let dpr = 1;
      if (cw) dpr = setupHiDPICanvas(cw, rect.width, rect.height).dpr;
      if (cr) setupHiDPICanvas(cr, rect.width, rect.height);
      if (ct) setupHiDPICanvas(ct, rect.width, rect.height);
      setFit1({ ...base, dpr });
    };

    const ro = new ResizeObserver(() => update());
    ro.observe(stage);

    update();
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const v = videoRef0.current;
    if (!v) return;

    const sync = () => setFrame0(Math.floor(v.currentTime * 30));

    const start = () => {
      if (isNearStart0(v) || isNearEnd0(v)) {
        clearTrail0();
      }
      if (isNearEnd0(v)) v.currentTime = 0;
      if (!("requestVideoFrameCallback" in v)) return;
      sync();
      frameLoopActive0.current = true;

      const loop = () => {
        if (!frameLoopActive0.current) return;
        setFrame0(Math.floor(v.currentTime * 30));
        v.requestVideoFrameCallback(loop);
      };
      v.requestVideoFrameCallback(loop);
    };

    const pause = () => {
      frameLoopActive0.current = false;
      sync();
    };

    const ended = () => {
      frameLoopActive0.current = false;
      sync();
    };

    const seeked = () => {
      frameLoopActive0.current = false;
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
  }, [clearTrail0]);

  useEffect(() => {
    const v = videoRef1.current;
    if (!v) return;

    const sync = () => setFrame1(Math.floor(v.currentTime * 30));

    const start = () => {
      if (isNearStart1(v) || isNearEnd1(v)) {
        clearTrail1();
      }
      if (isNearEnd1(v)) v.currentTime = 0;
      if (!("requestVideoFrameCallback" in v)) return;
      sync();
      frameLoopActive1.current = true;

      const loop = () => {
        if (!frameLoopActive1.current) return;
        setFrame1(Math.floor(v.currentTime * 30));
        v.requestVideoFrameCallback(loop);
      };
      v.requestVideoFrameCallback(loop);
    };

    const pause = () => {
      frameLoopActive1.current = false;
      sync();
    };

    const ended = () => {
      frameLoopActive1.current = false;
      sync();
    };

    const seeked = () => {
      frameLoopActive1.current = false;
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
  }, [clearTrail1]);

  useEffect(() => {
    const v = videoRef0.current;
    if (!v || !data0) return;

    const onLoadedMetadata = () => {
      setDuration0(v.duration || 0);
      setCurrentTime0(v.currentTime || 0);
    };

    const onTimeUpdate = () => {
      if (!isSeekingRef0.current) {
        setCurrentTime0(v.currentTime || 0);
      }
    };

    v.addEventListener("loadedmetadata", onLoadedMetadata);
    v.addEventListener("timeupdate", onTimeUpdate);

    if (v.readyState >= 1) onLoadedMetadata();

    return () => {
      v.removeEventListener("loadedmetadata", onLoadedMetadata);
      v.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [data0]);

    useEffect(() => {
      const v = videoRef1.current;
      if (!v || !data1) return;

      const onLoadedMetadata = () => {
        setDuration1(v.duration || 0);
        setCurrentTime1(v.currentTime || 0);
      };

      const onTimeUpdate = () => {
        if (!isSeekingRef1.current) {
          setCurrentTime1(v.currentTime || 0);
        }
      };

      v.addEventListener("loadedmetadata", onLoadedMetadata);
      v.addEventListener("timeupdate", onTimeUpdate);

      if (v.readyState >= 1) onLoadedMetadata();

      return () => {
        v.removeEventListener("loadedmetadata", onLoadedMetadata);
        v.removeEventListener("timeupdate", onTimeUpdate);
      };
    }, [data1]);

  const toScreen0 = useMemo(() => {
    return (sx: number, sy: number) => ({
      x: sx * fit0.scale + fit0.offsetX,
      y: sy * fit0.scale + fit0.offsetY,
    });
  }, [fit0]);

  const toScreen1 = useMemo(() => {
    return (sx: number, sy: number) => ({
      x: sx * fit1.scale + fit1.offsetX,
      y: sy * fit1.scale + fit1.offsetY,
    });
  }, [fit1]);

  const drawLine0 = useCallback(
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

      const p1 = toScreen0(A.sx + extendAx, A.sy + extendAy);
      const p2 = toScreen0(B.sx + extendBx, B.sy + extendBy);

      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    },
    [toScreen0] 
  );
  const drawLine1 = useCallback(
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

      const p1 = toScreen1(A.sx + extendAx, A.sy + extendAy);
      const p2 = toScreen1(B.sx + extendBx, B.sy + extendBy);

      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    },
    [toScreen1] 
  );

  // ★★★★★★★★★★★★★★★★★★ 0, 1 없이 하나만 써야하는 layoutEffect ★★★★★★★★★★★★★★★★★★★
  useLayoutEffect(() => {
    const stage0 = stageRef0.current;
    const video0 = videoRef0.current;

    const stage1 = stageRef1.current;
    const video1 = videoRef1.current;

    type UpdateArgs = {
      stage: HTMLDivElement;
      video: HTMLVideoElement | null;
      setFit: React.Dispatch<React.SetStateAction<Fit>>;
      setCanvasTransform: React.Dispatch<React.SetStateAction<string>>;
      cwRef: React.RefObject<HTMLCanvasElement | null>;
      crRef: React.RefObject<HTMLCanvasElement | null>;
      ctRef: React.RefObject<HTMLCanvasElement | null>;
      isRotated: boolean;
    };

    const makeUpdate = ({
      stage,
      video,
      setFit,
      setCanvasTransform,
      cwRef,
      crRef,
      ctRef,
      isRotated,
    }: UpdateArgs) => {
      return () => {
        // 1) stage 크기 기반 fit/HiDPI 세팅
        const rect = stage.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;

        const base = computeContain(rect.width, rect.height, DATA_W, DATA_H);

        const cw = cwRef.current;
        const cr = crRef.current;
        const ct = ctRef.current;

        let dpr = 1;
        if (cw) dpr = setupHiDPICanvas(cw, rect.width, rect.height).dpr;
        if (cr) setupHiDPICanvas(cr, rect.width, rect.height);
        if (ct) setupHiDPICanvas(ct, rect.width, rect.height);

        setFit({ ...base, dpr });

        // 2) video 실제 렌더링 크기 기반 canvas transform 계산
        //    - 회전 케이스에서만 의미 있음(landscape를 rotate해서 세로로 보이게 하는 상황)
        if (!video || !isRotated) {
          // 회전 아닌 경우: 기존 방식 유지(필요하면 scale=1로)
          setCanvasTransform(`scaleX(-1) scaleY(1)`);
          return;
        }

        const vRect = video.getBoundingClientRect();
        if (vRect.width === 0 || vRect.height === 0) return;

        const videoAspect = vRect.height / vRect.width; // ★★ video가 회전됐기 떄문에 height가 분모로 와야 함.
        
        const sx = -VIDEO_SCALE * videoAspect;               
        const sy = VIDEO_SCALE * videoAspect ;   // 비율 보정 포함
        setCanvasTransform(`scaleX(${sx}) scaleY(${sy})`);
      };
    };

    let ro0: ResizeObserver | null = null;
    let ro1: ResizeObserver | null = null;

    // stage/video 변화 둘 다 트리거되도록 observe 대상 추가
    if (stage0) {
      const update0 = makeUpdate({
        stage: stage0,
        video: video0,
        setFit: setFit0,
        setCanvasTransform: setCanvasTransform0,
        cwRef: canvasWhiteRef0,
        crRef: canvasRedRef0,
        ctRef: canvasTrailRef0,
        isRotated: isRotated0,
      });

      ro0 = new ResizeObserver(update0);
      ro0.observe(stage0);
      if (video0) ro0.observe(video0); // ✅ video도 observe
      requestAnimationFrame(update0);  // ✅ 첫 렌더 타이밍 안전
      video0?.addEventListener("loadedmetadata", update0);
    }

    if (stage1) {
      const update1 = makeUpdate({
        stage: stage1,
        video: video1,
        setFit: setFit1,
        setCanvasTransform: setCanvasTransform1,
        cwRef: canvasWhiteRef1,
        crRef: canvasRedRef1,
        ctRef: canvasTrailRef1,
        isRotated: isRotated1,
      });

      ro1 = new ResizeObserver(update1);
      ro1.observe(stage1);
      if (video1) ro1.observe(video1); // ✅ video도 observe
      requestAnimationFrame(update1);
      video1?.addEventListener("loadedmetadata", update1);
    }

    return () => {
      ro0?.disconnect();
      ro1?.disconnect();
      video0?.removeEventListener("loadedmetadata", () => {});
      video1?.removeEventListener("loadedmetadata", () => {});
    };
  }, [
    isRotated0,
    isRotated1,
    // 파일이 바뀌면 메타/사이즈도 바뀌니까 포함
    data0?.measure_server_file_name,
    data1?.measure_server_file_name,
  ]);

      
  useEffect(() => {
    if (!measureJson0) return;

    const item = measureJson0[frame0];
    if (!item || !item.pose_landmark) return;  // ✅ 먼저 방어

    const lm = item.pose_landmark; 

    const cw = canvasWhiteRef0.current;
    const cr = canvasRedRef0.current;
    const ct = canvasTrailRef0.current;
    if (!cw || !cr || !ct) return;


    const ctxW = cw.getContext("2d");
    const ctxR = cr.getContext("2d");
    const ctxT = ct.getContext("2d");
    if (!ctxW || !ctxR || !ctxT) return;

    // trajectory
    ctxT.lineWidth = 1;
    ctxT.strokeStyle = "#00FF00"; // 원하는 색/투명도

    const p15 = toScreen0(lm[15].sx, lm[15].sy);
    const p16 = toScreen0(lm[16].sx, lm[16].sy);

    const mid = midPoint0(lm[23], lm[24]);
    const pMid = toScreen0(mid.sx, mid.sy);

    const p25 = toScreen0(lm[25].sx, lm[25].sy);
    const p26 = toScreen0(lm[26].sx, lm[26].sy);

    const prev = trailPrevRef0.current;

    drawTrailSegment0(ctxT, prev.p15, p15);
    drawTrailSegment0(ctxT, prev.p16, p16);
    drawTrailSegment0(ctxT, prev.pMid, pMid);
    drawTrailSegment0(ctxT, prev.p25, p25);
    drawTrailSegment0(ctxT, prev.p26, p26);

    trailPrevRef0.current = { p15, p16, pMid, p25, p26 };

    // clear
    ctxW.clearRect(0, 0, fit0.stageW, fit0.stageH);
    ctxR.clearRect(0, 0, fit0.stageW, fit0.stageH);

    // white
    ctxW.strokeStyle = "#FFF";
    ctxW.lineWidth = 1;

    // ✅ 스켈레톤
    drawLine0(ctxW, lm, 7, 8);

    drawLine0(ctxW, lm, 16, 18);
    drawLine0(ctxW, lm, 16, 20);
    drawLine0(ctxW, lm, 16, 22);

    drawLine0(ctxW, lm, 15, 19);
    drawLine0(ctxW, lm, 15, 21);
    drawLine0(ctxW, lm, 15, 17);

    // torso/hip box
    drawLine0(ctxW, lm, 11, 23);
    drawLine0(ctxW, lm, 23, 24);
    drawLine0(ctxW, lm, 24, 12);
    drawLine0(ctxW, lm, 12, 11);

    // arms
    drawLine0(ctxW, lm, 11, 13);
    drawLine0(ctxW, lm, 13, 15);

    drawLine0(ctxW, lm, 12, 14);
    drawLine0(ctxW, lm, 14, 16);

    // legs
    drawLine0(ctxW, lm, 23, 25);
    drawLine0(ctxW, lm, 25, 27);
    drawLine0(ctxW, lm, 27, 31);
    drawLine0(ctxW, lm, 27, 29);

    drawLine0(ctxW, lm, 24, 26);
    drawLine0(ctxW, lm, 26, 28);
    drawLine0(ctxW, lm, 28, 30);
    drawLine0(ctxW, lm, 28, 32);

    // red
    ctxR.strokeStyle = "#FF0000";
    ctxR.lineWidth = 1;

    drawLine0(ctxR, lm, 20, 19, -100, 0, 100 ,0);
    drawLine0(ctxR, lm, 23, 24);
    drawLine0(ctxR, lm, 25, 26);

  }, [measureJson0, frame0, fit0, toScreen0, drawLine0]);

useEffect(() => {
    if (!measureJson1) return;

    const item = measureJson1[frame1];
    if (!item || !item.pose_landmark) return;  // ✅ 먼저 방어

    const lm = item.pose_landmark; 

    const cw = canvasWhiteRef1.current;
    const cr = canvasRedRef1.current;
    const ct = canvasTrailRef1.current;
    if (!cw || !cr || !ct) return;

    const ctxW = cw.getContext("2d");
    const ctxR = cr.getContext("2d");
    const ctxT = ct.getContext("2d");
    if (!ctxW || !ctxR || !ctxT) return;

    // trajectory
    ctxT.lineWidth = 1;
    ctxT.strokeStyle = "#00FF00"; // 원하는 색/투명도

    const p15 = toScreen1(lm[15].sx, lm[15].sy);
    const p16 = toScreen1(lm[16].sx, lm[16].sy);

    const mid = midPoint1(lm[23], lm[24]);
    const pMid = toScreen1(mid.sx, mid.sy);

    const p25 = toScreen1(lm[25].sx, lm[25].sy);
    const p26 = toScreen1(lm[26].sx, lm[26].sy);

    const prev = trailPrevRef1.current;

    drawTrailSegment1(ctxT, prev.p15, p15);
    drawTrailSegment1(ctxT, prev.p16, p16);
    drawTrailSegment1(ctxT, prev.pMid, pMid);
    drawTrailSegment1(ctxT, prev.p25, p25);
    drawTrailSegment1(ctxT, prev.p26, p26);

    trailPrevRef1.current = { p15, p16, pMid, p25, p26 };

    // clear
    ctxW.clearRect(0, 0, fit1.stageW, fit1.stageH);
    ctxR.clearRect(0, 0, fit1.stageW, fit1.stageH);

    // white
    ctxW.strokeStyle = "#FFF";
    ctxW.lineWidth = 1;

    // ✅ 스켈레톤
    drawLine1(ctxW, lm, 7, 8);

    drawLine1(ctxW, lm, 16, 18);
    drawLine1(ctxW, lm, 16, 20);
    drawLine1(ctxW, lm, 16, 22);

    drawLine1(ctxW, lm, 15, 19);
    drawLine1(ctxW, lm, 15, 21);
    drawLine1(ctxW, lm, 15, 17);

    // torso/hip box
    drawLine1(ctxW, lm, 11, 23);
    drawLine1(ctxW, lm, 23, 24);
    drawLine1(ctxW, lm, 24, 12);
    drawLine1(ctxW, lm, 12, 11);

    // arms
    drawLine1(ctxW, lm, 11, 13);
    drawLine1(ctxW, lm, 13, 15);

    drawLine1(ctxW, lm, 12, 14);
    drawLine1(ctxW, lm, 14, 16);

    // legs
    drawLine1(ctxW, lm, 23, 25);
    drawLine1(ctxW, lm, 25, 27);
    drawLine1(ctxW, lm, 27, 31);
    drawLine1(ctxW, lm, 27, 29);

    drawLine1(ctxW, lm, 24, 26);
    drawLine1(ctxW, lm, 26, 28);
    drawLine1(ctxW, lm, 28, 30);
    drawLine1(ctxW, lm, 28, 32);

    // red
    ctxR.strokeStyle = "#FF0000";
    ctxR.lineWidth = 1;

    drawLine1(ctxR, lm, 20, 19, -100, 0, 100 ,0);
    drawLine1(ctxR, lm, 23, 24);
    drawLine1(ctxR, lm, 25, 26);

    
  }, [measureJson1, frame1, fit1, toScreen1, drawLine1]);

  return (
    <div className="flex flex-col w-full h-full gap-4">
      <div className="grid grid-cols-2 gap-2 h-full">
        {/* ★★★ 좌측 1번 비디오 div ★★★ */}
        <div className={`${className ?? ""} flex flex-col justify-between gap-2 lg:gap-4`}>
          <div
            ref={stageRef0}
            className="relative mx-auto w-full h-[480px] md:h-[560px] lg:h-[680px] overflow-hidden"
          >

            <video
              ref={videoRef0}
              muted
              playsInline
              webkit-playsinline="true"
              src={`https://gym.tangoplus.co.kr/data/Results/${data0?.measure_server_file_name}`}
              className={`
                absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0
                ${isRotated0 ? "-rotate-90 h-full w-auto scale-[1.75]" : "w-full h-full"}
              `}
            />

            {/* Canvas overlay (회전 금지, stage에 딱 맞춤) */}
            <canvas
              ref={canvasTrailRef0}
              className="absolute inset-0 z-[9] origin-center pointer-events-none"
              style={{ transform: canvasTransform0 }}
            />
            <canvas
              ref={canvasWhiteRef0}
              className="absolute inset-0 z-[9] origin-center pointer-events-none"
              style={{ transform: canvasTransform0 }}
            />

            <canvas
              ref={canvasRedRef0}
              className="absolute inset-0 z-[10] origin-center pointer-events-none"
              style={{ transform: canvasTransform0 }}
            />

            {(seqLoading0 || jsonLoading0) && (
              <div className="absolute inset-0 z-[50] flex items-center justify-center bg-black/20">
                <p className="text-white">로딩중...</p>
              </div>
            )}

            {(seqError0 || jsonError0) && (
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
                const v = videoRef0.current;
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
              max={duration0 || 0}
              step={0.01}
              value={Math.min(currentTime0, duration0 || 0)}
              className="flex-1 bg-sub100 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 
                [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full 
                [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:border-0
                [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 
                [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-500
                [&::-moz-range-thumb]:border-0"
              style={{
                background: `linear-gradient(to right, #7E7E7E 0%, #7E7E7E ${(currentTime0 / (duration0 || 1)) * 100}%, #F5F5F5 ${(currentTime0 / (duration0 || 1)) * 100}%, #F5F5F5 100%)`,
              }}
              onMouseDown={() => {
                setIsSeeking0(true);
                isSeekingRef0.current = true;
              }}
              onTouchStart={() => {
                setIsSeeking0(true);
                isSeekingRef0.current = true;
              }}
              onChange={(e) => {
                setCurrentTime0(Number(e.target.value));
              }}
              onMouseUp={(e) => {
                const v = videoRef0.current;
                if (!v) return;
                v.currentTime = Number(e.currentTarget.value);
                setIsSeeking0(false);
                isSeekingRef0.current = false;
              }}
              onTouchEnd={(e) => {
                const v = videoRef0.current;
                if (!v) return;
                v.currentTime = Number(e.currentTarget.value);
                setIsSeeking0(false);
                isSeekingRef0.current = false;
              }}
            />
          </div>
        </div>

        {data1 ? 
        <div className={`${className ?? ""} flex flex-col justify-between gap-2 lg:gap-4`}>
          <div
            ref={stageRef1}
            className="relative mx-auto w-full h-[480px] md:h-[560px] lg:h-[680px] overflow-hidden"
          >
            <video
              ref={videoRef1}
              muted
              playsInline
              webkit-playsinline="true"
              src={`https://gym.tangoplus.co.kr/data/Results/${data1?.measure_server_file_name}`}
              className={`
                absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0
                ${isRotated0 ? "-rotate-90 h-full w-auto scale-[1.75]" : "w-full h-full"}
              `}
            />

            {/* Canvas overlay (회전 금지, stage에 딱 맞춤) */}
            <canvas
              ref={canvasTrailRef1}
              className="absolute inset-0 z-[9] origin-center pointer-events-none"
              style={{ transform: canvasTransform1 }}
            />
            <canvas
              ref={canvasWhiteRef1}
              className="absolute inset-0 z-[9] origin-center pointer-events-none"
              style={{ transform: canvasTransform1 }}
            />

            <canvas
              ref={canvasRedRef1}
              className="absolute inset-0 z-[10] origin-center pointer-events-none"
              style={{ transform: canvasTransform1 }}
            />

            {(seqLoading1 || jsonLoading1) && (
              <div className="absolute inset-0 z-[50] flex items-center justify-center bg-black/20">
                <p className="text-white">로딩중...</p>
              </div>
            )}

            {(seqError1 || jsonError1) && (
              <div className="absolute inset-0 z-[50] flex items-center justify-center bg-black/20">
                <p className="text-white">오류가 발생했습니다</p>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="px-3 py-2 rounded-xl bg-sub100 hover:bg-sub300 transition"
              onClick={() => {
                const v = videoRef1.current;
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
              max={duration1 || 0}
              step={0.01}
              value={Math.min(currentTime1, duration1 || 0)}
              className="flex-1 bg-sub100 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 
                [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full 
                [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:border-0
                [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 
                [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-500
                [&::-moz-range-thumb]:border-0"
              style={{
                background: `linear-gradient(to right, #7E7E7E 0%, #7E7E7E ${(currentTime1 / (duration1 || 1)) * 100}%, #F5F5F5 ${(currentTime1 / (duration1 || 1)) * 100}%, #F5F5F5 100%)`,
              }}
              onMouseDown={() => {
                setIsSeeking1(true);
                isSeekingRef1.current = true;
              }}
              onTouchStart={() => {
                setIsSeeking1(true);
                isSeekingRef1.current = true;
              }}
              onChange={(e) => {
                setCurrentTime1(Number(e.target.value));
              }}
              onMouseUp={(e) => {
                const v = videoRef1.current;
                if (!v) return;
                v.currentTime = Number(e.currentTarget.value);
                setIsSeeking1(false);
                isSeekingRef1.current = false;
              }}
              onTouchEnd={(e) => {
                const v = videoRef1.current;
                if (!v) return;
                v.currentTime = Number(e.currentTarget.value);
                setIsSeeking1(false);
                isSeekingRef1.current = false;
              }}
            />
          </div>
        </div>
        : 
        <CompareDefault onCompareDialogOpen={onCompareDialogOpen} currentSlot={1}/>
        }
      </div>
      <RawDataContainer 
        mergedDetailData0={measure0?.detail_data ?? []}
        mergedDetailData1={measure1?.detail_data ?? []} 
        measure_date0={measure_dates.measure_date0} 
        measure_date1={measure_dates.measure_date1}
        />
    </div>
  );
};

export default MeasureDynamicCompare;