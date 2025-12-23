export async function preprocessVideoRotate(
  inputUrl: string,
  opts?: {
    outWidth?: number;   // 720
    outHeight?: number;  // 960 (3:4)
    fps?: number;        // 30
    mimeType?: string;   // 'video/webm;codecs=vp9' or 'vp8'
    durationLimitSec?: number; // 긴 영상이면 제한 걸고 싶을 때
  }
): Promise<string> {
  const outWidth = opts?.outWidth ?? 720;
  const outHeight = opts?.outHeight ?? 960;
  const fps = opts?.fps ?? 30;

  // vp9이 안 되는 브라우저도 있어서 fallback
  const mimeCandidates = [
    opts?.mimeType,
    "video/webm;codecs=vp9",
    "video/webm;codecs=vp8",
    "video/webm",
  ].filter(Boolean) as string[];

  const mimeType =
    mimeCandidates.find((m) => (window).MediaRecorder?.isTypeSupported?.(m)) ??
    "video/webm";

  // 1) 입력 비디오 로드(숨김)
  const v = document.createElement("video");
  v.crossOrigin = "anonymous"; // 같은 origin이면 상관없고, cross-origin이면 CORS 허용 필요
  const proxiedUrl = `/api/proxy?url=${encodeURIComponent(inputUrl)}`;
  v.src = proxiedUrl;
  v.muted = true;         // MediaRecorder 안정성을 위해 mute 권장
  v.playsInline = true;
  v.preload = "auto";

  await new Promise<void>((resolve, reject) => {
    v.onloadedmetadata = () => resolve();
    v.onerror = () => reject(new Error("video metadata load failed"));
  });

  // 2) 출력 캔버스(최종 3:4)
  const canvas = document.createElement("canvas");
  canvas.width = outWidth;
  canvas.height = outHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas ctx not available");

  // 3) 회전 후 크롭 파라미터 (원본 1280x720 → 회전(-90) → 720x1280 → 720x960 중앙 크롭)
  const W = v.videoWidth || 1280;
  const H = v.videoHeight || 720;

  // rotate(-90) 후 크기: (H x W)
  // 3:4로 만들기: outWidth를 H(=720)에 맞춘다고 가정하면 outHeight=960
  // 중앙 크롭 cropY = (rotH - outH)/2 = (W - outHeight)/2
  const cropY = Math.max(0, Math.floor((W - outHeight) / 2)); // (1280-960)/2=160

  // 4) 캔버스 스트림 + 레코더
  const stream = canvas.captureStream(fps);
  const recorder = new MediaRecorder(stream, { mimeType });

  const chunks: BlobPart[] = [];
  recorder.ondataavailable = (e) => {
    if (e.data && e.data.size > 0) chunks.push(e.data);
  };

  const stopPromise = new Promise<string>((resolve) => {
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: mimeType });
      resolve(URL.createObjectURL(blob));
    };
  });

  // 5) 프레임 루프: video.currentTime을 증가시키면서 그리기
  //    (짧은 영상에 적합. 긴 영상이면 durationLimitSec 걸거나 서버 ffmpeg 권장)
  const duration = v.duration;
  const limit = opts?.durationLimitSec ? Math.min(duration, opts.durationLimitSec) : duration;
  const dt = 1 / fps;

  // 재생 대신 time-seek 기반으로 고정 fps로 샘플링
  recorder.start(200); // timeslice

  for (let t = 0; t < limit; t += dt) {
    v.currentTime = t;

    await new Promise<void>((resolve) => {
      const handler = () => resolve();
      v.onseeked = handler;
    });

    // ---- draw rotated+cropped frame onto canvas ----
    ctx.clearRect(0, 0, outWidth, outHeight);

    ctx.save();
    // OUT(720x960)에서 -90 회전 후 원본 그리기
    ctx.translate(0, outHeight);
    ctx.rotate(-Math.PI / 2);

    // y에 -cropY를 주면 중앙 크롭됨
    // drawImage(video, dx, dy, dw, dh)
    ctx.drawImage(v, 0, -cropY, W, H);

    ctx.restore();
  }

  recorder.stop();
  return await stopPromise;
}
