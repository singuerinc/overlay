import * as React from 'react';
import styled from 'styled-components';
import { IGrid } from './IGrid.d';
import { createGrid } from './utils';

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
  const data: string = createGrid(size, color, type);
  return <Element data={data} opacity={opacity} />;
};
