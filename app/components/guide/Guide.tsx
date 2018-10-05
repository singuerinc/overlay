import * as interactjs from 'interactjs';
import * as mousetrap from 'mousetrap';
import * as React from 'react';
import styled from 'styled-components';
import { Color } from '../../utils/Color';
import { COLOR_KEYS, getColorByKey } from '../helpers/getColorByKey';
import { ARROW_KEYS, getPositionByKey } from '../helpers/getPositionByKey';
import {
  startListeningToIgnoreMouseEvents,
  stopListeningToIgnoreMouseEvents,
  startListeningAndSwapZIndex,
  stopListeningAndSwapZIndex
} from '../helpers/mouseEvents';
import { setPositionInDOM } from '../helpers/setPosition';
import { MiniToolboxWrapper } from '../miniToolbox/MiniToolboxWrapper';
import { GuideToolbox } from './GuideToolbox';
import { IGuide } from './IGuide.d';
import { GuideDirection, IGuideDirection } from './IGuideDirection';
import { rotate, move, setColor, toggleLock } from './utils';

interface State {
  x: number;
  y: number;
  type: IGuideDirection;
  color: Color;
  locked: boolean;
}

const horizontalVerticalKeys = ['v', 'h'];

interface Props {
  remove: () => void;
}

export default class Guide extends React.Component<IGuide & Props, State> {
  private el: React.RefObject<HTMLDivElement>;

  constructor(props) {
    super(props);
    this.el = React.createRef();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return { ...nextProps, ...prevState };
  }

  bindKeys = () => {
    mousetrap.bind(ARROW_KEYS, ({ shiftKey, key }) => {
      if (this.state.locked) {
        return;
      }

      const { type, x, y } = this.state;
      const value = shiftKey ? 10 : 1;

      const { x: nx, y: ny } = getPositionByKey(key, x, y, value);

      if (type === GuideDirection.HORIZONTAL) {
        this.setState(move(0, ny), () =>
          setPositionInDOM(this.el.current, this.state.x, this.state.y)
        );
      } else if (type === GuideDirection.VERTICAL) {
        this.setState(move(nx, 0), () =>
          setPositionInDOM(this.el.current, this.state.x, this.state.y)
        );
      }
    });

    mousetrap.bind(horizontalVerticalKeys, ({ key }) => {
      if (key !== this.state.type) {
        const type: IGuideDirection = key as IGuideDirection;

        this.setState(rotate(type), () => {
          setPositionInDOM(this.el.current, this.state.x, this.state.y);
        });
      }
    });

    mousetrap.bind(COLOR_KEYS, ({ key }) => {
      this.setState({ color: getColorByKey(key) });
    });
  };

  unbindKeys = () => {
    mousetrap.unbind(ARROW_KEYS);
    mousetrap.unbind(horizontalVerticalKeys);
    mousetrap.unbind(COLOR_KEYS);
  };

  componentDidMount() {
    const el = this.el.current as HTMLDivElement;

    startListeningToIgnoreMouseEvents(el);
    startListeningAndSwapZIndex(el);
    setPositionInDOM(el, this.state.x, this.state.y);

    interactjs(el).draggable({
      onmove: ({ dx, dy, target }) => {
        if (this.state.locked) {
          return;
        }

        const { x, y, type } = this.state;
        const newX = type === GuideDirection.HORIZONTAL ? 0 : x + dx;
        const newY = type === GuideDirection.HORIZONTAL ? y + dy : 0;

        setPositionInDOM(target, newX, newY);

        this.setState(move(newX, newY));
      }
    });

    el.addEventListener('mouseover', this.bindKeys);
    el.addEventListener('mouseout', this.unbindKeys);
  }

  componentWillUnmount() {
    const el = this.el.current as HTMLDivElement;

    stopListeningToIgnoreMouseEvents(el);
    stopListeningAndSwapZIndex(el);
    this.unbindKeys();

    el.removeEventListener('mouseover', this.bindKeys);
    el.removeEventListener('mouseout', this.unbindKeys);
  }

  render() {
    const { remove } = this.props;
    const { type, color, locked } = this.state;
    return (
      <div ref={this.el}>
        <GuideElement type={type} color={color}>
          <GuideToolbox
            remove={remove}
            rotate={() =>
              this.setState(rotate(type), () => {
                setPositionInDOM(this.el.current, this.state.x, this.state.y);
              })
            }
            locked={locked}
            toggleLock={() => this.setState(toggleLock)}
            setColor={(color: Color) => {
              this.setState(setColor(color));
            }}
          />
        </GuideElement>
      </div>
    );
  }
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
