import * as ipc from 'electron-better-ipc';
import * as R from 'ramda';
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
  add as addColumn,
  remove as removeColumn
} from '../../actions/columns';
import { add as addGrid, remove as removeGrid } from '../../actions/grids';
import { add as addGuide } from '../../actions/guides';
import { setVisibility as setHelpVisibility } from '../../actions/help';
import { add as addOnion } from '../../actions/onions';
import { add as addRuler } from '../../actions/rulers';
import { setVisibility as setSettingsVisibility } from '../../actions/settings';
import {
  setAllLocked as setAllToolsLocked,
  setAlwaysOnTop,
  setVisibility as setToolsVisibility
} from '../../actions/tools';
import { IAppStore } from '../../reducers';
import { IHelpStore } from '../../reducers/help';
import { ISettingsStore } from '../../reducers/settings';
import { IToolsStore } from '../../reducers/tools';
import { track } from '../../utils/analytics';
import { IColumn } from '../column/IColumn';
import { IGrid } from '../grid/IGrid';
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

  columns: IColumn[];
  help: IHelpStore;
  grids: IGrid[];
  settings: ISettingsStore;
  tools: IToolsStore;

  setAlwaysOnTop: (value: boolean) => void;
  setHelpVisibility: (value: boolean) => void;
  setSettingsVisibility: (value: boolean) => void;
  setToolsVisibility: (value: boolean) => void;
  setAllToolsLocked: (value: boolean) => void;

  addColumn: () => void;
  addGrid: () => void;
  addGuide: () => void;
  addOnion: (src: string) => void;
  addRuler: () => void;

  removeColumn: (column: IColumn) => void;
  removeGrid: (grid: IGrid) => void;
}

interface IState {
  visible: boolean;
  onTop: boolean;
}

class ToolboxView extends React.Component<IProps, IState> {
  public state = {
    onTop: true,
    visible: true
  };

  private el: React.RefObject<HTMLUListElement> = React.createRef();

  public async showOpenDialogImage(): Promise<string[]> {
    track('dialog', 'open-file', 'onion');
    return await ipc.callMain('show-open-dialog-image');
  }

  public async openDialogToSelectImage() {
    const paths: string[] | null = await this.showOpenDialogImage();
    if (!R.isNil(paths)) {
      R.map(this.props.addOnion, paths);
    }
  }

  public componentDidMount() {
    const el = this.el.current as HTMLUListElement;

    startListeningToIgnoreMouseEvents(el);
    setPositionInDOM(el, this.props.x, this.props.y);
    draggable(el, this.setState.bind(this));
  }

  public componentWillUnmount() {
    const el = this.el.current as HTMLUListElement;

    stopListeningToIgnoreMouseEvents(el);
  }

