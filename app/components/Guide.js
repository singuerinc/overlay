// @flow
import React, { Component } from 'react';
import * as mousetrap from 'mousetrap';
import styled from 'styled-components';
import interactjs from 'interactjs';
import Position from './positions/Position';

type Props = {};

const GuideElement = styled.div.attrs({
  color: (props) => props.color,
  type: (props) => props.type
})`
  position: fixed;
  width: ${({ type }) => (type === 'h' ? '100vw' : '1px')};
  height: ${({ type }) => (type === 'h' ? '1px' : '100vh')};
  background: ${({ color }) => color};
  opacity: 0.6;
  &::after {
    content: '';
    display: block;
    position: absolute;
    z-index: -1;
    top: ${({ type }) => (type === 'h' ? '-4px' : '0')};
    left: ${({ type }) => (type === 'h' ? '0' : '-4px')};
    width: ${({ type }) => (type === 'h' ? '100vw' : '9px')};
    height: ${({ type }) => (type === 'h' ? '9px' : '100vh')};
    background: ${({ color }) => color};
    opacity: 0.1;
  }
  &:hover {
    opacity: 1;
  }
  & div {
    opacity: 0;
    transition: opacity 0.1s ease-in-out;
  }
  &:hover div {
    opacity: 1;
  }
`;

const setPosition = (el, x, y) => {
  el.style.webkitTransform = el.style.transform = `translate(${x}px,${y}px)`;
};

export default class Guide extends Component<Props> {
  props: Props;

  state = {
    x: 0,
    y: Math.floor(Math.random() * 100),
    type: 'h',
    color: 'green'
  };

  componentDidMount() {
    setPosition(this.el, this.state.x, this.state.y);

    interactjs(this.el).draggable({
      onmove: (event) => {
        const { x, y, type } = this.state;
        const { dx, dy, target } = event;
        const newX = type === 'h' ? 0 : x + dx;
        const newY = type === 'h' ? y + dy : 0;

        setPosition(target, newX, newY);

        this.setState({
          ...this.state,
          y: newY,
          x: newX
        });
      }
    });

    mousetrap.bind(
      ['up', 'shift+up', 'down', 'shift+down', 'left', 'shift+left', 'right', 'shift+right'],
      (e) => {
        const { type, x, y } = this.state;
        const { shiftKey, key } = e;
        const value = shiftKey ? 10 : 1;

        if (type === 'h') {
          if (key === 'ArrowUp') {
            this.setState({
              ...this.state,
              y: y - value,
              x: 0
            });
          } else if (key === 'ArrowDown') {
            this.setState({
              ...this.state,
              y: y + value,
              x: 0
            });
          }
        } else if (type === 'v') {
          if (key === 'ArrowLeft') {
            this.setState({
              ...this.state,
              x: x - value,
              y: 0
            });
          } else if (key === 'ArrowRight') {
            this.setState({
              ...this.state,
              x: x + value,
              y: 0
            });
          }
        }
      }
    );

    mousetrap.bind(['v', 'h'], (e) => {
      const { x, y } = this.state;
      const { key } = e;

      if (key !== this.state.type) {
        this.setState(
          {
            ...this.state,
            type: key,
            x: y,
            y: x
          },
          () => {
            setPosition(this.el, this.state.x, this.state.y);
          }
        );
      }
    });

    mousetrap.bind(['r', 'g', 'b', 'y'], (e) => {
      let color;
      switch (e.key) {
        case 'r':
          color = 'red';
          break;
        case 'g':
          color = 'green';
          break;
        case 'b':
          color = 'blue';
          break;
        case 'y':
          color = 'yellow';
          break;
        default:
          color = 'black';
      }

      this.setState({
        ...this.state,
        color
      });
    });
  }

  render() {
    const {
      x, y, type, color
    } = this.state;
    return (
      <div
        ref={(el) => {
          this.el = el;
        }}
      >
        <GuideElement type={type} color={color}>
          <Position x={x} y={y} type={type} color={color} />
        </GuideElement>
      </div>
    );
  }
}
