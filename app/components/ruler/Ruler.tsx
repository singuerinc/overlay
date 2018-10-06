import * as chroma from 'chroma-js';
import * as interactjs from 'interactjs';
import * as mousetrap from 'mousetrap';
import * as React from 'react';
import styled from 'styled-components';
import { Color } from '../../utils/Color';
import { setColor, toggleLock, resize, move } from '../core/reducer';
import { createGrid } from '../grid/utils';
import { Coords } from '../helpers/Coords';
import { COLOR_KEYS, getColorByKey } from '../helpers/getColorByKey';
import { ARROW_KEYS, getPositionByKey } from '../helpers/getPositionByKey';
import { setPositionInDOM } from '../helpers/impure';
import {
  startListeningAndSwapZIndex,
  startListeningToIgnoreMouseEvents,
  stopListeningAndSwapZIndex,
  stopListeningToIgnoreMouseEvents
} from '../helpers/mouseEvents';
import { Size } from '../helpers/Size';
import { MiniToolboxWrapper } from '../miniToolbox/MiniToolboxWrapper';
import { IRuler } from './IRuler';
import { RulerToolbox } from './RulerToolbox';

interface State {
  x: number;
  y: number;
  width: number;
  height: number;
  opacity: number;
  color: Color;
  locked: boolean;
}

interface Props {
  duplicate: (rulerInfo: object) => void;
  remove: () => void;
}

export default class Ruler extends React.Component<IRuler & Props, State> {
  private el: React.RefObject<HTMLDivElement> = React.createRef();
  private ruler: React.RefObject<HTMLDivElement> = React.createRef();

  static getDerivedStateFromProps(nextProps, prevState) {
    return { ...nextProps, ...prevState };
  }

  componentDidMount() {
    const el = this.el.current as HTMLDivElement;
    const ruler = this.ruler.current as HTMLDivElement;

    startListeningToIgnoreMouseEvents(el);
    startListeningAndSwapZIndex(el);
    setPositionInDOM(el, this.state.x, this.state.y);

    interactjs(el).draggable({
      onmove: ({ dx, dy, target }) => {
        if (this.state.locked) {
          return;
        }

        const x = (parseFloat(target.getAttribute('data-x')) || 0) + dx;
        const y = (parseFloat(target.getAttribute('data-y')) || 0) + dy;

        setPositionInDOM(el, x, y);

        this.setState(move(x, y));
      }
    });

    interactjs(ruler)
      .resizable({
        edges: { left: false, right: true, bottom: true, top: false },
        restrictSize: {
          min: { width: 10, height: 10 }
        }
      })
      .on('resizemove', ({ rect, target, deltaRect }) => {
        if (this.state.locked) {
          return;
        }

        let x = parseFloat(target.getAttribute('data-x')) || 0;
        let y = parseFloat(target.getAttribute('data-y')) || 0;

        target.style.width = rect.width + 'px';
        target.style.height = rect.height + 'px';

        x += deltaRect.left;
        y += deltaRect.top;

        setPositionInDOM(target, x, y);

        this.setState(resize(rect.width, rect.height));
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

  bindKeys = () => {
    const el = this.el.current as HTMLDivElement;

    mousetrap.bind(ARROW_KEYS, ({ shiftKey, key }) => {
      if (this.state.locked) {
        return;
      }

      const { x, y } = this.state;
      const value = shiftKey ? 10 : 1;

      this.setState(getPositionByKey(key, x, y, value), () => {
        setPositionInDOM(el, this.state.x, this.state.y);
      });
    });

    mousetrap.bind(COLOR_KEYS, ({ key }) => {
      this.setState(setColor(getColorByKey(key)));
    });
  };

  unbindKeys = () => {
    mousetrap.unbind(ARROW_KEYS);
  };

  render() {
    const { remove } = this.props;
    const { x, y, width, height, opacity, color, locked } = this.state;
    return (
      <RulerWrapper innerRef={this.el}>
        <Coords x={x} y={y} />
        <Size width={width} height={height} />
        <RulerElement
          innerRef={this.ruler}
          width={width}
          height={height}
          color={color}
          opacity={opacity}
        />
        <RulerToolbox
          duplicate={() =>
            this.props.duplicate({
              x,
              y,
              width,
              height,
              opacity,
              color,
              locked
            })
          }
          remove={remove}
          locked={locked}
          toggleLock={() => this.setState(toggleLock)}
          setColor={(color: Color) => this.setState(setColor(color))}
        />
      </RulerWrapper>
    );
  }
}

const RulerWrapper = styled.div`
  position: fixed;
  display: block;

  & ${Coords}, & ${Size}, & ${MiniToolboxWrapper} {
    opacity: 0;
    transition: opacity 300ms ease;
  }

  &:hover ${Coords}, &:hover ${Size} {
    opacity: 1;
  }

  & ${MiniToolboxWrapper} {
    bottom: -18px;
    opacity: 0;
    transition: all 300ms ease;
  }

  &:hover ${MiniToolboxWrapper} {
    bottom: -36px;
    opacity: 1;
  }
`;

interface RulerElementProps {
  width: number;
  height: number;
  opacity: number;
  color: string;
}

const RulerElement = styled.div<RulerElementProps>`
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
