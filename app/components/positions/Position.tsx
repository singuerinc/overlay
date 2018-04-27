import * as React from 'react';
import styled from 'styled-components';
import { IGuideDirection, GuideDirection } from '../guide/IGuideDirection';

interface Props {
  x: number;
  y: number;
  type: IGuideDirection;
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
  top: 0;
  left: 0;
  background: ${({ color }) => color};
  font-weight: normal;
  text-align: center;
  padding: 6px 10px;
  display: inline-block;
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
    const value = type === GuideDirection.HORIZONTAL ? y : x;
    const axis = type === GuideDirection.HORIZONTAL ? 'Y' : 'X';

    return (
      <PositionElement type={type} color={color}>
        <Text>
          {axis}:{value}
        </Text>
      </PositionElement>
    );
  }
}
