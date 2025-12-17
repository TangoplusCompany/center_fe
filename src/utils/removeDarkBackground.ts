export async function removeDarkBackground(originalUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    const proxiedUrl = `/api/proxy?url=${encodeURIComponent(originalUrl)}`;
    img.src = proxiedUrl;
    img.crossOrigin = ""; // ✅ 필수
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];

        // 밝기(Luminance)
        const L = 0.2126 * r + 0.7152 * g + 0.0722 * b;

        const BG = 50;   // 이 값 이하는 완전 배경
        const EDGE = 90; // 이 값 근처까지는 서서히 페더링

        // ✅ 선 색 보호 (너무 어두운 빨강/파랑까지 날아가는 걸 방지용)
        const isRedLine = r > 120 && g < 90 && b < 90;
        const isBlueLine = b > 120 && r < 90 && g < 140;
        if (isRedLine || isBlueLine) {
          continue; // 선은 건드리지 않음
        }

        if (L <= BG) {
          data[i + 3] = 0;       // 완전 배경 → 투명
        } else if (L < EDGE) {
          const t = (L - BG) / (EDGE - BG);
          data[i + 3] = a * t;  // 경계 → 서서히 투명
        }
      }

      ctx.putImageData(imageData, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };

    img.onerror = reject;
  });
}
