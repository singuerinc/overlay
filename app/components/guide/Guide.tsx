import * as React from 'react';
import * as mousetrap from 'mousetrap';
import styled from 'styled-components';
import * as interactjs from 'interactjs';
import Position from '../positions/Position';
import { IGuide as Props } from './IGuide.d';

type Direction = 'h' | 'v';

interface State {
  x: number;
  y: number;
  type: Direction;
  color: 'red' | 'green' | 'blue' | 'yellow' | 'black';
}

interface GuideElementProps {
  color: string;
  type: string;
}

const GuideElement = styled.div.attrs<GuideElementProps>({
  color: (props: GuideElementProps) => props.color,
  type: (props: GuideElementProps) => props.type
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

const arrowKeys = [
  'up',
  'shift+up',
  'down',
  'shift+down',
  'left',
  'shift+left',
  'right',
  'shift+right'
];

const horizontalVerticalKeys = ['v', 'h'];
const colorKeys = ['r', 'g', 'b', 'y'];

const setPosition = (el, x, y) => {
  el.style.webkitTransform = el.style.transform = `translate(${x}px,${y}px)`;
};

export default class Guide extends React.Component<Props, State> {
  private el: HTMLDivElement;

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      ...prevState,
      x: nextProps.x,
      y: nextProps.y,
      type: nextProps.type,
      color: nextProps.color
    };
  }

  bindKeys() {
    mousetrap.bind(arrowKeys, ({ shiftKey, key }) => {
      const { type, x, y } = this.state;
      const value = shiftKey ? 10 : 1;

      if (type === 'h') {
        if (key === 'ArrowUp') {
          this.setState(
            {
              ...this.state,
              y: y - value,
              x: 0
            },
            () => setPosition(this.el, this.state.x, this.state.y)
          );
        } else if (key === 'ArrowDown') {
          this.setState(
            {
              ...this.state,
              y: y + value,
              x: 0
            },
            () => setPosition(this.el, this.state.x, this.state.y)
          );
        }
      } else if (type === 'v') {
        if (key === 'ArrowLeft') {
          this.setState(
            {
              ...this.state,
              x: x - value,
              y: 0
            },
            () => setPosition(this.el, this.state.x, this.state.y)
          );
        } else if (key === 'ArrowRight') {
          this.setState(
            {
              ...this.state,
              x: x + value,
              y: 0
            },
            () => setPosition(this.el, this.state.x, this.state.y)
          );
        }
      }
    });

    mousetrap.bind(horizontalVerticalKeys, ({ key }) => {
      const { x, y } = this.state;

      if (key !== this.state.type) {
        this.setState(
          {
            ...this.state,
            type: key as Direction,
            x: y,
            y: x
          },
          () => setPosition(this.el, this.state.x, this.state.y)
        );
      }
    });

    mousetrap.bind(colorKeys, ({ key }) => {
      let color;
      switch (key) {
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

  unbindKeys() {
    mousetrap.unbind(arrowKeys);
    mousetrap.unbind(horizontalVerticalKeys);
    mousetrap.unbind(colorKeys);
  }

  componentDidMount() {
    setPosition(this.el, this.state.x, this.state.y);

    interactjs(this.el).draggable({
      onmove: ({ dx, dy, target }) => {
        const { x, y, type } = this.state;
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

    this.el.addEventListener('mouseover', () => this.bindKeys());
    this.el.addEventListener('mouseout', () => this.unbindKeys());
  }

  render() {
    const { x, y, type, color } = this.state;
    return (
      <div
        ref={(el) => {
          this.el = el as HTMLDivElement;
        }}
      >
        <GuideElement type={type} color={color}>
          <Position x={x} y={y} type={type} color={color} />
        </GuideElement>
      </div>
    );
  }
}
