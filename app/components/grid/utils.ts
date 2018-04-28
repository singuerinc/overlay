export const createGrid = (size, color, type): string => {
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  const size2 = size * 2;

  canvas.height = canvas.width = size * 2;

  ctx.beginPath();
  if (type === 'dashed') {
    ctx.setLineDash([5]);
  }
  ctx.lineWidth = 1;
  ctx.strokeStyle = color;
  ctx.moveTo(0, 0);
  ctx.lineTo(size2, 0);
  ctx.lineTo(size2, size2);
  // ctx.lineWidth = 1;
  // ctx.strokeStyle = chroma(color)
  //   .alpha(0.5)
  //   .css();
  // ctx.moveTo(size, 0);
  // ctx.lineTo(size, size2);
  // ctx.moveTo(0, size);
  // ctx.lineTo(size2, size);
  ctx.stroke();

  return canvas.toDataURL();
};
