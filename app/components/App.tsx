import * as ipc from 'electron-better-ipc';
import * as R from 'ramda';
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { addColumn, removeColumn } from '../actions/columns';
import { addGrid, removeGrid } from '../actions/grids';
import { addGuide, removeGuide } from '../actions/guides';
import { toggleVisibility as toggleHelpVisibility } from '../actions/help';
import { addOnion, removeOnion } from '../actions/onions';
import { addRuler, removeRuler } from '../actions/rulers';
import { toggleVisibility as toggleToolsVisibility } from '../actions/tools';
import { Column } from '../components/column/Column';
import { Grid } from '../components/grid/Grid';
import { Guide } from '../components/guide/Guide';
import { OnionImage } from '../components/onionImage/OnionImage';
import { Ruler } from '../components/ruler/Ruler';
import { Toolbox } from '../components/toolbox/Toolbox';
import { IAppStore } from '../reducers';
import { IHelpStore } from '../reducers/help';
import { IToolsStore } from '../reducers/tools';
import { factory as ColumnFactory } from './column/factory';
import { IColumn } from './column/IColumn';
import { initializeAnalytics, track } from './core/analytics';
import { factory as GridFactory } from './grid/factory';
import { IGrid } from './grid/IGrid';
import { factory as GuideFactory } from './guide/factory';
import { IGuide } from './guide/IGuide';
import { Help } from './help/Help';
import { factory as OnionFactory } from './onionImage/factory';
import { IOnionImage } from './onionImage/IOnionImage';
import { factory as RulerFactory } from './ruler/factory';
import { IRuler } from './ruler/IRuler';
import { Tool } from './toolbox/Tool';

interface IProps {
  help: IHelpStore;
  tools: IToolsStore;
  columns: IColumn[];
  grids: IGrid[];
  guides: IGuide[];
  onions: IOnionImage[];
  rulers: IRuler[];
  addGrid: (grid: IGrid) => void;
  removeGrid: (grid: IGrid) => void;
  addColumn: (column: IColumn) => void;
  removeColumn: (column: IColumn) => void;
  addGuide: (guide: IGuide) => void;
  removeGuide: (guide: IGuide) => void;
  addOnion: (onion: IOnionImage) => void;
  removeOnion: (onion: IOnionImage) => void;
  addRuler: (ruler: IRuler) => void;
  removeRuler: (ruler: IRuler) => void;
  toggleToolsVisibility: () => void;
  toggleHelpVisibility: () => void;
}

class AppView extends React.Component<IProps> {
  constructor(props) {
    super(props);
    initializeAnalytics();
  }

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
            track('tool', 'onion', 'add');
          }, paths);
        }
        break;
    }
  }

  public render() {
    const { columns, grids, guides, onions, rulers, tools, help } = this.props;
    const isToolsVisible = tools.visible;
    const isHelpVisible = help.visible;
    const isGridVisible = R.gt(R.length(grids), 0);
    const isColumnVisible = R.gt(R.length(columns), 0);

    return (
      <>
        <ToolsWrapper visible={isToolsVisible}>
          {grids.map((grid: IGrid) => (
            <Grid key={grid.id} {...grid} />
          ))}
          {columns.map((column: IColumn) => (
            <Column key={column.id} {...column} />
          ))}
          {rulers.map((ruler: IRuler) => (
            <Ruler
              key={ruler.id}
              {...ruler}
              remove={() => {
                this.props.removeRuler(ruler);
                track('tool', 'ruler', 'remove');
              }}
            />
          ))}
          {onions.map((onion: IOnionImage) => (
            <OnionImage
              key={onion.id}
              {...onion}
              remove={() => {
                this.props.removeOnion(onion);
                track('tool', 'onion', 'remove');
              }}
            />
          ))}
          {guides.map((guide: IGuide) => (
            <Guide
              key={guide.id}
              {...guide}
              remove={() => {
                this.props.removeGuide(guide);
                track('tool', 'guide', 'remove');
              }}
            />
          ))}
        </ToolsWrapper>

        {isHelpVisible && <Help close={this.toggleHelp} />}
        <Toolbox
          x={10}
          y={10}
          toggleVisibility={this.setVisible}
          isStuffVisible={isToolsVisible}
          isColumnVisible={isColumnVisible}
          isGridVisible={isGridVisible}
          create={this.create}
          toggle={this.toggleTool}
          toggleHelp={this.toggleHelp}
        />
      </>
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

  private setVisible = () => {
    track('app', 'tools', `visibility/${!this.props.tools.visible}`);
    this.props.toggleToolsVisibility();
  }

  private toggleHelp = () => {
    track('app', 'help', `visibility/${this.props.help.visible}`);
    this.props.toggleHelpVisibility();
  }
}

const App = connect(
  (store: IAppStore, ownProps) => store,
  {
    addColumn,
    addGrid,
    addGuide,
    addOnion,
    addRuler,
    removeColumn,
    removeGrid,
    removeGuide,
    removeOnion,
    removeRuler,
    toggleHelpVisibility,
    toggleToolsVisibility
  }
)(AppView);

export { App };

const ToolsWrapper = styled.div<{ visible }>`
  display: ${({ visible }) => (visible ? 'block' : 'none')};
`;
