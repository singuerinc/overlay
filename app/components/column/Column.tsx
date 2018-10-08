import * as React from 'react';
import styled from 'styled-components';
import { IColumn } from './IColumn';
import { createColumn } from './utils';

export const Column = ({ width, height, color, opacity }: IColumn) => (
  <Element data={createColumn(width, height, 20, color)} opacity={opacity} />
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
