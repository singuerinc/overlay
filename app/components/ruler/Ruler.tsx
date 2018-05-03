import * as React from 'react';
import * as mousetrap from 'mousetrap';
import styled from 'styled-components';
import { Coords } from '../helpers/Coords';
import { Size } from '../helpers/Size';
import { IRuler } from './IRuler.d';
import { createGrid } from '../grid/utils';
import * as chroma from 'chroma-js';
import { RulerToolbox } from './RulerToolbox';
import { MiniToolboxWrapper } from '../miniToolbox/MiniToolboxWrapper';
import { Color } from '../../utils/Color';
import * as uuid from 'uuid/v1';
import { setPosition } from '../helpers/setPosition';
import { draggable } from '../helpers/draggable';
import { getPositionByKey, ARROW_KEYS } from '../helpers/getPositionByKey';
import { COLOR_KEYS, getColorByKey } from '../helpers/getColorByKey';

interface State {
  x: number;
  y: number;
  width: number;
  height: number;
  opacity: number;
  color: Color;
  locked: boolean;
}

const RulerWrapper = styled.div.attrs({})`
  position: fixed;
  display: block;

  & ${Coords}, & ${Size}, & ${MiniToolboxWrapper} {
    display: none;
  }

  &:hover ${Coords}, &:hover ${Size}, &:hover ${MiniToolboxWrapper} {
    display: flex;
  }
`;

const RulerElement = styled.div.attrs<{
  width: number;
  height: number;
  opacity: number;
  color: string;
}>({
  width: (props) => props.width,
  height: (props) => props.height,
  color: (props) => props.color,
  opacity: (props) => props.opacity
})`
  position: relative;
  top: 0;
  left: 0;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background-image: url(${({ color }) => createGrid(10, color, 'solid')});
  background-repeat: repeat;
  background-color: ${({ color, opacity }) =>
    chroma(color)
      .alpha(opacity)
      .css()};
`;

interface Props {
  duplicate: (ruler: IRuler) => void;
  remove: () => void;
}

export default class Ruler extends React.Component<IRuler & Props, State> {
  private el;

  static getDerivedStateFromProps(nextProps, prevState) {
    return { ...nextProps, ...prevState };
  }

  constructor(props) {
    super(props);
    this.el = React.createRef();
  }

  componentDidMount() {
    setPosition(this.el.current, this.state.x, this.state.y);
    draggable(this.el.current, this.setState.bind(this));

    this.el.current.addEventListener('mouseover', this.bindKeys);
    this.el.current.addEventListener('mouseout', this.unbindKeys);
  }

  componentWillUnmount() {
    this.unbindKeys();

    this.el.current.removeEventListener('mouseover', this.bindKeys);
    this.el.current.removeEventListener('mouseout', this.unbindKeys);
  }

  bindKeys = () => {
    mousetrap.bind(ARROW_KEYS, ({ shiftKey, key }) => {
      if (this.state.locked) {
        return;
      }

      const { x, y } = this.state;
      const value = shiftKey ? 10 : 1;

      this.setState(getPositionByKey(key, x, y, value), () => {
        setPosition(this.el.current, this.state.x, this.state.y);
      });
    });

    mousetrap.bind(COLOR_KEYS, ({ key }) => {
      this.setColor(getColorByKey(key));
    });
  };

  unbindKeys = () => {
    mousetrap.unbind(ARROW_KEYS);
  };

  toggleLock = () => {
    this.setState({ locked: !this.state.locked });
  };

  setColor = (color: Color) => {
    this.setState({ color });
  };

  render() {
    const { duplicate, remove } = this.props;
    const { x, y, width, height, opacity, color, locked } = this.state;
    return (
      <RulerWrapper innerRef={this.el}>
        <Coords x={x} y={y} />
        <Size width={width} height={height} />
        <RulerElement
          width={width}
          height={height}
          color={color}
          opacity={opacity}
        />
        <RulerToolbox
          duplicate={() =>
            duplicate({
              ...this.state,
              id: uuid()
            })
          }
          remove={remove}
          locked={locked}
          toggleLock={this.toggleLock}
          setColor={this.setColor}
        />
      </RulerWrapper>
    );
  }
}
