export async function preprocessTrajectoryImage(originalUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
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

      const targetRed = { r: 255, g: 74, b: 74 };
      const targetBlue = { r: 91, g: 147, b: 255 };

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];

        if (a === 0) continue;

        const maxVal = Math.max(r, g, b);
        const minVal = Math.min(r, g, b);
        const colorDiff = maxVal - minVal;

        // 1. 무채색(검은 배경, 회색 십자선) 및 너무 어두운 픽셀 제거
        if (colorDiff < 15 || maxVal < 30) {
          data[i + 3] = 0;
          continue;
        }

        // 2. 궤적 선 픽셀: 불투명화 및 색상 치환
        data[i + 3] = 255;

        if (r > b && r > g) {
          // 빨간색 계열
          data[i] = targetRed.r;
          data[i + 1] = targetRed.g;
          data[i + 2] = targetRed.b;
        } else {
          // 파란색/청록색 계열
          data[i] = targetBlue.r;
          data[i + 1] = targetBlue.g;
          data[i + 2] = targetBlue.b;
        }
      }

      ctx.putImageData(imageData, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = (err) => reject(err);
  });
}