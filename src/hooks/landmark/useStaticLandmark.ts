// hooks/usePoseCroppedImage.ts
"use client";

import { IPoseLandmark } from "@/types/pose";
import { useState, useEffect } from "react";
import { useLoadImage } from "../utils/useLoadImage";
import {
  drawLineStepFifth,
  drawLineStepFirst,
  drawLineStepFourth,
  drawLineStepSecond,
  drawLineStepSixth,
  drawLineStepThird,
} from "@/utils/drawLineStep";

const drawMap: Record<
  "first" | "second" | "third" | "fourth" | "fifth" | "sixth",
  (
    ctx: CanvasRenderingContext2D,
    measureJson: { pose_landmark: IPoseLandmark[] },
  ) => void
> = {
  first: drawLineStepFirst,
  second: drawLineStepSecond,
  third: drawLineStepThird,
  fourth: drawLineStepFourth,
  fifth: drawLineStepFifth,
  sixth: drawLineStepSixth,
};

export function useStaticLandmark(
  imageUrl: string,
  measureJson: { pose_landmark: IPoseLandmark[] },
  step: "first" | "second" | "third" | "fourth" | "fifth" | "sixth",
): {
  resultUrl: string | null;
  loading: boolean;
} {
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!imageUrl) return;

    const draw = async () => {
      setLoading(true);

      try {
        const proxiedUrl = `/api/proxy?url=${encodeURIComponent(imageUrl)}`;
        const image = await useLoadImage(proxiedUrl);
        const width = image.width;
        const height = image.height;

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d")!;

        ctx.drawImage(image, 0, 0, width, height);
        ctx.save();
        ctx.translate(width, 0);
        ctx.scale(-1, 1);

        drawMap[step](ctx, measureJson);

        ctx.restore();

        // crop to 3:4
        const targetAspect = 3 / 4;
        const cropHeight = height;
        const cropWidth = cropHeight * targetAspect;
        const cropX = (width - cropWidth) / 2;
        const cropY = 0;

        const croppedCanvas = document.createElement("canvas");
        croppedCanvas.width = cropWidth;
        croppedCanvas.height = cropHeight;
        const croppedCtx = croppedCanvas.getContext("2d")!;
        croppedCtx.drawImage(
          canvas,
          cropX,
          cropY,
          cropWidth,
          cropHeight,
          0,
          0,
          cropWidth,
          cropHeight,
        );

        const result = croppedCanvas.toDataURL("image/png");
        setResultUrl(result);
      } catch (err) {
        console.error("Image processing failed", err);
        setResultUrl(null);
      }

      setLoading(false);
    };

    draw();
  }, [imageUrl]);

  return { resultUrl, loading };
}
