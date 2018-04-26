import * as React from 'react';
import styled from 'styled-components';
import { IGrid } from './IGrid.d';

const createImage = (size, color, type): string => {
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  canvas.height = canvas.width = size;

  ctx.beginPath();
  if (type === 'dashed') {
    ctx.setLineDash([5]);
  }
  ctx.moveTo(0, size);
  ctx.lineTo(size, size);
  ctx.lineTo(size, 0);
  ctx.strokeStyle = color;
  ctx.stroke();

  return canvas.toDataURL();
};

const Element = styled.div.attrs({
  //@ts-ignore
  data: (props) => props.data,
  opacity: (props) => props.opacity
})`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url(${({ data }) => data});
  background-repeat: repeat;
  opacity: ${({ opacity }) => opacity};
`;

export default ({ size, color, type, opacity }: IGrid) => {
  const data: string = createImage(size, color, type);
  return <Element data={data} opacity={opacity} />;
};
