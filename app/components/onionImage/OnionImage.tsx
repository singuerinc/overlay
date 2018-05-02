import * as React from 'react';
import * as mousetrap from 'mousetrap';
import styled from 'styled-components';
import { Coords } from '../helpers/Coords';
import { Size } from '../helpers/Size';
import { IOnionImage } from './IOnionImage.d';
import { OnionToolbox } from './OnionToolbox';
import { MiniToolboxWrapper } from '../miniToolbox/MiniToolboxWrapper';
import { draggable } from '../helpers/draggable';
import { setPosition } from '../helpers/setPosition';

interface State {
  opacity: number;
  inverted: boolean;
  visible: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
}

const OnionImageWrapper = styled.div`
  position: fixed;

  & ${Coords}, & ${Size}, & ${MiniToolboxWrapper} {
    display: none;
  }

  &:hover ${Coords}, &:hover ${Size}, &:hover ${MiniToolboxWrapper} {
    display: flex;
  }
`;

const OnionImageElement = styled.img.attrs<{ opacity; inverted; visible }>({
  opacity: (props) => props.opacity,
  inverted: (props) => props.inverted,
  visible: (props) => props.visible
})`
  opacity: ${({ opacity }) => opacity};
  filter: invert(${({ inverted }) => (inverted ? '100%' : '0%')});
  display: ${({ visible }) => (visible ? 'block' : 'none')};
`;

const opacityNumberKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const opacityLettersKeys = ['=', '+', '-', '_'];
const invertKeys = 'i';
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

interface Props {
  remove: () => void;
}

export default class OnionImage extends React.Component<
  IOnionImage & Props,
  State
> {
  private el;
  private image;

  constructor(props) {
    super(props);
    this.el = React.createRef();
    this.image = React.createRef();
  }

  setInverted = (value: boolean) => {
    this.setState({
      inverted: value
    });
  };

  setVisibility = (value: boolean) => {
    this.setState({
      visible: value
    });
  };

  setOpacity = (value: number) => {
    this.setState({
      opacity: value
    });
  };

  bindKeys() {
    mousetrap.bind(opacityNumberKeys, ({ key }) => {
      const val = parseInt(key, 10) * 0.1;
      this.setState({
        ...this.state,
        opacity: parseFloat((val === 0 ? 1 : val).toFixed(1))
      });
    });

    mousetrap.bind(opacityLettersKeys, ({ keyCode }) => {
      let value = 0.05;
      if (keyCode === 45 || keyCode === 95) {
        // - 45 _ 95
        value *= -1;
      } else if (keyCode === 61 || keyCode === 43) {
        // = 61 + 43
        value *= 1;
      }

      const { opacity } = this.state;
      const newOpacity: number = parseFloat(
        Math.max(0, Math.min(1, opacity + value)).toFixed(1)
      );

      this.setState({
        opacity: newOpacity
      });
    });

    mousetrap.bind(invertKeys, () => {
      this.setInverted(!this.state.inverted);
    });

    mousetrap.bind(arrowKeys, ({ shiftKey, key }) => {
      const el = this.el.current;
      const { x, y } = this.state;
      const value = shiftKey ? 10 : 1;

      if (key === 'ArrowUp') {
        this.setState({ y: y - value }, () => setPosition(el, x, y));
      } else if (key === 'ArrowDown') {
        this.setState({ y: y + value }, () => setPosition(el, x, y));
      } else if (key === 'ArrowLeft') {
        this.setState({ x: x - value }, () => setPosition(el, x, y));
      } else if (key === 'ArrowRight') {
        this.setState({ x: x + value }, () => setPosition(el, x, y));
      }
    });
  }

  unbindKeys() {
    mousetrap.unbind(opacityLettersKeys);
    mousetrap.unbind(opacityNumberKeys);
    mousetrap.unbind(invertKeys);
    mousetrap.unbind(arrowKeys);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return { ...nextProps, ...prevState };
  }

  componentDidMount() {
    setPosition(this.el.current, this.state.x, this.state.y);

    this.image.current.onload = (() => {
      this.setState({
        width: this.image.current.width,
        height: this.image.current.height
      });
    }).bind(this);

    this.el.current.addEventListener('mouseover', () => this.bindKeys());
    this.el.current.addEventListener('mouseout', () => this.unbindKeys());

    draggable(this.el.current, this.setState.bind(this));
  }

  render() {
    const { src, remove } = this.props;
    const { opacity, visible, inverted, x, y, height, width } = this.state;
    return (
      <OnionImageWrapper innerRef={this.el}>
        <OnionImageElement
          innerRef={this.image}
          src={src}
          visible={visible}
          opacity={opacity}
          inverted={inverted}
        />
        <Coords x={x} y={y} />
        <Size width={width} height={height} />
        <OnionToolbox
          opacity={opacity}
          inverted={inverted}
          visible={visible}
          setInverted={this.setInverted}
          setOpacity={this.setOpacity}
          setVisibility={this.setVisibility}
          remove={remove}
          x={100}
          y={100}
        />
      </OnionImageWrapper>
    );
  }
}
