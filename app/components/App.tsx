import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { removeGuide } from '../actions/guides';
import { removeOnion } from '../actions/onions';
import { Column } from '../components/column/Column';
import { Grid } from '../components/grid/Grid';
import { Guide } from '../components/guide/Guide';
import { OnionImage } from '../components/onionImage/OnionImage';
import { Ruler } from '../components/ruler/Ruler';
import { Toolbox } from '../components/toolbox/Toolbox';
import { IAppStore } from '../reducers';
import { IHelpStore } from '../reducers/help';
import { ISettingsStore } from '../reducers/settings';
import { IToolsStore } from '../reducers/tools';
import { IColumn } from './column/IColumn';
import { IGrid } from './grid/IGrid';
import { IGuide } from './guide/IGuide';
import { Help } from './help/Help';
import { IOnionImage } from './onionImage/IOnionImage';
import { IRuler } from './ruler/IRuler';
import { Settings } from './settings/Settings';

interface IProps {
  columns: IColumn[];
  help: IHelpStore;
  grids: IGrid[];
  guides: IGuide[];
  onions: IOnionImage[];
  rulers: IRuler[];
  settings: ISettingsStore;
  tools: IToolsStore;

  removeGuide: (guide: IGuide) => void;
  removeOnion: (onion: IOnionImage) => void;
}

class AppView extends React.Component<IProps> {
  public render() {
    const {
      columns,
      grids,
      guides,
      onions,
      rulers,
      settings,
      tools,
      help
    } = this.props;
    const isToolsVisible = tools.visible;
    const isHelpVisible = help.visible;
    const isSettingsVisible = settings.visible;

    const shouldDisplayTools =
      !isHelpVisible && !isSettingsVisible && isToolsVisible;

    return (
      <>
        <ToolsWrapper visible={shouldDisplayTools}>
          {grids.map((grid: IGrid) => (
            <Grid key={grid.id} {...grid} />
          ))}
          {columns.map((column: IColumn) => (
            <Column key={column.id} {...column} />
          ))}
          {rulers.map((ruler: IRuler) => (
            <Ruler key={ruler.id} {...ruler} />
          ))}
          {onions.map((onion: IOnionImage) => (
            <OnionImage
              key={onion.id}
              {...onion}
              remove={() => {
                this.props.removeOnion(onion);
              }}
            />
          ))}
          {guides.map((guide: IGuide) => (
            <Guide
              key={guide.id}
              {...guide}
              remove={() => {
                this.props.removeGuide(guide);
              }}
            />
          ))}
        </ToolsWrapper>

        {isHelpVisible && <Help />}
        {isSettingsVisible && <Settings />}
        <Toolbox x={10} y={10} />
      </>
    );
  }
}

const App = connect(
  (store: IAppStore, ownProps) => store,
  {
    removeGuide,
    removeOnion
  }
)(AppView);

export { App };

const ToolsWrapper = styled.div<{ visible }>`
  display: ${({ visible }) => (visible ? 'block' : 'none')};
`;
