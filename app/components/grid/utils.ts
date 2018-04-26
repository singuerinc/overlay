export const createGrid = (size, color, type): string => {
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  canvas.height = canvas.width = size;

  ctx.beginPath();
  if (type === 'dashed') {
    ctx.setLineDash([5]);
  }
  ctx.moveTo(size, 0);
  ctx.lineTo(0, 0);
  ctx.lineTo(0, size);
  ctx.strokeStyle = color;
  ctx.stroke();

  return canvas.toDataURL();
};
