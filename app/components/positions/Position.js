// @flow
import React, { Component } from 'react';
import styled from 'styled-components';

type Props = {
  x: number,
  y: number,
  type: string,
  color: string
};

const PositionElement = styled.div.attrs({
  type: (props) => props.type,
  color: (props) => props.color,
  x: (props) => props.x,
  y: (props) => props.y
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

export default class Position extends Component<Props> {
  props: Props;

  render() {
    const {
      x, y, type, color
    } = this.props;
    const value = type === 'h' ? y : x;
    return (
      <PositionElement type={type} color={color}>
        <Text>{value}px</Text>
      </PositionElement>
    );
  }
}
