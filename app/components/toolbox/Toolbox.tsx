import * as React from 'react';
import styled from 'styled-components';
import { draggable } from '../helpers/draggable';
import {
  startListeningToIgnoreMouseEvents,
  stopListeningToIgnoreMouseEvents
} from '../helpers/mouseEvents';
import { setPositionInDOM } from '../helpers/setPosition';
import { MiniToolboxIcon } from '../miniToolbox/MiniToolboxIcon';
import { MiniToolboxItem } from '../miniToolbox/MiniToolboxItem';
import { Tool, ToolType } from './Tool';
import { ToolboxItemDumb } from './ToolboxItemDumb';

const Wrapper = styled.ul.attrs<{
  x: number;
  y: number;
}>({
  x: (props) => props.x,
  y: (props) => props.y
})`
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

interface Props {
  x: number;
  y: number;
  isStuffVisible: boolean;
  isGridVisible: boolean;
  setVisibility: (visible: boolean) => void;
  create: (tool: ToolType) => void;
  toggle: (tool: ToolType) => void;
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
  private el: React.RefObject<HTMLUListElement>;

  static getDerivedStateFromProps(nextProps, prevState) {
    return { ...nextProps, ...prevState };
  }

  constructor(props) {
    super(props);
    this.el = React.createRef();
  }

  state = {
    visible: true,
    onTop: true,
    isMenuOpen: true,
    x: 0,
    y: 0
  };

  setOnTop = (value: boolean) => {
    this.setState({
      onTop: value
    });
  };

  setMenuOpen = (value: boolean) => {
    this.setState({
      isMenuOpen: value
    });
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
      setVisibility,
      toggleHelp
    } = this.props;
    const { isMenuOpen } = this.state;
    return (
      <Wrapper x={x} y={y} innerRef={this.el}>
        {/* <ToolItem onClick={() => this.setMenuOpen(!isMenuOpen)}> */}
        <ToolboxItemDumb>
          <MiniToolboxIcon icon={isMenuOpen ? 'more-vertical' : 'menu'} />
        </ToolboxItemDumb>
        {isMenuOpen && (
          <MenuWrapper>
            <ToolSpace />
            {/* <ToolItem onClick={() => this.setOnTop(!onTop)}>
              <MiniToolboxIcon icon={onTop ? 'zap' : 'zap-off'} />
            </ToolItem> */}
            <MiniToolboxItem
              title={`${isStuffVisible ? 'Hide' : 'Show'} all`}
              onClick={() => setVisibility(!isStuffVisible)}
            >
              <MiniToolboxIcon icon={isStuffVisible ? 'eye' : 'eye-off'} />
            </MiniToolboxItem>
            <ToolSpace />
            <MiniToolboxItem
              title="New guide"
              onClick={() => create(Tool.GUIDE)}
            >
              <MiniToolboxIcon icon="layout" />
            </MiniToolboxItem>
            <MiniToolboxItem
              title="New ruler"
              onClick={() => create(Tool.RULER)}
            >
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
        )}
      </Wrapper>
    );
  }
}
