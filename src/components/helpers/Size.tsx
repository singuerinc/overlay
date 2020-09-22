import * as React from 'react';
import styled from 'styled-components';

interface IProps {
  className?: string;
  width: number;
  height: number;
}

const Element = ({ width, height, className }: IProps) => (
  <span className={className}>
    {width.toFixed(0)}x{height.toFixed(0)}
  </span>
);

export const Size = styled(Element)`
  position: absolute;
  bottom: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.9);
  color: #111;
  z-index: 1;
  font-size: 12px;
  font-family: sans-serif;
  padding: 3px 6px;
  margin: 0 3px 3px 0;
`;
