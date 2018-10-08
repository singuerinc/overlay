import * as interactjs from 'interactjs';
import * as mousetrap from 'mousetrap';
import * as React from 'react';
import styled from 'styled-components';
import { Color } from '../../utils/Color';
import { track } from '../core/analytics';
import { move, setColor, toggleLock } from '../core/reducer';
import { COLOR_KEYS, getColorByKey } from '../helpers/getColorByKey';
import { ARROW_KEYS, getPositionByKey } from '../helpers/getPositionByKey';
import { setPositionInDOM } from '../helpers/impure';
import {
  startListeningAndSwapZIndex,
  startListeningToIgnoreMouseEvents,
  stopListeningAndSwapZIndex,
  stopListeningToIgnoreMouseEvents
} from '../helpers/mouseEvents';
import { isHorizontalOrientation } from '../helpers/orientation';
import { MiniToolboxWrapper } from '../miniToolbox/MiniToolboxWrapper';
import { GuideOrientation } from './GuideOrientation';
import { GuideToolbox } from './GuideToolbox';
import { IGuide } from './IGuide';
import { rotate } from './utils';

const isLocked = (state) => state.locked === true;

interface IState {
  x: number;
  y: number;
  orientation: GuideOrientation;
  color: Color;
  locked: boolean;
}

const horizontalVerticalKeys = ['v', 'h'];

interface IProps {
  remove: () => void;
}

export class Guide extends React.Component<IGuide & IProps, IState> {
  public static getDerivedStateFromProps(nextProps, prevState) {
    return { ...nextProps, ...prevState };
  }
  private el: React.RefObject<HTMLDivElement> = React.createRef();

  public componentDidMount() {
    const el = this.el.current as HTMLDivElement;

    startListeningToIgnoreMouseEvents(el);
    startListeningAndSwapZIndex(el);

    setPositionInDOM(el, this.state.x, this.state.y);

    interactjs(el).draggable({
      onmove: ({ dx, dy, target }) => {
        if (isLocked(this.state)) {
          return;
        }

        const { x, y, orientation } = this.state;
        const isHorizontal = isHorizontalOrientation(orientation);
        const newX = isHorizontal ? 0 : x + dx;
        const newY = isHorizontal ? y + dy : 0;

        setPositionInDOM(target, newX, newY);

        this.setState(move(newX, newY));
      }
    });

    el.addEventListener('mouseover', this.bindKeys);
    el.addEventListener('mouseout', this.unbindKeys);
  }

  public componentWilUnmount() {
    const el = this.el.current as HTMLDivElement;

    stopListeningToIgnoreMouseEvents(el);
    stopListeningAndSwapZIndex(el);

    this.unbindKeys();

    el.removeEventListener('mouseover', this.bindKeys);
    el.removeEventListener('mouseout', this.unbindKeys);
  }

  public render() {
    const { remove } = this.props;
    const { orientation, color, locked } = this.state;
    const isHorizontal = isHorizontalOrientation(orientation);
    return (
      <GuideElement
        innerRef={this.el}
        isHorizontal={isHorizontal}
        color={color}
      >
        <GuideToolbox
          remove={remove}
          rotate={this.updateRotate}
          locked={locked}
          toggleLock={() =>
            this.setState(toggleLock, () => {
              interactjs(this.el.current as HTMLDivElement).styleCursor(
                !this.state.locked
              );
              track('tool', 'guide', `locked/${this.state.locked}`);
            })
          }
          setColor={this.updateColor}
        />
      </GuideElement>
    );
  }

  private bindKeys = () => {
    mousetrap.bind(ARROW_KEYS, ({ shiftKey, key }) => {
      if (isLocked(this.state)) {
        return;
      }

      const { orientation, x, y } = this.state;
      const isHorizontal = orientation === GuideOrientation.HORIZONTAL;
      const value = shiftKey ? 10 : 1;
      const { x: nx, y: ny } = getPositionByKey(key, x, y, value);
      const moveTo = isHorizontal ? move(0, ny) : move(nx, 0);

      this.setState(moveTo, () =>
        setPositionInDOM(this.el.current, this.state.x, this.state.y)
      );
    });

    mousetrap.bind(horizontalVerticalKeys, ({ key }) => {
      if (key !== this.state.orientation) {
        this.updateRotate();
      }
    });

    mousetrap.bind(COLOR_KEYS, ({ key }) => {
      this.updateColor(getColorByKey(key));
    });
  }

  private unbindKeys = () => {
    mousetrap.unbind(ARROW_KEYS);
    mousetrap.unbind(horizontalVerticalKeys);
    mousetrap.unbind(COLOR_KEYS);
  }

  private updateColor = (color: Color) => {
    this.setState(setColor(color), () => {
      track('tool', 'guide', `color/${this.state.color}`);
    });
  }

  private updateRotate = () => {
    const next = isHorizontalOrientation(this.state.orientation)
      ? GuideOrientation.VERTICAL
      : GuideOrientation.HORIZONTAL;
    this.setState(rotate(next), () => {
      setPositionInDOM(this.el.current, this.state.x, this.state.y);
      track('tool', 'guide', `rotate/${this.state.orientation}`);
    });
  }
}

interface IGuideElementProps {
  color: string;
  isHorizontal: boolean;
}

const GuideElement = styled.div<IGuideElementProps>`
  position: fixed;
  width: ${({ isHorizontal }) => (isHorizontal ? '100vw' : '1px')};
  height: ${({ isHorizontal }) => (isHorizontal ? '1px' : '100vh')};
  background: ${({ color }) => color};
  opacity: 0.6;
  &::after {
    content: '';
    display: block;
    position: absolute;
    z-index: -1;
    top: ${({ isHorizontal }) => (isHorizontal ? '-4px' : '0')};
    left: ${({ isHorizontal }) => (isHorizontal ? '0' : '-4px')};
    width: ${({ isHorizontal }) => (isHorizontal ? '100vw' : '9px')};
    height: ${({ isHorizontal }) => (isHorizontal ? '9px' : '100vh')};
    background: ${({ color }) => color};
    opacity: 0;
  }

  &:hover {
    opacity: 1;
  }

  & ${MiniToolboxWrapper} {
    opacity: 0;
    transition: opacity 300ms ease;
  }

  &:hover ${MiniToolboxWrapper} {
    opacity: 1;
  }
`;
