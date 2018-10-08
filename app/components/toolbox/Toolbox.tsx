import * as React from 'react';
import styled from 'styled-components';
import { draggable } from '../helpers/draggable';
import {
  startListeningToIgnoreMouseEvents,
  stopListeningToIgnoreMouseEvents
} from '../helpers/mouseEvents';
import { setPositionInDOM } from '../helpers/impure';
import { MiniToolboxIcon } from '../miniToolbox/MiniToolboxIcon';
import { MiniToolboxItem } from '../miniToolbox/MiniToolboxItem';
import { Tool } from './Tool';
import { ToolboxItemDumb } from './ToolboxItemDumb';

interface Props {
  x: number;
  y: number;
  isStuffVisible: boolean;
  isGridVisible: boolean;
  toggleVisibility: () => void;
  create: (tool: Tool) => void;
  toggle: (tool: Tool) => void;
  toggleHelp: () => void;
}

interface State {
  visible: boolean;
  onTop: boolean;
  isMenuOpen: boolean;
  x: number;
  y: number;
}

export class Toolbox extends React.Component<Props, State> {
  private el: React.RefObject<HTMLUListElement> = React.createRef();

  static getDerivedStateFromProps(nextProps, prevState) {
    return { ...nextProps, ...prevState };
  }

  state = {
    visible: true,
    onTop: true,
    isMenuOpen: true,
    x: 0,
    y: 0
  };

  componentDidMount() {
    const el = this.el.current as HTMLUListElement;

    startListeningToIgnoreMouseEvents(el);
    setPositionInDOM(el, this.state.x, this.state.y);
    draggable(el, this.setState.bind(this));
  }

  componentWillUnmount() {
    const el = this.el.current as HTMLUListElement;

    stopListeningToIgnoreMouseEvents(el);
  }

  render() {
    const {
      isStuffVisible,
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
            <MiniToolboxIcon icon={isStuffVisible ? 'eye' : 'eye-off'} />
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
          <MiniToolboxItem
            title={isGridVisible ? 'Hide grid' : 'Show grid'}
            onClick={() => toggle(Tool.GRID)}
          >
            <MiniToolboxIcon icon="grid" />
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

interface ToolBoxProps {
  x: number;
  y: number;
}

const Wrapper = styled.ul<ToolBoxProps>`
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
