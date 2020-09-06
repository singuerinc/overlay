import { combineReducers } from 'redux';
import { IColumn } from '../components/column/IColumn';
import { IGrid } from '../components/grid/IGrid';
import { IGuide } from '../components/guide/IGuide';
import { IOnionImage } from '../components/onionImage/IOnionImage';
import { IRuler } from '../components/ruler/IRuler';
import { columns } from './columns';
import { grids } from './grids';
import { guides } from './guides';
import { help, IHelpStore } from './help';
import { onions } from './onions';
import { rulers } from './rulers';
import { ISettingsStore, settings } from './settings';
import { IToolsStore, tools } from './tools';

export interface IAppStore {
  columns: IColumn[];
  grids: IGrid[];
  guides: IGuide[];
  onions: IOnionImage[];
  rulers: IRuler[];
  tools: IToolsStore;
  settings: ISettingsStore;
  help: IHelpStore;
}

const rootReducer = combineReducers<IAppStore>({
  columns,
  grids,
  guides,
  help,
  onions,
  rulers,
  settings,
  tools
});

export default rootReducer;
