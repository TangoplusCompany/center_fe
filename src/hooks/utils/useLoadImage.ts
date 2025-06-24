/**
 * 이미지 로딩 Hooks
 * @param src 이미지 경로
 * @returns 이미지 로딩 프로미스
 */
export function useLoadImage(src: string): Promise<HTMLImageElement> {
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
