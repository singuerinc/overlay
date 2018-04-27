import * as React from 'react';
import styled from 'styled-components';
import { MiniToolboxIcon } from './MiniToolboxIcon';

const Wrapper = styled.ul.attrs<{
  x: number;
  y: number;
}>({
  x: (props) => props.x,
  y: (props) => props.y
})`
  position: fixed;
  background-color: transparent;
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
  top: ${({ y }) => y}px;
  left: ${({ x }) => x}px;
`;

const ToolItem = styled.li`
  background-color: #111;
  color: #f4f4f4;
  display: flex;
  flex: 1 1 auto;
  text-align: center;
  justify-content: center;
  flex-direction: column;
  padding: 5px 15px;
  margin: 0 1px;

  &:hover {
    cursor: pointer;
    background-color: #333;
  }
`;

interface Props {
  x: number;
  y: number;
}

export const MiniToolbox = ({ x, y }: Props) => (
  <Wrapper x={x} y={y}>
    <ToolItem>
      <MiniToolboxIcon icon="trash-2" />
    </ToolItem>
    <ToolItem>
      <MiniToolboxIcon icon="sun" />
    </ToolItem>
  </Wrapper>
);
