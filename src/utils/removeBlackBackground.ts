export async function removeBlackBackground(originalUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    // 같은 origin(https://localhost:4862/api/...) 이라면 굳이 필요없지만, 있어도 큰 문제는 X
    // img.crossOrigin = "anonymous";

    // ✅ 원본이 아니라, 프록시 경유 주소를 사용
    const proxiedUrl = `/api/proxy?url=${encodeURIComponent(originalUrl)}`;
    img.crossOrigin = "";
    img.src = proxiedUrl;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // 💡 성능 최적화: 루프를 하나로 합쳐서 한 번에 연산합니다.
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];

        // 1. RGB 거리 기준 1차 검증
        const distToBlack = Math.sqrt(r * r + g * g + b * b);
        const HARD = 50;
        const SOFT = 200;

        if (distToBlack <= HARD) {
          data[i + 3] = 0;
          continue;
        } else if (distToBlack < SOFT) {
          const t = (distToBlack - HARD) / (SOFT - HARD);
          data[i + 3] = a * t;
        }

        // 2. 밝기(Luminance) 기준 2차 검증
        const L = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        const BG = 35;
        const EDGE = 60;

        if (L <= BG) {
          data[i + 3] = 0;
        } else if (L < EDGE) {
          const t = (L - BG) / (EDGE - BG);
          data[i + 3] = data[i + 3] * t; // 기존 알파값에 누적 페더링
        }
      }

      ctx.putImageData(imageData, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };

    img.onerror = (err) => {
      reject(err);
    };
  });
}
