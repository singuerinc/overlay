import * as React from 'react';
import styled from 'styled-components';
import * as interactjs from 'interactjs';
import { Coords } from '../helpers/Coords';
import { Size } from '../helpers/Size';
import { IRuler as Props } from './IRuler.d';
import { createGrid } from '../grid/utils';
import * as chroma from 'chroma-js';

interface State {
  x: number;
  y: number;
  width: number;
  height: number;
  opacity: number;
  inverted: boolean;
  color: string;
}

const RulerWrapper = styled.div.attrs({})`
  position: fixed;
  display: block;

  & ${Coords}, & ${Size} {
    display: none;
  }

  &:hover ${Coords}, &:hover ${Size} {
    display: initial;
  }
`;

const RulerElement = styled.div.attrs<{
  width: number;
  height: number;
  color: string;
}>({
  width: (props) => props.width,
  height: (props) => props.height,
  color: (props) => props.color
})`
  position: relative;
  top: 0;
  left: 0;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background-image: url(${({ color }) => createGrid(10, color, 'solid')});
  background-repeat: repeat;
  background-color: ${({ color }) =>
    chroma(color)
      .alpha(0.6)
      .css()};
`;

const setPosition = (el, x, y) => {
  el.style.webkitTransform = el.style.transform = `translate(${x}px,${y}px)`;
  el.setAttribute('data-x', x);
  el.setAttribute('data-y', y);
};

export default class Ruler extends React.Component<Props, State> {
  private el: HTMLDivElement;
  state = {
    opacity: 1,
    inverted: false,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    color: 'black'
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      ...prevState,
      x: nextProps.x,
      y: nextProps.y,
      width: nextProps.width,
      height: nextProps.height,
      color: nextProps.color
    };
  }

  componentDidMount() {
    setPosition(this.el, this.state.x, this.state.y);

    interactjs(this.el).draggable({
      onmove: ({ dx, dy, target }) => {
        const x = (parseFloat(target.getAttribute('data-x')) || 0) + dx;
        const y = (parseFloat(target.getAttribute('data-y')) || 0) + dy;

        setPosition(target, x, y);

        this.setState({
          ...this.state,
          x,
          y
        });
      }
    });
  }

  render() {
    const { x, y, width, height, color } = this.state;
    return (
      <RulerWrapper
        innerRef={(el: HTMLDivElement) => {
          this.el = el;
        }}
      >
        <Coords x={x} y={y} />
        <Size width={width} height={height} />
        <RulerElement width={width} height={height} color={color} />
      </RulerWrapper>
    );
  }
}
