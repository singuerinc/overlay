import * as React from 'react';
import styled from 'styled-components';
import { Color } from '../../utils/Color';

const Wrapper = styled.div`
  display: flex;
  width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
`;

const ColorItem = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  border: 2px solid #f4f4f4;
`;

export const MiniToolboxColor = ({ color }: { color: Color }) => (
  <Wrapper>
    <ColorItem color={color} />
  </Wrapper>
);
