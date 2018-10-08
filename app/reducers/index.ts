import { combineReducers } from 'redux';
import { IGrid } from '../components/grid/IGrid';
import { IGuide } from '../components/guide/IGuide';
import { IOnionImage } from '../components/onionImage/IOnionImage';
import { IRuler } from '../components/ruler/IRuler';
import { columns } from './columns';
import { grids } from './grids';
import { guides } from './guides';
import { onions } from './onions';
import { rulers } from './rulers';
import { tools, ToolsStore } from './tools';
import { help, HelpStore } from './help';
import { IColumn } from '../components/column/IColumn';

export interface AppStore {
  columns: IColumn[];
  grids: IGrid[];
  guides: IGuide[];
  onions: IOnionImage[];
  rulers: IRuler[];
  tools: ToolsStore;
  help: HelpStore;
}

const rootReducer = combineReducers<AppStore>({
  columns,
  grids,
  guides,
  onions,
  rulers,
  tools,
  help
});

export default rootReducer;
