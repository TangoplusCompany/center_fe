export const useDrawCanvas = (
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  color: string,
  drawFn: () => void,
) => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = color;
  context.lineWidth = 2;
  drawFn();
};
