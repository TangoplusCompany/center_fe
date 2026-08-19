"use client";

import React, { useEffect, useRef } from "react";
import { usePoseCroppedImage } from "@/hooks/utils/usePoseCroppedImage";

type Props = {
  imageUrl: string;
  width?: number;
  height?: number;
  className?: string;
};

const PoseImageResult = React.memo(
  ({ imageUrl, width = 192, height = 260, className }: Props) => {
  const { resultUrl, loading } = usePoseCroppedImage(imageUrl);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!resultUrl || loading) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      // HiDPI 선명도 보정
      const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      // -90도 회전 후 "cover" 되도록 스케일:
      // 회전 후 bounding box 조건: (img.height * scale) >= width  AND (img.width * scale) >= height
      const scale = Math.max(width / img.height, height / img.width);
      const drawW = img.width * scale;
      const drawH = img.height * scale;

      ctx.save();
      ctx.translate(width / 2, height / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
      ctx.restore();
    };

    img.src = resultUrl;
  }, [resultUrl, loading, width, height]);

  if (loading) return <div className={className} />;
  if (!resultUrl) return <div className={className} />;

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-label="Processed Pose Image"
    />
  );
  },
);

PoseImageResult.displayName = "PoseImageResult";

export default PoseImageResult;