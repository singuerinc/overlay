import * as React from 'react';
import styled from 'styled-components';
import { Tool, ToolType } from './Tool';
import { ToolboxIcon } from './ToolboxIcon';
import { ToolboxItem } from './ToolboxItem';
import { ToolboxItemDumb } from './ToolboxItemDumb';
import { setPosition } from '../helpers/setPosition';
import { draggable } from '../helpers/draggable';

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
  private el;

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
    setPosition(this.el.current, this.state.x, this.state.y);
    draggable(this.el.current, this.setState.bind(this));
  }

  render() {
    const {
      isStuffVisible,
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
          <ToolboxIcon icon={isMenuOpen ? 'more-vertical' : 'menu'} />
        </ToolboxItemDumb>
        {isMenuOpen && (
          <MenuWrapper>
            <ToolSpace />
            {/* <ToolItem onClick={() => this.setOnTop(!onTop)}>
              <ToolboxIcon icon={onTop ? 'zap' : 'zap-off'} />
            </ToolItem> */}
            <ToolboxItem onClick={() => setVisibility(!isStuffVisible)}>
              <ToolboxIcon icon={isStuffVisible ? 'eye' : 'eye-off'} />
            </ToolboxItem>
            <ToolSpace />
            <ToolboxItem onClick={() => create(Tool.GUIDE)}>
              <ToolboxIcon icon="layout" />
            </ToolboxItem>
            <ToolboxItem onClick={() => create(Tool.RULER)}>
              <ToolboxIcon icon="square" />
            </ToolboxItem>
            <ToolboxItem onClick={() => create(Tool.ONION)}>
              <ToolboxIcon icon="image" />
            </ToolboxItem>
            <ToolboxItem onClick={() => toggle(Tool.GRID)}>
              <ToolboxIcon icon="grid" />
            </ToolboxItem>
            <ToolSpace />
            <ToolboxItem onClick={() => toggleHelp()}>
              <ToolboxIcon icon="help-circle" />
            </ToolboxItem>
          </MenuWrapper>
        )}
      </Wrapper>
    );
  }
}
