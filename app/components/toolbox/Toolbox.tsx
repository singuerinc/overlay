import * as React from 'react';
import styled from 'styled-components';
import { draggable } from '../helpers/draggable';
import { setPositionInDOM } from '../helpers/impure';
import {
  startListeningToIgnoreMouseEvents,
  stopListeningToIgnoreMouseEvents
} from '../helpers/mouseEvents';
import { MiniToolboxIcon } from '../miniToolbox/MiniToolboxIcon';
import { MiniToolboxItem } from '../miniToolbox/MiniToolboxItem';
import { Tool } from './Tool';
import { ToolboxItemDumb } from './ToolboxItemDumb';

interface IProps {
  x: number;
  y: number;
  isStuffVisible: boolean;
  isColumnVisible: boolean;
  isGridVisible: boolean;
  toggleVisibility: () => void;
  create: (tool: Tool) => void;
  toggle: (tool: Tool) => void;
  toggleHelp: () => void;
}

interface IState {
  visible: boolean;
  onTop: boolean;
  isMenuOpen: boolean;
  x: number;
  y: number;
}

export class Toolbox extends React.Component<IProps, IState> {
  public static getDerivedStateFromProps(nextProps, prevState) {
    return { ...nextProps, ...prevState };
  }

  public state = {
    isMenuOpen: true,
    onTop: true,
    visible: true,
    x: 0,
    y: 0
  };

  private el: React.RefObject<HTMLUListElement> = React.createRef();

  public componentDidMount() {
    const el = this.el.current as HTMLUListElement;

    startListeningToIgnoreMouseEvents(el);
    setPositionInDOM(el, this.state.x, this.state.y);
    draggable(el, this.setState.bind(this));
  }

  public componentWillUnmount() {
    const el = this.el.current as HTMLUListElement;

    stopListeningToIgnoreMouseEvents(el);
  }

  public render() {
    const {
      isStuffVisible,
      isColumnVisible,
      isGridVisible,
      x,
      y,
      create,
      toggle,
      toggleVisibility,
      toggleHelp
    } = this.props;

    return (
      <Wrapper x={x} y={y} innerRef={this.el}>
        <ToolboxItemDumb>
          <MiniToolboxIcon icon="more-vertical" />
        </ToolboxItemDumb>
        <MenuWrapper>
          <ToolSpace />
          <MiniToolboxItem
            title={`${isStuffVisible ? 'Hide' : 'Show'} all`}
            onClick={() => toggleVisibility()}
          >
            <MiniToolboxIcon
              active={isStuffVisible}
              icon={isStuffVisible ? 'eye' : 'eye-off'}
            />
          </MiniToolboxItem>
          <ToolSpace />
          <MiniToolboxItem title="New guide" onClick={() => create(Tool.GUIDE)}>
            <MiniToolboxIcon icon="layout" />
          </MiniToolboxItem>
          <MiniToolboxItem title="New ruler" onClick={() => create(Tool.RULER)}>
            <MiniToolboxIcon icon="square" />
          </MiniToolboxItem>
          <MiniToolboxItem
            title="New onion image"
            onClick={() => create(Tool.ONION)}
          >
            <MiniToolboxIcon icon="image" />
          </MiniToolboxItem>
          <ToolSpace />
          <MiniToolboxItem
            title={isGridVisible ? 'Hide grid' : 'Show grid'}
            onClick={() => toggle(Tool.GRID)}
          >
            <MiniToolboxIcon active={isGridVisible} icon="grid" />
          </MiniToolboxItem>
          <MiniToolboxItem
            title={isColumnVisible ? 'Hide columns' : 'Show columns'}
            onClick={() => toggle(Tool.COLUMN)}
          >
            <MiniToolboxIcon active={isColumnVisible} icon="pause" />
          </MiniToolboxItem>
          <ToolSpace />
          <MiniToolboxItem title="Show help" onClick={toggleHelp}>
            <MiniToolboxIcon icon="help-circle" />
          </MiniToolboxItem>
        </MenuWrapper>
      </Wrapper>
    );
  }
}

interface IToolBoxProps {
  x: number;
  y: number;
}

const Wrapper = styled.ul<IToolBoxProps>`
  position: fixed;
  background-color: transparent;
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
  top: ${({ y }) => y}px;
  left: ${({ x }) => x}px;
`;

const ToolSpace = styled.li`
  background-color: transparent;
  display: flex;
  width: 5px;
  margin: 0;
`;

const MenuWrapper = styled.ul`
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
`;
