import * as React from 'react';
import styled from 'styled-components';

interface Props {
  x: number;
  y: number;
  type: string;
  color: string;
}

interface PositionElementProps {
  type: string;
  color: string;
}

const PositionElement = styled.div.attrs<PositionElementProps>({
  type: (props: PositionElementProps) => props.type,
  color: (props: PositionElementProps) => props.color
})`
  position: relative;
  top: ${({ type }) => (type === 'h' ? '-8px' : '0')};
  left: ${({ type }) => (type === 'h' ? '0' : '-25px')};
  width: 51px;
  height: 16px;
  background: ${({ color }) => color};
  font-family: sans-serif;
  font-size: 12px;
  font-weight: normal;
  text-align: center;
`;

const Text = styled.span`
  padding-top: 2px;
  display: block;
  color: #111;
  user-select: none;
`;

export default class Position extends React.Component<Props> {
  props: Props;

  render() {
    const { x, y, type, color } = this.props;
    const value = type === 'h' ? y : x;
    return (
      <PositionElement type={type} color={color}>
        <Text>{value}px</Text>
      </PositionElement>
    );
  }
}
