import * as React from 'react';
import styled from 'styled-components';
import * as interactjs from 'interactjs';

const grid = require('./grid.png');

const Coords = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.9);
  color: #111;
  z-index: 1;
  font-size: 12px;
  font-family: sans-serif;
  padding: 3px 6px;
  margin: 3px 0 0 3px;
  display: none;
`;

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
        <Coords>
          {x}:{y}
        </Coords>
        <RulerElement />
      </RulerWrapper>
    );
  }
}
