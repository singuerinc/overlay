import * as interactjs from 'interactjs';
import * as mousetrap from 'mousetrap';
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { remove } from '../../actions/guides';
import { track } from '../../utils/analytics';
import { Color } from '../../utils/Color';
import { Key } from '../../utils/Key';
import { move, setColor } from '../core/reducer';
import { COLOR_KEYS, getColorByKey } from '../helpers/getColorByKey';
import { ARROW_KEYS, getPositionByKey } from '../helpers/getPositionByKey';
import { setPositionInDOM } from '../helpers/impure';
import {
  startListeningAndSwapZIndex,
  startListeningToIgnoreMouseEvents,
  stopListeningAndSwapZIndex,
  stopListeningToIgnoreMouseEvents,
  toTopZIndex
} from '../helpers/mouseEvents';
import { isHorizontalOrientation } from '../helpers/orientation';
import { MiniToolboxWrapper } from '../miniToolbox/MiniToolboxWrapper';
import { Tool } from '../toolbox/Tool';
import { GuideOrientation } from './GuideOrientation';
import { GuideToolbox } from './GuideToolbox';
import { IGuide } from './IGuide';
import { rotate } from './utils';

interface IState {
  x: number;
  y: number;
  orientation: GuideOrientation;
  color: Color;
}

const REMOVE_KEYS = [Key.BACKSPACE, Key.DEL];
const HORIZONTAL_VERTICAL_KEYS = [Key.V, Key.H];

interface IProps {
  remove: (id: string) => void;
}

class GuideView extends React.Component<IGuide & IProps, IState> {
  public static getDerivedStateFromProps(nextProps, prevState) {
    return { ...nextProps, ...prevState };
  }
  private el: React.RefObject<HTMLDivElement> = React.createRef();

  public componentDidUpdate(prevProps) {
    const { locked } = this.props;
    if (locked !== prevProps.locked) {
      interactjs(this.el.current as HTMLDivElement).styleCursor(!locked);
    }
  }

  public componentDidMount() {
    const el = this.el.current as HTMLDivElement;

    toTopZIndex(el);

    startListeningToIgnoreMouseEvents(el);
    startListeningAndSwapZIndex(el);

    setPositionInDOM(el, this.state.x, this.state.y);

    interactjs(el).draggable({
      onend: ({ target }) => {
        const x = parseInt(target.getAttribute('data-x'), 10);
        const y = parseInt(target.getAttribute('data-y'), 10);

        setPositionInDOM(el, x, y);

        this.setState(move(x, y));
      },
      onmove: ({ dx, dy, target }) => {
        if (this.props.locked) {
          return;
        }

        const { x, y, orientation } = this.state;
        const isHorizontal = isHorizontalOrientation(orientation);
        const newX = Math.round(isHorizontal ? 0 : x + dx);
        const newY = Math.round(isHorizontal ? y + dy : 0);

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
    const { orientation, color } = this.state;
    const isHorizontal = isHorizontalOrientation(orientation);

    return (
      <GuideElement
        innerRef={this.el}
        isHorizontal={isHorizontal}
        color={color}
      >
        <GuideToolbox
          // FIXME: don't create functions in render
          remove={() => this.props.remove(this.props.id)}
          rotate={this.updateRotate}
          setColor={this.updateColor}
        />
      </GuideElement>
    );
  }

  private bindKeys = () => {
    mousetrap.bind(ARROW_KEYS, ({ shiftKey, key }) => {
      if (this.props.locked) {
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

    mousetrap.bind(HORIZONTAL_VERTICAL_KEYS, ({ key }) => {
      if (key !== this.state.orientation.toString()) {
        this.updateRotate();
      }
    });

    mousetrap.bind(COLOR_KEYS, ({ key }) => {
      this.updateColor(getColorByKey(key));
    });

    mousetrap.bind(REMOVE_KEYS, () => {
      this.props.remove(this.props.id);
    });
  }

  private unbindKeys = () => {
    mousetrap.unbind(REMOVE_KEYS);
    mousetrap.unbind(ARROW_KEYS);
    mousetrap.unbind(HORIZONTAL_VERTICAL_KEYS);
    mousetrap.unbind(COLOR_KEYS);
  }

  private updateColor = (color: Color) => {
    this.setState(setColor(color), () => {
      track('tool', Tool.GUIDE, `color/${this.state.color}`);
    });
  }

  private updateRotate = () => {
    const next = isHorizontalOrientation(this.state.orientation)
      ? GuideOrientation.VERTICAL
      : GuideOrientation.HORIZONTAL;
    this.setState(rotate(next), () => {
      setPositionInDOM(this.el.current, this.state.x, this.state.y);
      track('tool', Tool.GUIDE, `rotate/${this.state.orientation}`);
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
    transition: opacity 100ms ease;
  }

  &:hover ${MiniToolboxWrapper} {
    opacity: 1;
  }
`;

const Guide = connect(
  null,
  {
    remove
  }
)(GuideView);

export { Guide };
