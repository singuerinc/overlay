import * as ipc from 'electron-better-ipc';
import * as R from 'ramda';
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { addColumn, removeColumn } from '../../actions/columns';
import { addGrid, removeGrid } from '../../actions/grids';
import { addGuide } from '../../actions/guides';
import { setVisibility as setHelpVisibility } from '../../actions/help';
import { addOnion } from '../../actions/onions';
import { addRuler } from '../../actions/rulers';
import { setVisibility as setSettingsVisibility } from '../../actions/settings';
import { setVisibility as setToolsVisibility } from '../../actions/tools';
import { factory as ColumnFactory } from '../column/factory';
import { IColumn } from '../column/IColumn';
import { track } from '../core/analytics';
import { factory as GridFactory } from '../grid/factory';
import { IGrid } from '../grid/IGrid';
import { factory as GuideFactory } from '../guide/factory';
import { IGuide } from '../guide/IGuide';
import { draggable } from '../helpers/draggable';
import { setPositionInDOM } from '../helpers/impure';

import { IAppStore } from '../../reducers';
import { IHelpStore } from '../../reducers/help';
import { ISettingsStore } from '../../reducers/settings';
import { IToolsStore } from '../../reducers/tools';
import {
  startListeningToIgnoreMouseEvents,
  stopListeningToIgnoreMouseEvents
} from '../helpers/mouseEvents';
import { MiniToolboxIcon } from '../miniToolbox/MiniToolboxIcon';
import { MiniToolboxItem } from '../miniToolbox/MiniToolboxItem';
import { factory as OnionFactory } from '../onionImage/factory';
import { IOnionImage } from '../onionImage/IOnionImage';
import { factory as RulerFactory } from '../ruler/factory';
import { IRuler } from '../ruler/IRuler';
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

  setHelpVisibility: (value: boolean) => void;
  setSettingsVisibility: (value: boolean) => void;
  setToolsVisibility: (value: boolean) => void;

  addColumn: (column: IColumn) => void;
  addGrid: (grid: IGrid) => void;
  addGuide: (guide: IGuide) => void;
  addOnion: (onion: IOnionImage) => void;
  addRuler: (ruler: IRuler) => void;

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

  public create = async (tool: Tool) => {
    switch (tool) {
      case Tool.GUIDE:
        this.props.addGuide(GuideFactory());
        track('tool', 'guide', 'add');
        break;
      case Tool.RULER:
        this.props.addRuler(RulerFactory());
        track('tool', 'ruler', 'add');
        break;
      case Tool.ONION:
        const paths: string[] | null = await this.showOpenDialogImage();
        if (paths) {
          R.map((path: string) => {
            const onion: IOnionImage = OnionFactory();
            onion.src = path;
            this.props.addOnion(onion);
            track('tool', 'oion', 'add');
          }, paths);
        }
        break;
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
            onClick={() => this.create(Tool.GUIDE)}
          >
            <MiniToolboxIcon icon="layout" />
          </MiniToolboxItem>
          <MiniToolboxItem
            title="New ruler"
            onClick={() => this.create(Tool.RULER)}
          >
            <MiniToolboxIcon icon="square" />
          </MiniToolboxItem>
          <MiniToolboxItem
            title="New onion image"
            onClick={() => this.create(Tool.ONION)}
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
          track('tool', 'grid', 'remove');
        } else {
          this.props.addGrid(GridFactory());
          track('tool', 'grid', 'add');
        }
        break;
      case Tool.COLUMN:
        const isColumnVisible = R.gt(R.length(this.props.columns), 0);
        if (isColumnVisible) {
          this.props.removeColumn(this.props.columns[0]);
          track('tool', 'grid', 'remove');
        } else {
          this.props.addColumn(ColumnFactory());
          track('tool', 'grid', 'add');
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
