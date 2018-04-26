import * as React from 'react';
import styled from 'styled-components';
import * as interactjs from 'interactjs';
import Coords from '../coords/Coords';
import Size from '../coords/Size';

const grid = require('./grid.png');

interface Props {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface State {
  x: number;
  y: number;
  width: number;
  height: number;
  opacity: number;
  inverted: boolean;
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

const RulerElement = styled.div.attrs({
  // @ts-ignore
  width: (props) => props.width,
  // @ts-ignore
  height: (props) => props.height
})`
  position: relative;
  top: 0;
  left: 0;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background-image: url(${grid});
  background-repeat: repeat;
  background-color: red;
  opacity: 0.5;
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
    width: 100,
    height: 100
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      ...prevState,
      x: nextProps.x,
      y: nextProps.y,
      width: nextProps.width,
      height: nextProps.height
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
    const { x, y, width, height } = this.state;
    return (
      <RulerWrapper
        innerRef={(el: HTMLDivElement) => {
          this.el = el;
        }}
      >
        <Coords x={x} y={y} />
        <Size width={width} height={height} />
        <RulerElement width={width} height={height} />
      </RulerWrapper>
    );
  }
}
