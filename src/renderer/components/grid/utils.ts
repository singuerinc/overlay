export const createGrid = (size: number, color: string, type: string): string => {
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    const size2 = size * 2;

    canvas.height = size * 2;
    canvas.width = size * 2;

    ctx.beginPath();
    if (type === 'dashed') {
        ctx.setLineDash([5]);
    }
    ctx.lineWidth = 1;
    ctx.strokeStyle = color;
    ctx.moveTo(0, 0);
    ctx.lineTo(size2, 0);
    ctx.lineTo(size2, size2);
    ctx.stroke();

    return canvas.toDataURL();
};
