import * as chroma from 'chroma-js';
import * as interactjs from 'interactjs';
import * as mousetrap from 'mousetrap';
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { remove, setColor, split } from '../../actions/rulers';
import { Color } from '../../utils/Color';
import { Key } from '../../utils/Key';
import { move, resize } from '../core/reducer';
import { createGrid } from '../grid/utils';
import { Coords } from '../helpers/Coords';
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
import { Size } from '../helpers/Size';
import { MiniToolboxWrapper } from '../miniToolbox/MiniToolboxWrapper';
import { IRuler } from './IRuler';
import { RulerToolbox } from './RulerToolbox';
import { SplitDirection } from './SplitDirection';

const REMOVE_KEYS = [Key.BACKSPACE, Key.DEL];

interface IState {
  x: number;
  y: number;
  width: number;
  height: number;
  opacity: number;
}

interface IProps {
  color: Color;
  remove: (id: string) => void;
  setColor: (id: string, color: string) => void;
  split: (
    splitDirection: SplitDirection,
    id: string,
    x: number,
    y: number,
    width: number,
    height: number
  ) => void;
}

class RulerView extends React.Component<IRuler & IProps, IState> {
  public static getDerivedStateFromProps(nextProps, prevState) {
    return { ...nextProps, ...prevState };
  }

  private el: React.RefObject<HTMLDivElement> = React.createRef();
  private ruler: React.RefObject<HTMLDivElement> = React.createRef();

  public componentDidMount() {
    const el = this.el.current as HTMLDivElement;
    const ruler = this.ruler.current as HTMLDivElement;

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
        if (this.props.locked) {
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

  public componentWillUnmount() {
    const el = this.el.current as HTMLDivElement;

    stopListeningToIgnoreMouseEvents(el);
    stopListeningAndSwapZIndex(el);
    this.unbindKeys();

    el.removeEventListener('mouseover', this.bindKeys);
    el.removeEventListener('mouseout', this.unbindKeys);
  }

  public render() {
    const { x, y, width, height, opacity } = this.state;
    const { locked, color } = this.props;

    return (
      <RulerWrapper innerRef={this.el} locked={locked}>
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
          remove={() => {
            this.props.remove(this.props.id);
          }}
          color={this.props.color}
          setColor={this.updateColor}
          splitHorizontally={this.split(SplitDirection.HORIZONTAL)}
          splitVertically={this.split(SplitDirection.VERTICAL)}
        />
      </RulerWrapper>
    );
  }

  private bindKeys = () => {
    const el = this.el.current as HTMLDivElement;

    mousetrap.bind(ARROW_KEYS, ({ shiftKey, key }) => {
      if (this.props.locked) {
        return;
      }

      const { x, y } = this.state;
      const value = shiftKey ? 10 : 1;

      this.setState(getPositionByKey(key, x, y, value), () => {
        setPositionInDOM(el, this.state.x, this.state.y);
      });
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
  }

  private updateColor = (color: Color) => {
    this.props.setColor(this.props.id, color);
  }

  private split = (direction: SplitDirection) => () => {
    const isHorizontal = direction === SplitDirection.HORIZONTAL;
    this.setState(
      resize(
        isHorizontal ? this.state.width : this.state.width / 2,
        isHorizontal ? this.state.height / 2 : this.state.height
      ),
      () => {
        this.props.split(
          direction,
          this.props.id,
          this.state.x,
          this.state.y,
          this.state.width,
          this.state.height
        );
      }
    );
  }
}

const RulerWrapper = styled<{ locked: boolean }, 'div'>('div')`
  pointer-events: ${({ locked }) => (locked ? 'none' : 'all')};
  cursor: ${({ locked }) => (locked ? 'none' : 'inherit')};
  position: fixed;
  display: block;

  & ${Coords}, & ${Size}, & ${MiniToolboxWrapper} {
    opacity: 0;
    transition: opacity 100ms ease;
  }

  &:hover ${Coords}, &:hover ${Size} {
    opacity: 1;
  }

  & ${MiniToolboxWrapper} {
    bottom: -18px;
    opacity: 0;
    transition: all 100ms ease;
  }

  &:hover ${MiniToolboxWrapper} {
    bottom: -36px;
    opacity: 1;
  }
`;

interface IRulerElementProps {
  width: number;
  height: number;
  opacity: number;
  color: string;
}

const RulerElement = styled.div<IRulerElementProps>`
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

const Ruler = connect(
  null,
  {
    remove,
    setColor,
    split
  }
)(RulerView);

export { Ruler };
