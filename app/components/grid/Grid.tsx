import * as React from 'react';
import styled from 'styled-components';
import { IGrid } from './IGrid';
import { createGrid } from './utils';

export const Grid = ({ size, color, type, opacity }: IGrid) => (
  <Element data={createGrid(size, color, type)} opacity={opacity} />
);

interface Props {
  data: string;
  opacity: number;
}

const Element = styled.div<Props>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url(${({ data }) => data});
  background-repeat: repeat;
  opacity: ${({ opacity }) => opacity};
`;
