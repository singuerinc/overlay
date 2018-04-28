import * as React from 'react';
import * as mousetrap from 'mousetrap';
import styled from 'styled-components';
import * as interactjs from 'interactjs';
import { IGuide } from './IGuide.d';
import { IGuideDirection, GuideDirection } from './IGuideDirection';
import { GuideToolbox } from './GuideToolbox';
import { MiniToolboxWrapper } from '../miniToolbox/MiniToolboxWrapper';

interface State {
  x: number;
  y: number;
  type: IGuideDirection;
  color: 'red' | 'green' | 'blue' | 'yellow' | 'black';
}

interface GuideElementProps {
  color: string;
  type: string;
}

const GuideElement = styled.div.attrs<GuideElementProps>({
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
    opacity: 0;
  }

  &:hover {
    opacity: 1;
  }

  & ${MiniToolboxWrapper} {
    opacity: 0;
  }

  &:hover ${MiniToolboxWrapper} {
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

interface Props {
  remove: () => void;
}

export default class Guide extends React.Component<IGuide & Props, State> {
  private el: HTMLDivElement;

  static getDerivedStateFromProps(nextProps, prevState) {
    return { ...nextProps, ...prevState };
  }

  rotate = (type?: IGuideDirection) => {
    let { x, y } = this.state;

    if (!type) {
      type =
        this.state.type === GuideDirection.HORIZONTAL
          ? GuideDirection.VERTICAL
          : GuideDirection.HORIZONTAL;
    }

    if (type === GuideDirection.HORIZONTAL) {
      y = Math.floor(window.screen.height * 0.5);
      x = 0;
    } else {
      x = Math.floor(window.screen.width * 0.5);
      y = 0;
    }

    this.setState({ type, x, y }, () =>
      setPosition(this.el, this.state.x, this.state.y)
    );
  };

  bindKeys() {
    mousetrap.bind(arrowKeys, ({ shiftKey, key }) => {
      const { type, x, y } = this.state;
      const value = shiftKey ? 10 : 1;

      if (type === GuideDirection.HORIZONTAL) {
        if (key === 'ArrowUp') {
          this.setState({ y: y - value, x: 0 }, () =>
            setPosition(this.el, this.state.x, this.state.y)
          );
        } else if (key === 'ArrowDown') {
          this.setState({ y: y + value, x: 0 }, () =>
            setPosition(this.el, this.state.x, this.state.y)
          );
        }
      } else if (type === GuideDirection.VERTICAL) {
        if (key === 'ArrowLeft') {
          this.setState({ x: x - value, y: 0 }, () =>
            setPosition(this.el, this.state.x, this.state.y)
          );
        } else if (key === 'ArrowRight') {
          this.setState({ x: x + value, y: 0 }, () =>
            setPosition(this.el, this.state.x, this.state.y)
          );
        }
      }
    });

    mousetrap.bind(horizontalVerticalKeys, ({ key }) => {
      if (key !== this.state.type) {
        this.rotate(key as IGuideDirection);
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

      this.setState({ color });
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

        this.setState({ y: newY, x: newX });
      }
    });

    this.el.addEventListener('mouseover', () => this.bindKeys());
    this.el.addEventListener('mouseout', () => this.unbindKeys());
  }

  render() {
    const { remove } = this.props;
    const { type, color } = this.state;
    return (
      <div
        ref={(el) => {
          this.el = el as HTMLDivElement;
        }}
      >
        <GuideElement type={type} color={color}>
          <GuideToolbox remove={remove} rotate={this.rotate} />
        </GuideElement>
      </div>
    );
  }
}
