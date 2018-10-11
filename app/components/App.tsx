import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
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
}

const AppView = ({
  columns,
  grids,
  guides,
  onions,
  rulers,
  settings,
  tools,
  help
}: IProps) => {
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
          <OnionImage key={onion.id} {...onion} />
        ))}
        {guides.map((guide: IGuide) => (
          <Guide key={guide.id} {...guide} />
        ))}
      </ToolsWrapper>

      {isHelpVisible && <Help />}
      {isSettingsVisible && <Settings />}
      <Toolbox x={10} y={10} />
    </>
  );
};

const ToolsWrapper = styled.div<{ visible: boolean }>`
  display: ${({ visible }) => (visible ? 'block' : 'none')};
`;

const App = connect((store: IAppStore) => store)(AppView);

export { App };
