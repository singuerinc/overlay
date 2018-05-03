import * as React from 'react';
import * as mousetrap from 'mousetrap';
import styled from 'styled-components';
import * as interactjs from 'interactjs';
import { IGuide } from './IGuide.d';
import { IGuideDirection, GuideDirection } from './IGuideDirection';
import { GuideToolbox } from './GuideToolbox';
import { MiniToolboxWrapper } from '../miniToolbox/MiniToolboxWrapper';
import { Color } from '../../utils/Color';
import { setPosition } from '../helpers/setPosition';
import { getPositionByKey, ARROW_KEYS } from '../helpers/getPositionByKey';
import { COLOR_KEYS, getColorByKey } from '../helpers/getColorByKey';

interface State {
  x: number;
  y: number;
  type: IGuideDirection;
  color: Color;
  locked: boolean;
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

const horizontalVerticalKeys = ['v', 'h'];

interface Props {
  remove: () => void;
}

export default class Guide extends React.Component<IGuide & Props, State> {
  private el;

  constructor(props) {
    super(props);
    this.el = React.createRef();
  }

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
      setPosition(this.el.current, this.state.x, this.state.y)
    );
  };

  setColor = (color: Color) => {
    this.setState({ color });
  };

  toggleLock = () => {
    this.setState({ locked: !this.state.locked });
  };

  bindKeys = () => {
    mousetrap.bind(ARROW_KEYS, ({ shiftKey, key }) => {
      if (this.state.locked) {
        return;
      }

      const { type, x, y } = this.state;
      const value = shiftKey ? 10 : 1;

      const { x: nx, y: ny } = getPositionByKey(key, x, y, value);

      if (type === GuideDirection.HORIZONTAL) {
        this.setState({ y: ny, x: 0 }, () =>
          setPosition(this.el.current, this.state.x, this.state.y)
        );
      } else if (type === GuideDirection.VERTICAL) {
        this.setState({ x: nx, y: 0 }, () =>
          setPosition(this.el.current, this.state.x, this.state.y)
        );
      }
    });

    mousetrap.bind(horizontalVerticalKeys, ({ key }) => {
      if (key !== this.state.type) {
        this.rotate(key as IGuideDirection);
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
    setPosition(this.el.current, this.state.x, this.state.y);

    interactjs(this.el.current).draggable({
      onmove: ({ dx, dy, target }) => {
        const { x, y, type } = this.state;
        const newX = type === 'h' ? 0 : x + dx;
        const newY = type === 'h' ? y + dy : 0;

        setPosition(target, newX, newY);

        this.setState({ y: newY, x: newX });
      }
    });

    this.el.current.addEventListener('mouseover', this.bindKeys);
    this.el.current.addEventListener('mouseout', this.unbindKeys);
  }

  componentWillUnmount() {
    this.unbindKeys();

    this.el.current.removeEventListener('mouseover', this.bindKeys);
    this.el.current.removeEventListener('mouseout', this.unbindKeys);
  }

  render() {
    const { remove } = this.props;
    const { type, color, locked } = this.state;
    return (
      <div ref={this.el}>
        <GuideElement type={type} color={color}>
          <GuideToolbox
            remove={remove}
            rotate={this.rotate}
            locked={locked}
            toggleLock={this.toggleLock}
            setColor={(color: Color) => this.setColor(color)}
          />
        </GuideElement>
      </div>
    );
  }
}
