// hooks/usePoseCroppedImage.ts
"use client";

import { useState, useEffect } from "react";

export type Landmark = { x: number; y: number };

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = ""; // 프록시라서 crossOrigin 없음
    img.onload = () => resolve(img);
    img.onerror = (err) => {
      console.error("이미지 로딩 실패", err);
      reject(err);
    };
    img.src = src;
  });
}

/** 
 * @name usePoseCroppedImage
 * @description 이미지를 Nextjs Server를 이용하여 우회하여 불러온 후, Canvas로 3:4 비율로 자른 이미지를 반환합니다.
 * @param imageUrl 이미지 URL
 * @returns 처리된 이미지 URL
 */
export function usePoseCroppedImage(
  imageUrl: string,
): { resultUrl: string | null; loading: boolean } {
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