  public render() {
    const { columns, grids, settings, tools, help, x, y } = this.props;

    const isAlwaysOnTop = tools.alwaysOnTop;
    const isAllToolsLocked = tools.allLocked;
    const isToolsVisible = tools.visible;
    const isHelpVisible = help.visible;
    const isSettingsVisible = settings.visible;
    const isGridVisible = R.gt(R.length(grids), 0);
    const isColumnVisible = R.gt(R.length(columns), 0);

    return (
      <Wrapper x={x} y={y} innerRef={this.el}>
        <ToolboxItemDumb>
          <MiniToolboxIcon icon="more-vertical" />
        </ToolboxItemDumb>
        <MenuWrapper>
          <ToolSpace />
          <MiniToolboxItem
            title="Always on top"
            onClick={() => {
              this.props.setAlwaysOnTop(!isAlwaysOnTop);
            }}
          >
            <MiniToolboxIcon
              active={isAlwaysOnTop}
              icon={isAlwaysOnTop ? 'zap' : 'zap-off'}
            />
          </MiniToolboxItem>
          <MiniToolboxItem
            title={`${isAllToolsLocked ? 'Unlock' : 'Lock'} all`}
            onClick={() => {
              this.props.setAllToolsLocked(!isAllToolsLocked);
            }}
          >
            <MiniToolboxIcon
              active={isAllToolsLocked}
              icon={isAllToolsLocked ? 'lock' : 'unlock'}
            />
          </MiniToolboxItem>
          <MiniToolboxItem
            title={`${isToolsVisible ? 'Hide' : 'Show'} all`}
            onClick={() => {
              this.props.setSettingsVisibility(false);
              this.props.setHelpVisibility(false);
              this.props.setToolsVisibility(!isToolsVisible);
            }}
          >
            <MiniToolboxIcon
              active={isToolsVisible}
              icon={isToolsVisible ? 'eye' : 'eye-off'}
            />
          </MiniToolboxItem>
          <ToolSpace />
          <MiniToolboxItem
            title="New guide"
            onClick={() => this.props.addGuide()}
          >
            <MiniToolboxIcon icon="layout" />
          </MiniToolboxItem>
          <MiniToolboxItem
            title="New ruler"
            onClick={() => this.props.addRuler()}
          >
            <MiniToolboxIcon icon="square" />
          </MiniToolboxItem>
          <MiniToolboxItem
            title="New onion image"
            onClick={() => this.openDialogToSelectImage()}
          >
            <MiniToolboxIcon icon="image" />
          </MiniToolboxItem>
          <ToolSpace />
          <MiniToolboxItem
            title={isGridVisible ? 'Hide grid' : 'Show grid'}
            onClick={() => this.toggleTool(Tool.GRID)}
          >
            <MiniToolboxIcon active={isGridVisible} icon="grid" />
          </MiniToolboxItem>
          <MiniToolboxItem
            title={isColumnVisible ? 'Hide columns' : 'Show columns'}
            onClick={() => this.toggleTool(Tool.COLUMN)}
          >
            <MiniToolboxIcon active={isColumnVisible} icon="pause" />
          </MiniToolboxItem>
          <ToolSpace />
          <MiniToolboxItem
            title="Settings"
            onClick={() => {
              this.props.setHelpVisibility(false);
              this.props.setToolsVisibility(isSettingsVisible);
              this.props.setSettingsVisibility(!isSettingsVisible);
            }}
          >
            <MiniToolboxIcon active={isSettingsVisible} icon="settings" />
          </MiniToolboxItem>
          <MiniToolboxItem
            title="Help"
            onClick={() => {
              this.props.setSettingsVisibility(false);
              this.props.setHelpVisibility(!isHelpVisible);
              this.props.setToolsVisibility(isHelpVisible);
            }}
          >
            <MiniToolboxIcon active={isHelpVisible} icon="help-circle" />
          </MiniToolboxItem>
        </MenuWrapper>
      </Wrapper>
    );
  }

  private toggleTool = (tool: Tool) => {
    switch (tool) {
      case Tool.GRID:
        const isGridVisible = R.gt(R.length(this.props.grids), 0);
        if (isGridVisible) {
          this.props.removeGrid(this.props.grids[0]);
        } else {
          this.props.addGrid();
        }
        break;
      case Tool.COLUMN:
        const isColumnVisible = R.gt(R.length(this.props.columns), 0);
        if (isColumnVisible) {
          this.props.removeColumn(this.props.columns[0]);
        } else {
          this.props.addColumn();
        }
        break;
    }
  }
}

const Toolbox = connect(
  (store: IAppStore, ownProps) => store,
  {
    addColumn,
    addGrid,
    addGuide,
    addOnion,
    addRuler,

    removeColumn,
    removeGrid,

    setAllToolsLocked,
    setAlwaysOnTop,
    setHelpVisibility,
    setSettingsVisibility,
    setToolsVisibility
  }
)(ToolboxView);

export { Toolbox };

interface IToolBoxProps {
  x: number;
  y: number;
}

const Wrapper = styled.ul<IToolBoxProps>`
  position: fixed;
  z-index: 9999999999999;
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
  top: ${({ y }) => y}px;
  left: ${({ x }) => x}px;
  border: 4px solid rgba(0, 0, 0, 1);
  background-color: rgba(0, 0, 0, 1);
  border-radius: 4px;
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
