import * as React from 'react';
import styled from 'styled-components';
import * as interactjs from 'interactjs';
import Coords from '../coords/Coords';

const grid = require('./grid.png');

const RulerWrapper = styled.div.attrs({})`
  position: fixed;

  &:hover ${Coords} {
    display: initial;
  }
`;

const RulerElement = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 10vw;
  height: 10vh;
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

export default class Ruler extends React.Component {
  private el: HTMLDivElement;
  state = {
    opacity: 1,
    inverted: false,
    x: Math.round(Math.random() * 500),
    y: Math.round(Math.random() * 500)
  };

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
    const { x, y } = this.state;
    return (
      <RulerWrapper
        innerRef={(el: HTMLDivElement) => {
          this.el = el;
        }}
      >
        <Coords x={x} y={y} />
        <RulerElement />
      </RulerWrapper>
    );
  }
}
