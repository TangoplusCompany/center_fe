import { DUMMY_SECTION_DATA } from "@/components/Measure/Moire/Image";
import { useState, useEffect } from "react";

export interface IMoireSectionData {
  lineYPercents: number[];
  labels: string[];
}

export function useDetectMoireSections(imageUrl: string | null) {
  const [sectionData, setSectionData] = useState<IMoireSectionData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!imageUrl) return;

    let isMounted = true;
    setIsLoading(true);

    const img = new Image();

    // 💡 핵심 수정: Base64/Data URL인 경우 프록시와 crossOrigin을 거치지 않고 바로 사용!
    const isDataUrl = imageUrl.startsWith("data:");
    if (!isDataUrl) {
      img.crossOrigin = "Anonymous";
      img.src = `/api/proxy?url=${encodeURIComponent(imageUrl)}`;
    } else {
      img.src = imageUrl; // data:image/png;base64,... 는 프록시 없이 바로 할당
    }

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        setIsLoading(false);
        return;
      }

      const w = img.width;
      const h = img.height;
      canvas.width = w;
      canvas.height = h;

      ctx.drawImage(img, 0, 0, w, h);
      const imageData = ctx.getImageData(0, 0, w, h);
      const data = imageData.data; // RGBA 데이터

      let topY = -1;
      let bottomY = -1;

      // 1. 위에서부터 아래로 스캔하여 불투명한 픽셀(머리 끝) 찾기
      for (let y = 0; y < h; y++) {
        let hasPixel = false;
        for (let x = 0; x < w; x++) {
          const alpha = data[(y * w + x) * 4 + 3];
          if (alpha > 10) { // 투명이 아닌 픽셀 존재
            hasPixel = true;
            break;
          }
        }
        if (hasPixel) {
          topY = y;
          break;
        }
      }

      // 2. 아래에서부터 위로 스캔하여 불투명한 픽셀(발 끝) 찾기
      for (let y = h - 1; y >= 0; y--) {
        let hasPixel = false;
        for (let x = 0; x < w; x++) {
          const alpha = data[(y * w + x) * 4 + 3];
          if (alpha > 10) {
            hasPixel = true;
            break;
          }
        }
        if (hasPixel) {
          bottomY = y;
          break;
        }
      }

      // 인식을 못 한 경우 기본 비율 처리
      if (topY === -1 || bottomY === -1) {
        if (isMounted) {
          setSectionData({
            lineYPercents: [16, 28, 40, 55],
            labels: ["목~명치 영역", "명치~배꼽 영역", "배꼽~허벅지 영역"],
          });
          setIsLoading(false);
        }
        return;
      }

      // 3. 신체 높이 계산
      const bodyHeight = bottomY - topY;

      // 4. 인체 비율에 따른 4개 Y 위치(픽셀) 계산
      const neckY = topY + bodyHeight * 0.14;       // 목
      const epigastriumY = topY + bodyHeight * 0.30;// 명치
      const navelY = topY + bodyHeight * 0.42;      // 배꼽
      const thighY = topY + bodyHeight * 0.62;      // 허벅지 중간

      // 5. 전체 이미지 높이(h) 기준 Y 백분율(%) 변환
      const p1 = Math.round((neckY / h) * 100);
      const p2 = Math.round((epigastriumY / h) * 100);
      const p3 = Math.round((navelY / h) * 100);
      const p4 = Math.round((thighY / h) * 100);

      if (isMounted) {
        setSectionData({
          lineYPercents: [p1, p2, p3, p4],
          labels: ["상체 상부(목~명치)", "상체 하부(명치~배꼽)", "하체 상부(배꼽~허벅지)"],
        });
        setIsLoading(false);
      }
    };

    img.onerror = () => {
      if (isMounted) {
        // 💡 에러 발생 시 DUMMY_SECTION_DATA로 Fallback
        setSectionData(DUMMY_SECTION_DATA);
        setIsLoading(false);
      }
    };

    return () => {
      isMounted = false;
    };
  }, [imageUrl]);

  return { sectionData, isLoading };
}