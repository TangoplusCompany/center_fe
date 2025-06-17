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

/**
 * 랜드마크 별 DrawMap 생성 함수.
 * 
 * 각 부위마다 존재하는 DrawLine을 별도 함수로 관리하고 해당 함수를 값으로 가진 Map 객체 생성.
 * 
 * 이후 해당 함수를 호출하여 해당 순번에 맞는 랜드마크 그리기 함수 호출.
 */
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

/**
 * 정적 랜드마크 처리 Hooks.
 * 
 * JSON형식의 랜드마크의 데이터중 pose_landmark 키를 기반으로 랜더링 후 canvas로 그려내 새로운 ImageURL로 변환시켜 리턴.
 * @param imageUrl 이미지 URL
 * @param measureJson 랜드마크 데이터
 * @param step 랜드마크 순번
 * @returns 랜드마크 처리 결과
 */
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
  const loadImage = useLoadImage;

  useEffect(() => {
    if (!imageUrl) return;

    const draw = async () => {
      setLoading(true);

      try {
        const proxiedUrl = `/api/proxy?url=${encodeURIComponent(imageUrl)}`;
        const image = await loadImage(proxiedUrl);
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
