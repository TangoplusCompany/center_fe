export async function removeBlackBackground(originalUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    // 같은 origin(https://localhost:4862/api/...) 이라면 굳이 필요없지만, 있어도 큰 문제는 X
    // img.crossOrigin = "anonymous";

    // ✅ 원본이 아니라, 프록시 경유 주소를 사용
    const proxiedUrl = `/api/proxy-image?url=${encodeURIComponent(originalUrl)}`;
    img.src = proxiedUrl;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // 검정 배경 제거 + 가장자리 페더링
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];

        // 검정(0,0,0)과의 거리
        const distToBlack = Math.sqrt(r * r + g * g + b * b);

        const HARD = 50; // 이 값 이하는 완전 투명
        const SOFT = 200; // 이 값 이상은 원래 알파 유지

        if (distToBlack <= HARD) {
          // 완전 배경이라고 보고 날리기
          data[i + 3] = 0;
        } else if (distToBlack < SOFT) {
          // 경계 영역 → 알파를 선형으로 줄이기 (feather)
          const t = (distToBlack - HARD) / (SOFT - HARD); // 0~1
          data[i + 3] = a * t;
        } else {
          // 나머지는 그대로 두기
          data[i + 3] = a;
        }
      }

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];

        // 밝기 계산
        const L = 0.2126 * r + 0.7152 * g + 0.0722 * b;

        const BG = 35;   // 배경
        const EDGE = 60; // 경계

        if (L <= BG) {
          // 완전 배경 → 투명화
          data[i + 3] = 0;
        } else if (L < EDGE) {
          // 경계 → 페더링 (부드러운 투명)
          const t = (L - BG) / (EDGE - BG); // 0~1
          data[i + 3] = a * t;
        } else {
          // 선은 그대로 두기
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
