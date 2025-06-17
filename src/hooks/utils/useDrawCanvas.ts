/**
 * 캔버스 그리기 Hooks
 * 
 * 캔버스 컨텍스트를 통해 캔버스 엘리먼트를 그리는 함수를 호출하여 그리기 함수를 실행.
 * 
 * @param context 캔버스 컨텍스트
 * @param canvas 캔버스 엘리먼트
 * @param color 그리기 색상
 * @param drawFn 그리기 함수
 * @param lineWidth 선 너비
 */
export const useDrawCanvas = (
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  color: string,
  drawFn: () => void,
  lineWidth = 2
) => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = color;
  context.lineWidth = lineWidth;
  drawFn();
};
